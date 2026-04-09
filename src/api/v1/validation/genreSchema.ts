import Joi from "joi";

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
      content: Joi.string().optional().messages({
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
