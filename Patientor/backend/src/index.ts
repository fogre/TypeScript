import express from 'express';
import cors from 'cors';
//routes
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});