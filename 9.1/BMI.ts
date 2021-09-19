type BMIvalue = 
  'Very severely underweight' |
  'Severely underweight' |
  'Underweight' |
  'Normal (healthy weight)' |
  'Overweight' |
  'Obese Class I (Moderately obese)' |
  'Obese Class II (Severely obese)' |
  'Obese Class III (Very severely obese)';

export const calculateBMI = (height: number, weight: number): BMIvalue => {
	const value = weight / Math.pow((height/100),2);

	if (value < 15)
		return 'Very severely underweight';
	else if (value >= 15 && value < 16)
		return 'Severely underweight';
	else if (value >= 16 && value < 18.5)
		return 'Underweight';
	else if (value >= 18.5 && value < 25)
		return 'Normal (healthy weight)';
	else if (value >= 25 && value < 30)
		return 'Overweight';
	else if (value > 30)
		return 'Obese Class II (Severely obese)';
	//etc.
	else
		throw new Error('You are beyond BMI');
};

/* for command line usage unquote these

interface InputValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


try {
	const { height, weight } = parseArguments(process.argv);
	console.log(calculateBMI(height, weight));
} catch (e) {
	console.log('Error: ', e.message);
}
*/