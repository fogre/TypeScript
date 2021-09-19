import React from "react";
import { Header, Segment } from "semantic-ui-react";

import EntryDiagnoses from './EntryDiagnoses';
import EntryIcon from './EntryIcon';
import AccordionDropDown from '../components/AccordionDropDown';
import HealthRatingBar from '../components/HealthRatingBar';
import { Entry } from "../types";
import { assertNever } from '../utils/asserts';

interface EntriesProps {
	entries: Entry[];
}

interface EntryProps {
  entry: Entry;
}

const SingleEntryComponent: React.FC<EntryProps> = ({ entry, children }) => (
	<>
		<Header as="h4">
			{entry.date}
			<EntryIcon type={entry.type} />
			{entry.type === "OccupationalHealthcare" ? entry.employerName : null}
		</Header>
		<p style={{ color: 'grey', fontSize: '0.9rem' }}>{entry.description}</p>
		<AccordionDropDown title="details">
			{children}
			<EntryDiagnoses diagnosisCodes={entry.diagnosisCodes} />
			<p>specialist: {entry.specialist}</p>
		</AccordionDropDown>
	</>
);

const HospitalEntryComponent = ({ entry }: EntryProps) => {
	if (entry.type !== "Hospital") {
		return null;
	}

	return(
		<SingleEntryComponent entry={entry}>
			<Header as="h5">Discharge</Header>
			<p>{entry.discharge.date} {entry.discharge.criteria}</p>
		</SingleEntryComponent>
	);
};

const OccupationalHealthCareComponent = ({ entry }: EntryProps) => {
	if (entry.type !== "OccupationalHealthcare") {
		return null;
	}

	return (
		<SingleEntryComponent entry={entry}>
			{entry.sickLeave
				? <>
						<Header as="h5">Sick leave</Header>
						<p>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
					</>
				: null
			}
		</SingleEntryComponent>
	);
};

const HealtCheckComponent = ({ entry }: EntryProps) => {
	if (entry.type !== "HealthCheck") {
		return null;
	}

	return (
		<SingleEntryComponent entry={entry}>
			<HealthRatingBar
				rating={entry.healthCheckRating}
				showText={true}
			/>
		</SingleEntryComponent>
	);	
};

const EntryDetails = ({ entry }: EntryProps) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryComponent entry={entry} />;
		case "OccupationalHealthcare":
			return 	<OccupationalHealthCareComponent entry={entry} />;
		case "HealthCheck":
			return <HealtCheckComponent entry={entry} />;
		default:
			return assertNever(entry);
	}
};

const Entries = ({ entries }: EntriesProps) => {

	if (!entries || !entries.length) {
		return null;
	}

	return(
		<>
			<Header as="h4">entries</Header>
			{entries.map(entry => (
				<Segment key={entry.id}>
					<EntryDetails entry={entry} />
				</Segment>
			))}
		</>
	);
};

export default Entries;