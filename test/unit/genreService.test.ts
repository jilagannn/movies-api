import * as genreService from "../../src/api/v1/services/genreService";
import * as firestoreRepository from "../../src/api/v1/repositories/firestoreRepository";
import { Genre } from "../../src/api/v1/models/genreModel";

jest.mock("../../src/api/v1/repositories/firestoreRepository");

describe("Genre Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllGenres", () => {
    it("should get all genres successfully", async () => {
      // Arrange
      const mockGenres: Genre[] = [
        {
          id: "1",
          genre: "Science-Fiction",
        },
        {
          id: "2",
          genre: "Action",
        },
      ];

      (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
        docs: mockGenres.map((genre) => ({
          id: genre.id,
          data: jest.fn().mockReturnValue({
            genre: genre.genre,
          }),
        })),
      });

      // Act
      const result: Genre[] = await genreService.getAllGenres();

      // Assert
      expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("genres");
      expect(result.length).toBe(2);
    });
  });

  describe("getMovieById", () => {
    it("should get a genre by id successfully", async () => {
      // Arrange
      const mockGenre: Genre = {
        id: "1",
        genre: "action"
      };

      (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: mockGenre.id,
        data: jest.fn().mockReturnValue({
          genre: "action"
        }),
      });

      // Act
      const result: Genre = await genreService.getGenreById("1");

      // Assert
      expect(result.id).toBe(mockGenre.id);
      expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
        "genres",
        "1",
      );
    });
  });

      describe("createGenre", () => {
        it("should create a genre successfully", async () => {
            // Arrange
            const mockGenreData: {
                genre: string,

            } = {
                genre: "Action"
            };
            
            const mockGenreId: string = "1";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockGenreId);
            // (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({size: 2})

            // Act
            const result: Genre = await genreService.createGenre(mockGenreData);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "genres",
                expect.objectContaining({
                    genre: "Action"
                })
            );
            expect(result.id).toBe(mockGenreId);
            expect(result.genre).toBe(mockGenreData.genre);
        });
    });


       describe("deleteGenre", () => {
        it("should delete a genre successfully", async () => {
            // Arrange
            const mockGenreId: string = "67"
            const mockGenre: Genre = {
                id: mockGenreId,
                genre: "Action"
            };

            jest.spyOn(genreService, "getGenreById").mockResolvedValue(mockGenre);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
            
            // Act
            await genreService.deleteGenre(mockGenreId);

            // Assert
            expect(genreService.getGenreById).toHaveBeenCalledWith(mockGenreId);
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("genres", mockGenreId);
        })
    })

});
