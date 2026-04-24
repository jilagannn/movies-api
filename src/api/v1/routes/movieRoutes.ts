import express, { Router } from "express";
import * as movieControllers from "../controllers/movieController";
import { validateRequest } from "../middleware/validate";
import { movieSchemas } from "../validations/movieValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Gets all movies in general or under a specific movie genre
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter movies by genre name.
 *         example: Thriller
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
    authenticate,
    movieControllers.getAllMovies
);

/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Gets a movie by id
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
 *         description: The JSON information of a single movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Movie retrieved successfully'
 *                 data:
 *                   $ref: '#/components/schemas/Movies'
 *       '404':
 *         description: Movie missing or not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.get(
    "/:id",
    authenticate,
    validateRequest(movieSchemas.getMovieById),
    movieControllers.getMovieById
);

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a movie
 *     tags: [Movies]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/CreateMovie'
 *         description: The request body properties needed to create a movie.
 *     responses:
 *       '201':
 *         description: Creating a movie successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Movie created successfully'
 *                 data:
 *                   $ref: '#/components/schemas/CreateMovie'
 *       '400':
 *         description: Invalid input data when creating a movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    validateRequest(movieSchemas.createMovie),
    movieControllers.createMovie
);

/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by id
 *     tags: [Movies]
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
 *         description: The request body properties needed to update a movie.
 *     responses:
 *       '200':
 *         description: Updating a movie successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Movie updated successfully'
 *                 data:
 *                   $ref: '#/components/schemas/UpdateMovie'
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
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    validateRequest(movieSchemas.updateMovie),
    movieControllers.updateMovie
);

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by id
 *     tags: [Movies]
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
 *         description: Movie missing or not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    validateRequest(movieSchemas.deleteMovie),
    movieControllers.deleteMovie
);

export default router;