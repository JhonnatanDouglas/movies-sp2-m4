import { NextFunction, Request, Response } from 'express';
import { QueryResult } from 'pg';
import { client } from './database';

const validateMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId: string = req.params.id as string;
  const queryTemplate: string = `SELECT * FROM "movies" WHERE "id" = $1;`;

  const queryResult: QueryResult = await client.query(queryTemplate, [movieId]);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({ message: 'Movie not found!' });
  }

  return next();
};

const validateMovieName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const nameMovie: string = req.body.name as string;
  const queryTemplate: string = `SELECT * FROM "movies" WHERE "name" = $1;`;

  const queryResult: QueryResult = await client.query(queryTemplate, [
    nameMovie,
  ]);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({ message: 'Movie name already exists!' });
  }

  return next();
};

export { validateMovieId, validateMovieName };
