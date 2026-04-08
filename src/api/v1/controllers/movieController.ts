import { Request, Response, NextFunction } from "express";
import { Movie } from "../models/movieModel";
import * as movieService from "../services/movieService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

export const getAllMovies = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const genre: string | undefined = req.query.genre as string;
        const movies: Movie[] = await movieService.getAllMovies(genre);
        const count: number = movies.length;
        res.status(HTTP_STATUS.OK).json(
            successResponse(movies, "Movies retrieved successfully", count)
        );
    } catch (error) {
        next(error);
    };
};

export const getMovieById = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const movieId: string = (id as string);
        const movieData: Movie = await movieService.getMovieById(movieId);
        res.status(HTTP_STATUS.OK).json(
            successResponse(movieData, "Movie retrieved successfully")
        );
    } catch (error) {
        next(error);
    };
};

export const createMovie = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { movieTitle, description, genres, runTime, actors, director } = req.body;
        const movieData: {
            movieTitle: string,
            description: string,
            genres: string[],
            runTime: string,
            actors: string[],
            director: string
        } = {
            movieTitle,
            description,
            genres,
            runTime,
            actors,
            director
        };

        const newMovie: Movie = await movieService.createMovie(movieData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newMovie, "Movie created successfully")
        );
    } catch (error) {
        next(error);
    };
};

export const updateMovie = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const movieId: string = (id as string);
        const { movieTitle, description, genres, runTime, actors, director } = req.body;
        const updatedMovieData: Partial<Pick<Movie, "movieTitle" | "description" | "genres" | "runTime" | "actors" | "director" >> ={
            movieTitle,
            description,
            genres,
            runTime,
            actors,
            director
        };

        const updatedMovie: Movie = await movieService.updateMovie(movieId, updatedMovieData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedMovie, "Movie updated successfully")
        );
    } catch (error) {
        next(error);
    };
};

export const deleteMovie = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const movieId: string = (id as string);
        
        await movieService.deleteMovie(movieId);
        res.status(HTTP_STATUS.NO_CONTENT).json({
            message: "Movie deleted successfully"
        })
    } catch (error) {
        next(error);
    };
};
