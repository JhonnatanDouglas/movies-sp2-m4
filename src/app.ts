import 'dotenv/config';
import express, { Application, json } from 'express';
import { startDatabase } from './database';
import {
  createMovie,
  readMovie,
  retrieveMovie,
  updateMovie,
  deleteMovie,
} from './logics';
import { validateMovieId, validateMovieName } from './middlewares';

const app: Application = express();
app.use(json());

app.get('/movies', readMovie);
app.post('/movies', validateMovieName, createMovie);
app.get('/movies/:id', validateMovieId, retrieveMovie);
app.patch('/movies/:id', validateMovieId, validateMovieName, updateMovie);
app.delete('/movies/:id', validateMovieId, deleteMovie);

const PORT: number = 3000;
const message: string = `Application is running on: http://localhost:${PORT}`;
app.listen(PORT, async (): Promise<void> => {
  await startDatabase();
  console.log(message);
});
