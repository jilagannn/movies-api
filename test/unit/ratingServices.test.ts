import * as ratingsService from "../../src/api/v1/services/ratingServices";
import * as firestoreRepository from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository");

describe('getRatingById', () => {
    it("should return rating data ", async () => {
        // Arramge
        const mockData = {id: 1, movieTitle: "Summer Movie", rating: 10, review: "This movie is terrible."};

        // Act
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({data: () => mockData});
        const result = await ratingsService.getRatingByID("1");

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("ratings", "1");
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("movieTitle");
        expect(result).toHaveProperty("rating");
        expect(result).toHaveProperty("review");
        });

    it("should throw error when rating does not exist", async () => {
        // Arrange
        const id = "evt_000023";
        const expectedResponse = `Rating not found`;

        // Act
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

        // Assert
        await expect(ratingsService.getRatingByID(id)).rejects.toThrow(expectedResponse);
    });        
});

describe("getAllRatings", () => {

    it("should returns all ratings", async () => {
        // Arrange
        const mockEvents = [
            {id: 1, movieTitle: "Summer Movie", rating: 10, review: "This movie is terrible."},
            {id: 2, movieTitle: "Winter Movie", rating: 12, review: "This movie is good."}
        ];
        const COLLECTION = "ratings";

        // Act
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: [{data: () => mockEvents[0]}, {data: () => mockEvents[1]}]
        });
        const result = await ratingsService.getAllRatings();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(COLLECTION);
        expect(result).toEqual(mockEvents);
    });

    it("returns empty array when no rating exist", async () => {
        // Arrange
        const COLLECTION = "ratings";

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({docs: []});

        // Act
        const result = await ratingsService.getAllRatings();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(COLLECTION);
        expect(result).toEqual([]);
    });
});

describe('createRating', () => {
    it('should successfully create a rating for a movie', async () => {
        // Arrange Data
        const sampleData = {
            movieTitle: "Summer Movie", 
            rating: 7.4, 
            review: "This movie is the best."
        };

        // Act
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({ data: () => ({
            movieTitle: "Summer Movie", 
            rating: 7.4, 
            review: "This movie is the best."
        }) });
        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(1);

        const response = await ratingsService.createRating(sampleData);

        // Assert
        expect(response.id).toBe(1);
        expect(response.movieTitle).toBe("Summer Movie");
        expect(response.rating).toBe(7.4);
        expect(response.review).toBe("This movie is the best.");
    });
});

describe("updateRating", () => {
    it("should successfully update a rating for a movie", async () => {
        // Arrange
        const newData = {
            movieTitle: "Summer Movie", 
            rating: 7.4, 
            review: "This movie is the worst of the trilogy."
        };
        const COLLECTION = "ratings";

        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await ratingsService.updateRating("123", newData);

        // Assert
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(COLLECTION,"123", newData);
    })
});

describe("deleteEvent", () => {
    it("should delete as expected", async() =>{
        // arrange
        const existingData = {
            id: 123,
            movieTitle: "Summer Movie", 
            rating: 7.4, 
            review: "This movie is the worst of the trilogy."
        };
        const COLLECTION = "ratings";
        
        // Assert
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({data: () => existingData});

        await ratingsService.deleteRating("123");

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(COLLECTION, "123");
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(COLLECTION, "123");
    })
})

describe('getRatingByTitle', () => {
    it("should return rating data", async () => {
        // Arramge
        const mockData = {id: 1, movieTitle: "Summer Sports Movie", rating: 102, review: "This movie is mid."};

        // Act
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({docs: [{data: () => mockData}]});
        const result = await ratingsService.getRatingByTitle("Summer Sports Movie");

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("ratings");
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("movieTitle");
        expect(result[0]).toHaveProperty("rating");
        expect(result[0]).toHaveProperty("review");
        });

    it("should throw error when movie title does not exist", async () => {
        // Arrange
        const title = "movie_invalid";
        const expectedResponse = `Failed to get ratings`;

        // Act
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

        // Assert
        await expect(ratingsService.getRatingByTitle(title)).rejects.toThrow(expectedResponse);
    });        
});
