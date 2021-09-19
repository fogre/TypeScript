import {
	Diagnosis,
	Discharge,
	HealthCheckRating,
	NewBaseEntry,
	NewEntry,
	SickLeave
} from '../types';

import { parseString } from './defaultValidations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
	if (!discharge || !discharge.date || !discharge.criteria) {
		throw new Error(`Incorrect or missing discharge: ${discharge.date} ${discharge.criteria}`);
	}
	return {
		date: parseString('discharge date', discharge.date),
		criteria: parseString('discharge criteria', discharge.criteria)
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealtCheckRating = (rating: any): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).includes(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
	if (!sickLeave || !sickLeave.startDate || !sickLeave.endDate) {
		throw new Error(
			`Incorrect or missing sick leave: ${sickLeave.startDate} ${sickLeave.endDate}`
		);
	}

	return {
		startDate: parseString('sickLeave start date', sickLeave.startDate),
		endDate: parseString('sickLeave end date', sickLeave.endDate)
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
	if (!Array.isArray(diagnosisCodes)) {
		throw new Error('Diagnosis codes is not an array!');
	}
	//should check from diagnoses but me sa lazy.
  return diagnosisCodes.map(d => parseString('diagnosis code', d));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseBaseFields = (entry: any): NewBaseEntry => {
	const baseFields: NewBaseEntry = {
		description: parseString('description', entry.description),
		date: parseString('date', entry.date),
		specialist: parseString('specialist', entry.specialist),
	};

	if (entry.diagnosisCodes) {
		baseFields.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
	}

	return baseFields;
};

export const toNewEntry = (entry: NewEntry): NewEntry => {
	const baseFields = parseBaseFields(entry);

	switch(entry.type) {
		case "HealthCheck":
			return {
				...baseFields,
				healthCheckRating: parseHealtCheckRating(entry.healthCheckRating),
				type: entry.type
			};
		case "Hospital":
			return {
				...baseFields,
				discharge: parseDischarge(entry.discharge),
				type: entry.type
			};
		case "OccupationalHealthcare":
			const occupationalEntry: NewEntry = {
				...baseFields,
				employerName: parseString('employerName', entry.employerName),
				type: entry.type
			};

			if (entry.sickLeave) {
				occupationalEntry.sickLeave = parseSickLeave(entry.sickLeave);
			}

			return occupationalEntry;
		default:
			throw new Error('Incorrect or missing Entry type!');	
	}
};