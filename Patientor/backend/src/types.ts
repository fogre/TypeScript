//Custom Omit
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

//Diagnose
export interface Diagnosis {
	code: string,
	name: string,
	latin?: string
}

//Entry
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Discharge {
	date: string;
	criteria: string;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

export interface SickLeave {
	startDate: string;
	endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewEntry = UnionOmit<Entry, 'id'>;

//Patient
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
  entries: Entry[];
	occupation?: string;
}

export type toNewPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation?: unknown
};

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;