import request from "supertest";
import app from "../../src/app";
import * as movieControllers from "../../src/api/v1/controllers/movieController";
import { HTTP_STATUS } from "../../src/constants/httpConstants";

jest.mock("../../src/api/v1/controllers/movieController", () => ({
    getAllMovies: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getMovieById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createMovie: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateMovie: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    deleteMovie: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Movie API Endpoints", () => {
    describe("GET /api/v1/movies", () => {
        it("should call getAl/movies movieController", async () => {
            // Act
            await request(app).get("/api/v1/movies");
            
            // Assert
            expect(movieControllers.getAllMovies).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/movies/:id", () => {
        it("should call getMovie movieController", async () => {
            // Act
            await request(app).get("/api/v1/movies/1");

            // Assert
            expect(movieControllers.getMovieById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/movies", () => {
        it("should call createMovie movieController", async () => {
            // Arrange
            const mockMovie: {
                movieTitle: string, 
                description: string, 
                genres: string[],
                runTime: string,
                actors: string[],
                director: string
            } = {
                movieTitle: "Test movie",
                description: "Test movie for creating a movie",
                genres: ["action", "adventure"],
                runTime: "1h 24m",
                actors: ["Willem Dafoe", "Mineheheheheh", "How Hungry"],
                director: "RRC GOat"
            };

            // Act
            await request(app).post("/api/v1/movies").send(mockMovie);

            // Assert
            expect(movieControllers.createMovie).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/movies/:id", () => {
        it("should call updateMovie movieController", async () => {
            // Arrange
            const mockMovie: {
                movieTitle: string, 
                description: string, 
                genres: string[]
            } = {
                movieTitle: "Updated movie",
                description: "Test movie for updating a movie",
                genres: ["Sci-fi", "NothingBurga"]
            };

            // Act
            await request(app).put("/api/v1/movies/1").send(mockMovie);

            // Assert
            expect(movieControllers.updateMovie).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/movies/:id", () => {
        it("should call deleteMovie movieController", async () => {
            // Act
            await request(app).delete("/api/v1/movies/1");

            // Assert
            expect(movieControllers.deleteMovie).toHaveBeenCalled();
        });
    });
})