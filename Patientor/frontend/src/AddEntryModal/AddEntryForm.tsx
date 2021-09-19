import React from "react";
import { Form, Formik } from "formik";

import { EntryFormValues } from "../types";
import { useStateValue } from "../state";

import { BaseFields, EntryTypeSpecificFields } from './EntryFormFields';
import { DiagnosisSelection, FormButtons } from '../components/FormField';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const initialFormValues = {
  date: "",
  description: "",
  diagnoses: [],
  specialist: "",
  type: "HealthCheck",
  healthCheckRating: 0,
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: ""
  },
  discharge: {
    date: "",
    criteria: ""
  }
};

const formBaseFields = [
  "date",
  "description",
  "specialist"
];

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateForm = (values: any) => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};
  formBaseFields.forEach(v => {
    if (!values[v as keyof EntryFormValues]) {
      errors[v] = requiredError;
    }
  });

  switch (values.type) {
    case "HealthCheck":
      if (!values.healthCheckRating && values.healthCheckRating < 0) {
        errors.healthCheckRating = requiredError;
      }
      break;
    case "OccupationalHealthcare":
      if (!values.employerName) {
        errors.employerName = requiredError;
      }
      if (values.sickLeave.startDate && !values.sickLeave.endDate) {
        errors["sickLeave.endDate"] = "Missing end date";
      }
      if (values.sickLeave.endDate && !values.sickLeave.startDate) {
        errors["sickLeave.startDate"] = "Missing start date";
      }
      break;
    case "Hospital":
      if (!values.discharge.date) {
        errors["discharge.date"] = requiredError;
      }
      if (!values.discharge.criteria) {
        errors["discharge.criteria"] = requiredError;
      }
      break;
    default:
      errors.type = requiredError;
  }
  return errors;
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props ) => {
  const [{ diagnoses }, ] = useStateValue();

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={onSubmit}
      validate={values => validateForm(values)}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseFields />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <EntryTypeSpecificFields values={values} />
            <FormButtons
              dirty={dirty}
              isValid={isValid}
              onCancel={onCancel}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;