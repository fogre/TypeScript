import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon } from 'semantic-ui-react';

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";

import AddEntryModal from '../AddEntryModal';
import Entries from './Entries';
import GenderIcon from '../components/GenderIcon';

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();
	const [{ patients }, dispatch] = useStateValue(); 
	const patient: Patient = patients[id];

	React.useEffect(() => {
		const fetchPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
			} catch(e) {
				console.log(e);
			}
		};

		if (!patient || !patient.ssn) {
			void fetchPatient();
		}
	}, []);

	if (!patient) {
		return <Icon loading name='spinner' />;
	}

	return (
		<>
			<Header as="h2">
				{patient.name}
				<GenderIcon gender={patient.gender} />
			</Header>
			{patient.ssn
				? <p>ssn: {patient.ssn}</p>
				: <Icon loading name='spinner' />
			}
			<p>occupation: {patient.occupation}</p>
			<Entries entries={patient.entries} />
			<AddEntryModal patientId={id} />
		</>
	);
};

export default PatientPage;