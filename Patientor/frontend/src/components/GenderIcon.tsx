import React from 'react';
import { Icon } from 'semantic-ui-react';

const GenderIcon = ({ gender }: { gender: string }) => {
	switch(gender) {
		case "male":
			return (<Icon name="mars"/>);
		case "female":
			return (<Icon name="venus" />);
		case "other":
			return (<Icon name="transgender alternate"/>);
		default:
			return (<Icon name="genderless"/>);
	}
};

export default GenderIcon;