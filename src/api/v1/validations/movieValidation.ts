import Joi from "joi";


/**
 * @openapi
 * components:
 *   schemas:
 *     Movies:
 *       type: object
 *       required:
 *         - id
 *         - movieTitle
 *         - description
 *         - genres
 *         - runTime
 *         - actors
 *         - director
 *       properties:
 *         id:
 *           type: string
 *           description: The movie id.
 *           example: r6wj4Sl8a3cHkfc9MUrk
 *         movieTitle:
 *           type: string
 *           description: The title of the movie.
 *           example: "Spiderman: Into The Spiderverse"
 *         description:
 *           type: string
 *           description: A quick synopsis describing what happens in the movie.
 *           example: Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson "Kingpin" Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: The genre types for the movie.
 *           example: ["Animation", "Action", "Adventure", "Science-Fiction"]
 *         runTime:
 *           type: string
 *           description: The total run time or duration of the movie.
 *           example: 1h 57m
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *           description: The associated actors that took roles for the movie.
 *           example: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"]
 *         director:
 *           type: string
 *           description: The main director of the movie.
 *           example: Bob Persichetti
 * 
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message.
 *           example: 'Validation error: \"movieTitle\" must be a string'
 * 
 *     NotFoundError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message.
 *           example: 'Movie not found'
 * 
 *     CreateMovie:
 *       type: object
 *       required:
 *         - movieTitle
 *         - description
 *         - genres
 *         - runtime
 *         - actors
 *         - director
 *       properties:
 *         movieTitle:
 *           type: string
 *           description: The title of the movie.
 *           example: "Spiderman: Into The Spiderverse"
 *         description:
 *           type: string
 *           description: A quick synopsis describing what happens in the movie.
 *           example: Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson "Kingpin" Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: The genre types for the movie.
 *           example: ["Animation", "Action", "Adventure", "Science-Fiction"]
 *         runTime:
 *           type: string
 *           description: The total run time or duration of the movie.
 *           example: 1h 57m
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *           description: The associated actors that took roles for the movie.
 *           example: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"]
 *         director:
 *           type: string
 *           description: The main director of the movie.
 *           example: Bob Persichetti
 */

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