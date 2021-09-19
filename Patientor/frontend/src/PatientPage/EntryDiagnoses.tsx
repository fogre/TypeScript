import React from "react";
import { Header, List } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";

interface EntryDiagnosesProps {
	diagnosisCodes: Array<Diagnosis['code']> | undefined;
}

const EntryDiagnoses = ({ diagnosisCodes }: EntryDiagnosesProps) => {
	const [{ diagnoses }, ] = useStateValue();

	if (!diagnosisCodes || !diagnosisCodes.length || !diagnoses[diagnosisCodes[0]]) {
		return null;
	}
	
	return (
		<>
			<Header as="h5">Diagnoses</Header>
			<List>
				{diagnosisCodes.map(code => 
					<List.Item key={code}>
						{code} {diagnoses[code].name}
					</List.Item>
				)}
			</List>
		</>
	);
};

export default EntryDiagnoses;