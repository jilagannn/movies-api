/**
 * Represents the response structure for a rating signature
 */
export interface Rating {
    id: string,
    movieTitle: string,
    rating: number,
    review: string,
    createdAt: string,
    updatedAt?: string
};
