interface Result {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

interface Rating {
	rating: number,
	ratingDescription: string
}

const getRating = (target: number, average: number): Rating => {
	const ratingValue = average - target;

	if (ratingValue >= 0)
		return {
			rating: 3,
			ratingDescription: "Good job!"
		};
	else if (ratingValue >= -0.5)
		return {
			rating: 2,
			ratingDescription: "Not too bad, but could be better"
		};
	else if (ratingValue >= -0.8)
		return {
			rating: 1,
			ratingDescription: "You could do better"
		};

	return {
		rating: 0,
		ratingDescription: "Wake up!"
	};

};

export const exerciseCalculator = (target: number, days: Array<number>): Result => {
	let totalHours = 0;
	let trainingDays = 0;

	days.forEach(d => {
		if (d > 0) {
			totalHours += d;
			trainingDays++;
		}
	});

	const average = totalHours / days.length;
	const { rating, ratingDescription } = getRating(target, average);

	return {
		periodLength: days.length,
		trainingDays,
		success: average >= target,
		rating,
		ratingDescription,
		target,
		average
	};
};

/*For command line use unquote these -> 
interface ParamArgs {
	target: number,
	days: Array<number>
}

const parseArgs = (args: Array<string>): ParamArgs => {
	if (args.length < 4) throw new Error('Not enough arguments');

	let target = 0;
	const days = [];

	for (let i = 2; i < args.length; i++) {
		const number = Number(args[i]);

		if (isNaN(number))
			throw new Error('Provided values were not numbers!');

		if (i === 2)
			target = number;
		else
			days.push(number);
	}

	return { target, days };
};

try {
	const { target, days } = parseArgs(process.argv);
	console.log(exerciseCalculator(target, days));
} catch (e) {
	console.log('ERROR: ', e.message);
}
<- */