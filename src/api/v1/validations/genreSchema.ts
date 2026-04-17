import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         genre:
 *           type: string
 *           example: Action
 *
 *     CreateGenreRequest:
 *       type: object
 *       required: [genre]
 *       properties:
 *         genre:
 *           type: string
 *           example: Action
 *
 *     UpdateGenreRequest:
 *       type: object
 *       properties:
 *         genre:
 *           type: string
 *           example: Horror
 */

export const genreSchema = {
  // POST /genre - Create new genre
  create: {
    body: Joi.object({
      genre: Joi.string().required().messages({
        "any.required": "Genre name is required",
        "string.empty": "Genre cannot be empty",
      }),
    }),
  },
  // GET /genre/:id - Get single genre
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Genre ID is required",
        "string.empty": "Genre ID cannot be empty",
      }),
    }),
  },

  // PUT /genre/:id - Update genre
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Genre ID is required",
        "string.empty": "Genre ID cannot be empty",
      }),
    }),
    body: Joi.object({
      genre: Joi.string().optional().messages({
        "string.empty": "Content cannot be empty",
      }),
    }),
  },

  // DELETE /genre/:id - Delete genre
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Genre ID is required",
        "string.empty": "Genre ID cannot be empty",
      }),
    }),
  },
};
