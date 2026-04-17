import { Request, Response, NextFunction } from "express";
import * as genreController from "../../src/api/v1/controllers/genreController";
import * as genreService from "../../src/api/v1/services/genreService";
import { Genre } from "../../src/api/v1/models/genreModel";
import { HTTP_STATUS } from "../../src/constants/httpConstants";

jest.mock("../../src/api/v1/services/genreService");

describe("Genre Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("getAllGenres", () => {
    it("should retrieve all genres", async () => {
      // Arrange
      const mockGenre: Genre[] = [
        {
          id: "123123",
          genre: "Comedy",
        },
        {
          id: "123124",
          genre: "Horror",
        },
      ];
      (genreService.getAllGenres as jest.Mock).mockResolvedValue(mockGenre);

      // Act
      await genreController.getAllGenres(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction,
      );

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Genres retrieved successfully",
        count: 2,
        data: mockGenre,
      });
    });
  });

  describe("getGenreByID", () => {
    it("should retrieve a genre by id", async () => {
      // Arrange
      const mockGenre: Genre[] = [
        {
          id: "123123",
          genre: "Comedy",
        },
        {
          id: "123124",
          genre: "Horror",
        },
      ];

      (genreService.getGenreById as jest.Mock).mockResolvedValue(mockGenre[0]);
      mockReq.params = { id: "123123" };

      // Act
      await genreController.getGenreById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction,
      );

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Genre retrieved successfully",
        data: mockGenre[0],
      });
    });

    it("should call nextFunction when genre not found", async () => {
      // Arrange
      const mockError: Error = new Error();
      (genreService.getGenreById as jest.Mock).mockRejectedValue(mockError);

      // Act
      await genreController.getGenreById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction,
      );

      // Assert
      expect(mockNext).toHaveBeenCalled();
    });

    describe("createGenre", () => {
      it("should create a genre", async () => {
        // Arrange
        const mockGenre: {
          genre: string;
        } = {
          genre: "Horror",
        };
        (genreService.createGenre as jest.Mock).mockResolvedValue(mockGenre);
        mockReq.body = {
          genre: "Horror",
        };

        // Act
        await genreController.createGenre(
          mockReq as Request,
          mockRes as Response,
          mockNext as NextFunction,
        );

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: "Genre created successfully",
          data: mockGenre,
        });
      });

      it("should call nextFunction when input data for creating a genre is invalid", async () => {
        // Arrange
        const mockError: Error = new Error();
        (genreService.createGenre as jest.Mock).mockRejectedValue(mockError);

        // Act
        await genreController.getGenreById(
          mockReq as Request,
          mockRes as Response,
          mockNext as NextFunction,
        );

        // Assert
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });
});
