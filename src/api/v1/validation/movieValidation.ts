import Joi from "joi";

/**
 * Joi validation schemas for CRUD endpoints that use req.body req.params.
 */
export const movieSchemas = {

    // GET /movies/:id - get a single movie
    getMovieById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            })
        })
    },

    // POST /movies - create a new movie
    createMovie: {
        body: Joi.object({
            movieTitle: Joi.string().required().messages({
                "any.required": "\"movieTitle\" is required",
                "string.empty": "\"movieTitle\" cannot be empty"
            }),
            description: Joi.string().required().messages({
                "any.required": "\"description\" is required",
                "string.empty": "\"description\" cannot be empty",
            }),
            genres: Joi.array().min(1).items(Joi.string()).required().messages({
                "any.required": "\"genres\" is required",
                "string.empty": "\"genres\" cannot be empty",
            }),
            runTime: Joi.string().required().messages({
                "any.required": "\"runTime\" is required",
                "string.empty": "\"runTime\" cannot be empty"
            }),
            actors: Joi.array().min(1).items(Joi.string()).required().messages({
                "any.required": "\"actors\" is required",
                "string.empty": "\"actors\" cannot be empty"
            }),
            director: Joi.string().required().messages({
                "any.required": "\"director\" is required",
                "string.empty": "\"director\" cannot be empty"
            })
        })
    },

    // PUT /movies/:id - update a single event
    updateMovie: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            })
        }),
        body: Joi.object({
            movieTitle: Joi.string().optional().messages({
                "string.empty": "\"movieTitle\" cannot be empty"
            }),
            description: Joi.string().optional().messages({
                "string.empty": "\"description\" cannot be empty",
            }),
            genres: Joi.array().min(1).items(Joi.string()).optional().messages({
                "string.empty": "\"genres\" cannot be empty",
            }),
            runTime: Joi.string().optional().messages({
                "string.empty": "\"runTime\" cannot be empty"
            }),
            actors: Joi.array().min(1).items(Joi.string()).optional().messages({
                "string.empty": "\"actors\" cannot be empty"
            }),
            director: Joi.string().optional().messages({
                "string.empty": "\"director\" cannot be empty"
            })
        })
    },

    // DELETE /movies/:id - delete a single event
    deleteMovie: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            })
        })
    }
};