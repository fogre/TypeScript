import React from "react";
import { Icon } from "semantic-ui-react";

const EntryIcon = ({ type }: { type: string }) => {
	switch (type) {
		case "Hospital":
			return <Icon name="hospital" />;
		case "OccupationalHealthcare":
			return 	<Icon name="stethoscope" />;
		case "HealthCheck":
			return <Icon name="doctor" />;
		default:
			return null;
	}
};

export default EntryIcon;