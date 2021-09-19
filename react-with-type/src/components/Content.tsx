import React from 'react';
//types
import type { CoursePart, CourseParts } from '../types';
//util
import { assertNever } from '../utils/asserts';

const PartHeader = ({ part }: { part: CoursePart }) => (
  <h4 style={{ marginBottom: '0' }}>{part.name} {part.exerciseCount}</h4>
);

const PartWithDescription = ({ part, description }: { part: CoursePart, description: string }) => (
	<>
		<CoursePartHeader part={part} />
		<p>{description}</p>
	</>
);

const ContentSwitch = (part: CoursePart) => {
	switch (part.type) {
		case "normal":
			return <PartWithDescription part={part} description={part.description} />;
		case "groupProject": {
			return(
				<>
					<CoursePartHeader part={part} />
					<p>project exercises {part.groupProjectCount}</p>
				</>
			);
		}
		case "submission": {
			return (
				<>
					<PartWithDescription part={part} description={part.description} />
					<p>submission url: {part.exerciseSubmissionLink}</p>
				</>	
			);
		}
		case "special": {
			return (
				<>
					<PartWithDescription part={part} description={part.description} />
					<p>
						requirements:
						{part.requirements.map(req => ' ' + req)}
					</p>
				</>
			);
		}
		default:
			return assertNever(part);
	}
}

const Content = (props: CourseParts) => (
	<>
		{props.courseParts.map(part => (
			<div key={part.name} style={{ marginBottom: '40px' }}>
				{ContentSwitch(part)}
			</div>
		))}
	</>
);

export default Content;