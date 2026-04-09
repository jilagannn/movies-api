import { Rating } from "../models/ratingModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const COLLECTION: string = "ratings";

/**
 * Return a single rating.
 * @param id - The id of the rating.
 * @returns - the data of the id specified.
 */
export const getRatingByID = async(id: string): Promise<Rating> => {
    try {
        const ratingData: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById(COLLECTION, id);
        if (ratingData === null){
            throw new Error(`Rating not found`);
        }
        return ratingData.data() as Rating
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get rating: ${errorMessage}`
        );
    }
};

/**
 * Return a rating for a specified movie
 * @param title - The title of the movie.
 * @returns - the ratings for the movie specified.
 */
export const getRatingByTitle  = async(title: string): Promise<Rating[]> => {
    try {
        let ratingData: Rating[] = [];
        const ratings: FirebaseFirestore.QuerySnapshot = await firestoreRepository.getDocuments(COLLECTION);

        for (let e of ratings.docs) {
            if (e.data().movieTitle == title){
                ratingData.push(e.data() as Rating)  
            }
        }
        
        if (ratingData.length === 0){
            throw new Error(`No Ratings found`);
        }

        return ratingData
    } catch (error: unknown) {
        throw new Error(
            `Failed to get ratings`
        );
    }
};

/**
 * Returns all ratings in the database.
 * @returns - the array of ratings.
 */
export const getAllRatings = async(): Promise<Rating[]> => {
    try {
        let ratingData: Rating[] = [];
        const ratings: FirebaseFirestore.QuerySnapshot = await firestoreRepository.getDocuments(COLLECTION);

        for (let e of ratings.docs) {
            ratingData.push(e.data() as Rating)
        }
        
        return ratingData
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get ratings: ${errorMessage}`
        );
    };
};

/**
 * Creates a new Rating.
 * @param ratingData - The required information to create the rating/review.
 * @returns - A structured clone of the rating by the user.
 */
export const createRating = async(ratingData: {
    movieTitle: string,
    rating: number,
    review: string,
    createdAt?: string,
    updatedAt?: string
}): Promise<Rating> => {
    try{
        const newRating: {
            movieTitle: string,
            rating: number,
            review: string,
            createdAt?: string,
            updatedAt?: string
        } = {
            ...ratingData
        };

        const id: string = await firestoreRepository.createDocument<Rating>(COLLECTION, newRating);
        return { id, ...newRating } as Rating;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create rating: ${errorMessage}`
        );
    };
};

/**
 * Updates an existing rating.
 * @param {Post} ratingData - The updated rating data.
 * @throws {Error} - If validation or repository operation fails.
 */
export const updateRating = async (
    id: string, 
    ratingData: {
        movieTitle: string,
        rating: number,
        review: string
        updatedAt?: string
    }): Promise<void> => {

    // This try catch will only check if it exists, and if yes, perform update
    try{

        ratingData.updatedAt = new Date().toISOString();
        await firestoreRepository.updateDocument<Rating>(
            COLLECTION,
            id,
            ratingData
        );
    } catch (error: unknown) {
        throw new Error(
            `Failed to update post ${id}: Rating with id ${id} not found`
        );
    };
};

/**
 * Delete a single rating.
 * @param id - The id of the rating.
 */
export const deleteRating = async(id: string): Promise<void> => {
    try {
        // Check if the document exist first
        const ratingData: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById(COLLECTION, id);
        if (ratingData === null){
            throw new Error(`Rating not found`);
        }
        await firestoreRepository.deleteDocument(COLLECTION, id);

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete rating ${id}: ${errorMessage}`
        );
    };
};
