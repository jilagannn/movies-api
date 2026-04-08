import { Movie } from "../models/movieModel";
import { QuerySnapshot, DocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import * as firestoreRepo from "../repositories/firestoreRepository";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { AppError } from "../errors/errors";

const COLLECTION = "movies";

export const getAllMovies = async(): Promise<Movie[]> => {
    try {
        const snapshot: QuerySnapshot = await firestoreRepo.getDocuments(COLLECTION);
        const movies: Movie[] = snapshot.docs.map(doc => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data
            } as Movie;
        });
        return movies;
    } catch (error) {
        throw error;
    };
};

export const getMovieById = async(
    movieId: string
): Promise<Movie> => {
    try {
        const snapshot: DocumentSnapshot | null = await firestoreRepo.getDocumentById(COLLECTION, movieId);
        if (!snapshot) {
            throw new AppError("Movie does not exist", "Movie_NOT_FOUND", HTTP_STATUS.NOT_FOUND);
        };

        const movieData: DocumentData | undefined = snapshot.data();
        const Movie: Movie = {
            id: snapshot.id,
            ...movieData
        } as Movie;

        return structuredClone(Movie);
    } catch (error) {
        throw error;
    };
};

export const createMovie = async(movieData: {
    movieTitle: string,
    description: string,
    genres: string[],
    runTime: string,
    actors: string[],
    director: string
}): Promise<Movie> => {
    try {
        const newMovieData: {
            movieTitle: string,
            description: string,
            genres: string[],
            runTime: string,
            actors: string[],
            director: string
        } = {
            ...movieData
        };

        const id: string = await firestoreRepo.createDocument<Movie>(COLLECTION, newMovieData);
        return { id, ...newMovieData } as Movie;
    } catch (error) {
        throw error;
    };
};

export const updateMovie = async(
    movieId: string,
    movieData: Partial<Pick<Movie, "movieTitle" | "description" | "genres" | "runTime" | "actors" | "director" >>
): Promise<Movie> => {
    try {
        const movie: Movie = await getMovieById(movieId);

        if (!movie) {
            throw new AppError("Movie does not exist", "MOVIE_NOT_FOUND", HTTP_STATUS.NOT_FOUND);
        };
        let updatedMovie: Movie;

        if (movieData) {
            updatedMovie = {
                ...movie,
                ...movieData
            };

        } else {
            updatedMovie = {
                ...movie
            };
        };

        await firestoreRepo.updateDocument<Movie>(COLLECTION, movieId, updatedMovie);

        return updatedMovie;
    } catch (error) {
        throw error;
    };
};

export const deleteMovie = async(
    movieId: string
): Promise<void> => {
    const movie: Movie = await getMovieById(movieId);

    if (!movie) {
        throw new AppError("Movie does not exist", "MOVIE_NOT_FOUND", HTTP_STATUS.NOT_FOUND);
    };

    await firestoreRepo.deleteDocument(COLLECTION, movieId);
};
