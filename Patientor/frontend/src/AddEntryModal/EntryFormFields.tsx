import React from "react";
import { Field } from 'formik';

import {
  NumberField,
  SelectField,
  TextField,
  TypeOption
} from '../components/FormField';

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health check" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
  { value: "Hospital", label: "Hospital" }
];

export const BaseFields = () => (
  <>
    <Field
      label="Date"
      placeholder="Date"
      name="date"
      component={TextField}
    />
    <Field
      label="Description"
      placeholder="Description"
      name="description"
      component={TextField}
    />
    <Field
      label="Specialist"
      placeholder="Specialist"
      name="specialist"
      component={TextField}
    />
    <SelectField
      label="Type"
      name="type"
      options={typeOptions}
    />
  </>
);

const HealthCheckFields = () => (
  <Field
    label="Health rating"
    placeholder="Health rating"
    name="healthCheckRating"
    min={0}
    max={3}
    component={NumberField}
  />
);

const OccupationalHealthCareFields = () => (
  <>
    <Field
      label="Employer"
      placeholder="Employer name"
      name="employerName"
      component={TextField}
    />
    <Field
      label="Sick leave starting"
      placeholder="start date (some very cool calendar thing here)"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="Sick leave ending"
      placeholder="end date"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>
);

const HospitalFields = () => (
  <>
    <Field
      label="Discharge date"
      placeholder="date of discharge"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Discharge criteria"
      placeholder="criteria for discharge"
      name="discharge.criteria"
      component={TextField}
    />
  </>
);

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EntryTypeSpecificFields = ({ values }: { values: any }) => {
  switch (values.type) {
    case "HealthCheck":
      return <HealthCheckFields />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareFields />;
    case "Hospital":
      return <HospitalFields />;
    default:
      return null;
  }
};