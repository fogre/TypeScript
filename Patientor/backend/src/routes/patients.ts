import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
	res.json(patientService.getNonSensPatients());
});

router.get('/:id', (req, res) => {
	res.json(patientService.getPatient(req.params.id));
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post('/', (req, res) => {
	const { 
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	} = req.body; 

	const newPatient = patientService.addPatient({
		name, dateOfBirth, ssn, gender, occupation
	});

	res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
	const {
		//basefields
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    //occupational
    employerName,
    sickLeave,
    //Hospital
    discharge,
    //healtcheck
    healthCheckRating
	} = req.body;

	const newEntry = patientService.addEntry({
		//basefields
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    //occupational
    employerName,
    sickLeave,
    //Hospital
    discharge,
    //healtcheck
    healthCheckRating
	}, req.params.id);

	res.json(newEntry);
});

export default router;