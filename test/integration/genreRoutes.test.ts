import request from "supertest";
import app from "../../src/app";
import * as genreController from "../../src/api/v1/controllers/genreController";
import { HTTP_STATUS } from "../../src/constants/httpConstants";

jest.mock("../../src/api/v1/controllers/genreController", () => ({
  getAllGenres: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  getGenreById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
  createGenre: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
  updateGenre: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
  deleteGenre: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Genre API Endpoint", () => {
  describe("GET /api/v1/genres", () => {
    it("should call getAllGenres", async () => {
      // Act
      await request(app).get("/api/v1/genres");

      // Assert
      expect(genreController.getAllGenres).toHaveBeenCalled();
    });

    describe("POST /api/v1/genres/", () => {
      it("should call createGenre", async () => {
        // Arrange
        const mockGenre: {
          genre: string;
        } = {
          genre: "Horror",
        };

        // Act
        await request(app).post("/api/v1/genres").send(mockGenre);

        // Assert
        expect(genreController.createGenre).toHaveBeenCalled();
      });
    });

    describe("GET /api/v1/genres/:id", () => {
      it("should call getGenre", async () => {
        // Act
        await request(app).get("/api/v1/genres/1");

        // Assert
        expect(genreController.getGenreById).toHaveBeenCalled();
      });
    });

    describe("PUT /api/v1/genres/:id", () => {
      it("should call updateGenre", async () => {
        // Arrange
        const mockGenre: {
          genre: string;
        } = {
          genre: "Horror",
        };

        // Act
        await request(app).put("/api/v1/genres/1").send(mockGenre);

        // Assert
        expect(genreController.updateGenre).toHaveBeenCalled();
      });
    });

    describe("DELETE /api/v1/genres/:id", () => {
      it("should call deleteGenre", async () => {
        // Act
        await request(app).delete("/api/v1/genres/1");

        // Assert
        expect(genreController.deleteGenre).toHaveBeenCalled();
      });
    });
  });
});
