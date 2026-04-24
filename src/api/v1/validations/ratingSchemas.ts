import Joi from "joi";


/**
 * @openapi
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - movieTitle
 *         - rating
 *         - review
 *       properties:
 *         id:
 *           type: string
 *           description: The rating ID
 *           example: 12232
 *         movieTitle:
 *           type: string
 *           description: The movie name
 *           example: Interstellar
 *         rating:
 *           type: number
 *           description: The numeric value for a rating for the movie
 *           example: 6
 *         review:
 *           type: string
 *           description: The written review for the movie
 *           example: This movie is good.
 *         createdAt:
 *           type: string
 *           description: The date the rating was registered in the system
 *           example: 2027-10-05T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           description: The date the rating was updated while its in the system
 *           example: 2027-11-05T14:48:00.000Z
 */
export const ratingSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            movieTitle: Joi.string().required().messages({
                "any.required": "\"movieTitle\" is required",
                "string.empty": "\"movieTitle\" cannot be empty",
            }),
            rating: Joi.number().integer().required().max(10).messages({
                "any.required": "\"rating\" is required",
                "number.base": "\"rating\" must be an integer",
                "number.max": "\"rating\" must be less than or equal to 10"
            }),
            review: Joi.string().required().messages({
                "any.required": "\"review\" is required",
                "string.empty": "\"review\" cannot be empty",
            }),
        })
    },

    // GET /posts/:id - Get single post
    getRatingByID: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Rating ID is required",
                "string.empty": "Rating ID cannot be empty",
            })
        })
    },

    // PUT /posts/:id - Update post
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Rating ID is required",
                "string.empty": "Rating ID cannot be empty",
            }),
        }),
        body: Joi.object({
            movieTitle: Joi.string().optional().messages({
                "string.empty": "\"movieTitle\" cannot be empty",
            }),
            rating: Joi.number().integer().optional().max(10).messages({
                "number.base": "\"rating\" must be an integer",
                "number.max": "\"rating\" must be less than or equal to 10"
            }),
            review: Joi.string().optional().messages({
                "string.empty": "\"review\" cannot be empty",
            }),
        })
    },

    // DELETE /posts/:id - Delete post
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Rating ID is required",
                "string.empty": "Rating ID cannot be empty",
            })
        })
    }
}
