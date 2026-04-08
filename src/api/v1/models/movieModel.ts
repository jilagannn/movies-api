/**
 * Represents the response structure for a movie signature
 */
export interface Movie {
    id: string,
    movieTitle: string,
    description: string,
    genres: string[],
    runTime: string,
    actors: string[],
    director: string
};
