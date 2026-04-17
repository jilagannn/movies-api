import { Request, Response, NextFunction } from "express";
import * as movieControllers from "../../src/api/v1/controllers/movieController";
import * as movieService from "../../src/api/v1/services/movieService";
import { Movie } from "../../src/api/v1/models/movieModel";
import { HTTP_STATUS } from "../../src/constants/httpConstants";

jest.mock("../../src/api/v1/services/movieService");

describe("Movie Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: Partial<NextFunction>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {}, query: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext= jest.fn();
    });

    describe("getAllMovies", () => {
        it("should retrieve all movies", async () => {
            // Arrange
            const mockMovies: Movie[] = [
                {
                    id: "123123",
                    movieTitle: "The Testening",
                    description: "The Testening movie is the testing movie of all time",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 21m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                },
                {
                    id: "123124",
                    movieTitle: "The Testening 2",
                    description: "The Testening 2 movie is the testing movie of all time after The Testening",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 20m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                },
            ];
            (movieService.getAllMovies as jest.Mock).mockResolvedValue(mockMovies);

            // Act
            await movieControllers.getAllMovies(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Movies retrieved successfully",
                count: 2,
                data: mockMovies
            });
        });

        it("should retrieve all movies under a specific genre", async () => {
            // Arrange
            const mockMovies: Movie[] = [
                {
                    id: "123123",
                    movieTitle: "The Testening",
                    description: "The Testening movie is the testing movie of all time",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 21m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                },
                {
                    id: "123124",
                    movieTitle: "The Testening 2",
                    description: "The Testening 2 movie is the testing movie of all time after The Testening",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 20m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                },
            ];
            (movieService.getAllMovies as jest.Mock).mockResolvedValue(mockMovies);
            mockReq.query = {genre: "Action"};

            // Act
            await movieControllers.getAllMovies(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Movies retrieved successfully",
                count: 2,
                data: mockMovies
            });
        });
    });

    describe("getMovieById", () => {
        it("should retrieve a movie by id", async () => {
            // Arrange
            const mockMovies: Movie[] = [
                {
                    id: "123123",
                    movieTitle: "The Testening",
                    description: "The Testening movie is the testing movie of all time",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 21m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                },
                {
                    id: "123124",
                    movieTitle: "The Testening 2",
                    description: "The Testening 2 movie is the testing movie of all time after The Testening",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 20m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                },
            ];
            (movieService.getMovieById as jest.Mock).mockResolvedValue(mockMovies[0]);
            mockReq.params = {id: "123123"};

            // Act
            await movieControllers.getMovieById(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Movie retrieved successfully",
                data: mockMovies[0]
            });
        });

        it("should call nextFunction when movie not found", async () => {
            // Arrange
            const mockError: Error = new Error();
            (movieService.getMovieById as jest.Mock).mockRejectedValue(mockError);
            
            // Act
            await movieControllers.getMovieById(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("createMovie", () => {
        it("should create a movie", async () => {
            // Arrange
            const mockMovie: {
                movieTitle: string,
                description: string,
                genres: string[],
                runTime: string,
                actors: string[],
                director: string
            } = 
                {
                    movieTitle: "The Testening3 ",
                    description: "The Testening movie is the testing movie of all time after Testening 2 and Testening 3",
                    genres: ["Parody", "Comedy"],
                    runTime: "0h 30m",
                    actors: ["Test 1", "Test 2"],
                    director: "Unit Test"
                };
            (movieService.createMovie as jest.Mock).mockResolvedValue(mockMovie);
            mockReq.body = {
                movieTitle: mockMovie.movieTitle,
                description: mockMovie.description,
                genres: mockMovie.genres,
                runTime: mockMovie.runTime,
                actors: mockMovie.actors,
                director: mockMovie.director
            };

            // Act
            await movieControllers.createMovie(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Movie created successfully",
                data: mockMovie
            });
        });

        it("should call nextFunction when input data for creating a movie is invalid", async () => {
            // Arrange
            const mockError: Error = new Error();
            (movieService.createMovie as jest.Mock).mockRejectedValue(mockError);
            
            // Act
            await movieControllers.createMovie(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("updateMovie", () => {
        it("should update a movie by id", async () => {
            // Arrange
            const mockMovie: {
                runTime: string,
                actors: string[]
            } = 
                {
                    runTime: "0h 35m",
                    actors: ["Test 1", "Test 2", "Test 3"],
                };
            (movieService.updateMovie as jest.Mock).mockResolvedValue(mockMovie);
            mockReq.params = {id: "123125"}
            mockReq.body = {
                runTime: mockMovie.runTime,
                actors: mockMovie.actors,
            };

            // Act
            await movieControllers.updateMovie(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Movie updated successfully",
                data: mockMovie
            });
        });
        
        it("should call nextFunction input for updating movie data is invalid", async () => {
            // Arrange
            const mockError: Error = new Error();
            (movieService.updateMovie as jest.Mock).mockRejectedValue(mockError);
            
            // Act
            await movieControllers.updateMovie(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("deleteMovie", () => {
        it("should delete a movie by id", async () => {
            // Arrange
            mockReq.params = {id: "123123"};

            // Act
            await movieControllers.deleteMovie(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Movie deleted successfully"
            });
        });

        it("should call nextFunction when movie not found", async () => {
            // Arrange
            const mockError: Error = new Error();
            (movieService.deleteMovie as jest.Mock).mockRejectedValue(mockError)
            
            // Act
            await movieControllers.deleteMovie(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalled();
        });
    });
});