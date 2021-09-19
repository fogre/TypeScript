import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

interface AccordionProps {
	title: string;
}

const AccordionDropDown: React.FC<AccordionProps> = ({ title, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<Accordion fluid>
			<Accordion.Title active={open} onClick={() => setOpen(!open)}>
				<Icon name='dropdown' />
				{title}
			</Accordion.Title>
			<Accordion.Content active={open}>
				{children}
			</Accordion.Content>
		</Accordion>
	);
};

export default AccordionDropDown;