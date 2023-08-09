import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { client } from './database';
import format from 'pg-format';

const readMovie = async (req: Request, res: Response): Promise<Response> => {
  const categoryMovie: string = req.query.category as string;
  const queryCategory: string = `SELECT * FROM "movies" WHERE "category" = $1;`;

  const queryResultCategory: QueryResult = await client.query(queryCategory, [
    categoryMovie,
  ]);

  if (queryResultCategory.rowCount > 0) {
    return res.status(200).json(queryResultCategory.rows);
  }

  const queryTemplate: string = `SELECT * FROM "movies";`;
  const queryResult: QueryResult = await client.query(queryTemplate);

  return res.status(200).json(queryResult.rows);
};

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const queryTemplate: string = `INSERT INTO "movies" (%I) VALUES (%L) RETURNING *;`;

  const queryFormat: string = format(
    queryTemplate,
    Object.keys(req.body),
    Object.values(req.body)
  );

  const queryResult: QueryResult = await client.query(queryFormat);
  return res.status(201).json(queryResult.rows[0]);
};

const retrieveMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idMovie: string = req.params.id as string;
  const queryTemplate: string = `SELECT * FROM "movies" WHERE "id" = $1;`;

  const queryResult: QueryResult = await client.query(queryTemplate, [idMovie]);

  return res.status(200).json(queryResult.rows[0]);
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const idMovie: string = req.params.id as string;
  const queryTemplate = `UPDATE "movies" SET (%I) = ROW (%L) WHERE "id" = %L RETURNING *;`;

  const queryFormat: string = format(
    queryTemplate,
    Object.keys(req.body),
    Object.values(req.body),
    idMovie
  );

  const queryResult: QueryResult = await client.query(queryFormat);
  return res.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const idMovie: string = req.params.id as string;
  const queryTemplate = `DELETE FROM "movies" WHERE "id" = $1;`;

  await client.query(queryTemplate, [idMovie]);

  return res.status(204).send();
};

export { createMovie, readMovie, retrieveMovie, updateMovie, deleteMovie };
