import { uid } from 'uid';
import patientData from '../../data/patients';
import { Entry, NewEntry, Patient, NewPatient, PublicPatient } from '../types';
import { toNewEntry } from '../validation/entryValidation';
import { toNewPatient } from '../validation/patientValidation';

const patients: Patient[] = patientData;

const addPatient = (patient: NewPatient): Patient => {
	const newPatient: Patient = {
		id: uid(),
		entries: [],
		...toNewPatient(patient)
	};
	patients.push(newPatient);
	return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string) => {
	const patientIndex = patients.findIndex(p => p.id === patientId);
	
	if (patientIndex < 0) {
		throw new Error(`No patient found with id: ${patientId}`);
	}

	const newEntry: Entry = {
		id: uid(),
		...toNewEntry(entry)
	};

	patients[patientIndex].entries.push(newEntry);
	return patients[patientIndex];
};

const getPatient = (id: string): Patient | undefined => {
	return patients.find(p => p.id === id);
};

const getNonSensPatient = (id: string): PublicPatient | undefined => {
	const existingPatient: Patient | undefined = patients.find(p => p.id === id);
	if (existingPatient && existingPatient.id) {
		return { 
			id: existingPatient.id,
			name: existingPatient.name,
			dateOfBirth: existingPatient.dateOfBirth,
			gender: existingPatient.gender,
			occupation: existingPatient.occupation
		};
	}
	return undefined;
};

const getNonSensPatients = (): PublicPatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id, name, dateOfBirth, gender, occupation
	}));
};

export default {
	patients,
	addPatient,
	addEntry,
	getPatient,
	getNonSensPatient,
	getNonSensPatients
};