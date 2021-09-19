//types
import { Gender, NewPatient, toNewPatientFields } from '../types';
//validation
import { parseString } from './defaultValidations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }
  return gender;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: toNewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString('name', name),
    dateOfBirth: parseString('dateOfBirth', dateOfBirth),
    ssn: parseString('ssn', ssn),
    gender: parseGender(gender),
    occupation: parseString('occupation', occupation)
  };

  return newPatient;
};