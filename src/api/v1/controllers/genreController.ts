import { Request, Response, NextFunction } from "express";
import * as genreService from "../services/genreService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Genre } from "../models/genreModel";

export const createGenre = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newGenre: Genre = await genreService.createGenre(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse(newGenre, "Genre created"));
  } catch (error: unknown) {
    next(error);
  }
};

export const getAllGenres = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const genres: Genre[] = await genreService.getAllGenres();
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(genres, "Genres retrieved", genres.length));
  } catch (error: unknown) {
    next(error);
  }
};

export const getGenreById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const genre = await genreService.getGenreById(id);
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(genre, "Genre successfully received"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Genre not found" });
  }
};

export const updateGenre = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const { genre } = req.body;

    const updatedGenre: Genre = await genreService.updateGenre(id, {
      genre,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(updatedGenre, "Genre updated successfully."));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Genre not found" });
  }
};

export const deleteGenre = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await genreService.deleteGenre(id);
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(undefined, "Genre successfully deleted."));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Genre not found" });
  }
};
