import express from 'express';
//calculators
import { calculateBMI } from './BMI';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {

  if (
    !_req.query.height ||
    !_req.query.weight ||
    isNaN(Number(_req.query.height)) ||
    isNaN(Number(_req.query.weight))
  ) res.json({ error: "malformatte parameters" });  

  const bmi = calculateBMI(Number(_req.query.height), Number(_req.query.weight));

  res.json({
    height: _req.query.height,
    weight: _req.query.weight,
    bmi
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: any, res: any) => {
  if (!req.body.daily_exercises || !req.body.target)
    return res.json({ error: "parameters missing" });

  if (isNaN(req.body.target) || req.body.daily_exercises.some(isNaN))
    return res.json({ error: "malformatted parameters"});

  return res.json(exerciseCalculator(req.body.target, req.body.daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});