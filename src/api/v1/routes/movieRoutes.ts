import express, { Router } from "express";
import * as movieControllers from "../controllers/movieController";
import { validateRequest } from "../middleware/validate";
import { movieSchemas } from "../validations/movieValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       '200':
 *         description: An array of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Movies retrieved successfully'
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movies'
 */
router.get(
    "/",
    movieControllers.getAllMovies
);

/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get an movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the movie.
 *     responses:
 *       '200':
 *         description: An single movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'movie retrieved'
 *                 data:
 *                   $ref: '#/components/schemas/Movies'
 *       '404':
 *         description: movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.get(
    "/:id",
    validateRequest(movieSchemas.getMovieById),
    movieControllers.getMovieById
);

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create an movie
 *     tags: [movies]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/CreateMovie'
 *         description: The request body properties needed to create an movie.
 *     responses:
 *       '201':
 *         description: Created movie successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'movie created'
 *                 data:
 *                   $ref: '#/components/schemas/Movies'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post(
    "/",
    validateRequest(movieSchemas.createMovie),
    movieControllers.createMovie
);

/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Update an movie
 *     tags: [movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the movie.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/CreateMovie'
 *         description: The request body properties needed to update an movie.
 *     responses:
 *       '200':
 *         description: Updated movie successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'movie updated'
 *                 data:
 *                   $ref: '#/components/schemas/Movies'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '404':
 *         description: movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.put(
    "/:id",
    validateRequest(movieSchemas.updateMovie),
    movieControllers.updateMovie
);

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Deletes a movie by id
 *     tags: [movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the movie.
 *     responses:
 *       '204':
 *         description: Deleting a single movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'movie successfully deleted'
 *       '404':
 *         description: movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.delete(
    "/:id",
    validateRequest(movieSchemas.deleteMovie),
    movieControllers.deleteMovie
);

export default router;