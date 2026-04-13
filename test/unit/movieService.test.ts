import * as movieService from "../../src/api/v1/services/movieService";
import * as firestoreRepo from "../../src/api/v1/repositories/firestoreRepository";
import { Movie } from "../../src/api/v1/models/movieModel";

jest.mock("../../src/api/v1/repositories/firestoreRepository");

describe("Movie Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllMovies", () => {
        it("should get all movies successfully", async () => {
            // Arrange
            const mockMovies: Movie[] = [
                {
                    id: "1",
                    movieTitle: "Spiderman: Into The Spiderverse",
                    description: "Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson 'Kingpin' Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.",
                    genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                    runTime: "1h 57m",
                    actors: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
                    director: "Bob Persichetti"
                },
                {
                    id: "2",
                    movieTitle: "Spiderman: Across The Spiderverse",
                    description: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
                    genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                    runTime: "2h 20m",
                    actors: ["Shameik Moore", "Brian Tyree Henry", "Hailee Steinfeld"],
                    director: "Kemp Powers"
                },
            ];

            (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({
                docs: mockMovies.map( movie => ({
                    id: movie.id,
                    data: jest.fn().mockReturnValue({
                        movieTitle: movie.movieTitle,
                        description: movie.description,
                        genres: movie.genres,
                        runTime: movie.runTime,
                        actors: movie.actors,
                        director: movie.director
                    })
                }))
            });

            // Act
            const result: Movie[] = await movieService.getAllMovies();

            // Assert
            expect(firestoreRepo.getDocuments).toHaveBeenCalledWith("movies");
            expect(result.length).toBe(2);
        });

        it("should get movies by genre successfully", async () => {
            // Arrange
                const mockMovies: Movie[] = [
                {
                    id: "1",
                    movieTitle: "Spiderman: Into The Spiderverse",
                    description: "Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson 'Kingpin' Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.",
                    genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                    runTime: "1h 57m",
                    actors: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
                    director: "Bob Persichetti"
                },
                {
                    id: "2",
                    movieTitle: "Spiderman: Across The Spiderverse",
                    description: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
                    genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                    runTime: "2h 20m",
                    actors: ["Shameik Moore", "Brian Tyree Henry", "Hailee Steinfeld"],
                    director: "Kemp Powers"
                },
            ];

            (firestoreRepo.getDocumentsByArrayContains as jest.Mock).mockResolvedValue({
                docs: mockMovies.map( movie => ({
                    id: movie.id,
                    data: jest.fn().mockReturnValue({
                        movieTitle: movie.movieTitle,
                        description: movie.description,
                        genres: movie.genres,
                        runTime: movie.runTime,
                        actors: movie.actors,
                        director: movie.director
                    })
                }))
            });

            // Act
            const result: Movie[] = await movieService.getAllMovies("Animation");

            // Assert
            expect(firestoreRepo.getDocumentsByArrayContains).toHaveBeenCalledWith("movies", "genres", "Animation");
            expect(result.length).toBe(2);
        })
    });

    describe("getMovieById", () => {
        it("should get a movie by id successfully", async () => {
            // Arrange
            const mockMovie: Movie = {
                id: "2",
                movieTitle: "Spiderman: Across The Spiderverse",
                description: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
                genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                runTime: "2h 20m",
                actors: ["Shameik Moore", "Brian Tyree Henry", "Hailee Steinfeld"],
                director: "Kemp Powers"
            };

           (firestoreRepo.getDocumentById as jest.Mock).mockResolvedValue({
                id: mockMovie.id,
                data: jest.fn().mockReturnValue({
                    movieTitle: mockMovie.movieTitle,
                    description: mockMovie.description,
                    genres: mockMovie.genres,
                    runTime: mockMovie.runTime,
                    actors: mockMovie.actors,
                    director: mockMovie.director
                    })
                });
            
            // Act
            const result: Movie = await movieService.getMovieById("2");

            // Assert
            expect(result.id).toBe(mockMovie.id);
            expect(firestoreRepo.getDocumentById).toHaveBeenCalledWith("movies", "2");
        });
    });

    describe("createMovie", () => {
        it("should create a movie successfully", async () => {
            // Arrange
            const mockMovieData: {
                movieTitle: string,
                description: string,
                genres: string[],
                runTime: string,
                actors: string[],
                director: string
            } = {
                movieTitle: "Spider-Man: Beyond the Spider-Verse",
                description: "Miles Morales is now a fugitive on the run from every other Spider in the multiverse, and Gwen and his other friends might not be enough to help him.",
                genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                runTime: "unknown",
                actors: ["Shameik Moore", "Brian Tyree Henry", "Hailee Steinfeld"],
                director: "Bob Persichetti"
            };
            
            const mockMovieId: string = "3";

            (firestoreRepo.createDocument as jest.Mock).mockResolvedValue(mockMovieId);
            // (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({size: 2})

            // Act
            const result: Movie = await movieService.createMovie(mockMovieData);

            // Assert
            expect(firestoreRepo.createDocument).toHaveBeenCalledWith(
                "movies",
                expect.objectContaining({
                    movieTitle: mockMovieData.movieTitle,
                    description: mockMovieData.description,
                    genres: mockMovieData.genres,
                    runTime: mockMovieData.runTime,
                    actors: mockMovieData.actors,
                    director: mockMovieData.director,
                })
            );
            expect(result.id).toBe(mockMovieId);
            expect(result.movieTitle).toBe(mockMovieData.movieTitle);
        });
    });

    describe("updateMovie", () => {
        it("should update a movie successfully", async () => {
            // Arrange
            const mockMovieData: {
                movieTitle: string,
                description: string,
                genres: string[],
                runTime: string,
                actors: string[],
                director: string
            } = {
                movieTitle: "Spiderman: Across The Spiderverse",
                description: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
                genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                runTime: "2h 20m",
                actors: ["Shameik Moore", "Brian Tyree Henry", "Hailee Steinfeld"],
                director: "Kemp Powers"
                
            };

            const updatedMovieData: {
                director: string
            } = {director: "Justin K. Thompson"}
            const mockMovieId: string = "2";
            (firestoreRepo.updateDocument as jest.Mock).mockResolvedValue(mockMovieData);

            // Act
            const result: Movie = await movieService.updateMovie(mockMovieId, updatedMovieData);

            // Assert
            expect(firestoreRepo.updateDocument).toHaveBeenCalledWith(
                "movies",
                "2",
                {
                    id: mockMovieId,
                    movieTitle: mockMovieData.movieTitle,
                    description: mockMovieData.description,
                    genres: mockMovieData.genres,
                    runTime: mockMovieData.runTime,
                    actors: mockMovieData.actors,
                    director: updatedMovieData.director
                }
            );
            expect(result.id).toBe(mockMovieId);
            expect(result.movieTitle).toBe(mockMovieData.movieTitle);
            expect(result.director).toBe(updatedMovieData.director);
        });
    });

    describe("deleteMovie", () => {
        it("should delete a movie successfully", async () => {
            // Arrange
            const mockMovieId: string = "67"
            const mockMovie: Movie = {
                id: mockMovieId,
                movieTitle: "Spiderman: To be Deleted!",
                description: "Spidrman movie test to be deleted hehehahaw",
                genres: ["Animation", "Action", "Adventure", "Science-Fiction"],
                runTime: "6h 7m",
                actors: ["Shameik Moore", "Brian Tyree Henry", "Hailee Steinfeld"],
                director: "Jhon Hidden"
            };

            jest.spyOn(movieService, "getMovieById").mockResolvedValue(mockMovie);

            (firestoreRepo.deleteDocument as jest.Mock).mockResolvedValue(undefined);
            
            // Act
            await movieService.deleteMovie(mockMovieId);

            // Assert
            expect(movieService.getMovieById).toHaveBeenCalledWith(mockMovieId);
            expect(firestoreRepo.deleteDocument).toHaveBeenCalledWith("movies", mockMovieId);
        })
    })
});
