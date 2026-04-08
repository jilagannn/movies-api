import { Request, Response, NextFunction } from "express";
import * as ratingService from "../services/ratingServices";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Rating } from "../models/ratingModel"

/**
 * Handles getting all ratings.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllRatings = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const allRatings: Rating[] = await ratingService.getAllRatings();
        res.status(HTTP_STATUS.OK).json(successResponse(allRatings, "Rating Retrieved", allRatings.length));
    } catch (error: unknown) {
        const errorMessage: Error | string =
            error instanceof Error ? error.message : "Unknown error";
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `Failed to get all ratings: `, errorMessage});
        next(error);
    }
};

/**
 * Handles getting a single rating.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getRatingById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const requestedID: string = String(req.params.id) 
        const event: Event = await ratingService.getRatingByID(requestedID);
        res.status(HTTP_STATUS.OK).json(successResponse({event}, "Rating successfully retrived from the database."));
    } catch (error: unknown) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `Rating not found`});
        next(error);
    }
};

/**
 * Handles getting a single rating.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getRatingByTitle = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { movieTitle } = req.query;
        const ratings: Rating = await ratingService.getRatingByTitle(String(movieTitle));
        res.status(HTTP_STATUS.OK).json(successResponse(ratings, "Rating/s successfully retrived from the database."));
    } catch (error: unknown) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `Rating not found`});
        next(error);
    }
};

/**
 * Handles updating a rating.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateRating = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const requestedID: string = String(req.params.id) 
        await ratingService.updateRating(requestedID, req.body);
        res.status(HTTP_STATUS.OK).json(successResponse({}, `Rating with id ${requestedID} updated`));
    } catch (error: unknown) {
        const errorMessage: Error | string =
            error instanceof Error ? error.message : "Unknown error";
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `Failed to update rating: `, errorMessage});
        next(error);
    }
};

/**
 * Handles creating an event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createRating = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const eventData: Event = await ratingService.createRating(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse(eventData, "Rating created"));
    } catch (error: unknown) {
        const errorMessage: Error | string =
            error instanceof Error ? error.message : "Unknown error";
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `Failed to create rating: `, errorMessage});
        next(error);
    }
};

/**
 * Handles deleting a post.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteRating = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const requestedID: string = String(req.params.id) 
        await ratingService.deleteRating(requestedID);
        res.status(HTTP_STATUS.OK).json(successResponse({}, "Rating successfully deleted from the database."));
    } catch (error: unknown) {
        const errorMessage: Error | string =
            error instanceof Error ? error.message : "Unknown error";
        res.status(HTTP_STATUS.NOT_FOUND).json({message: `Failed to delete rating: `, errorMessage});
        next(error);
    }
};
