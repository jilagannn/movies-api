import express from "express";
import * as genreService from ".././controllers/genreController";
import { genreSchema } from "../validations/genreSchema";
import { validateRequest } from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * /api/v1/genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [genre]
 *             properties:
 *               genre:
 *                 type: string
 *                 example: Action
 *     responses:
 *       201:
 *         description: Genre created successfully

 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Genres retrieved successfully
 *
 * /api/v1/genres/{id}:
 *   get:
 *     summary: Get a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Genre successfully received
 *       404:
 *         description: Genre not found
 * 
 *   put:
 *     summary: Update a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre:
 *                 type: string
 *                 example: Horror
 *     responses:
 *       200:
 *         description: Genre updated successfully.
 *       404:
 *         description: Genre not found
 *
 *   delete:
 *     summary: Delete a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Genre successfully deleted.
 *       404:
 *         description: Genre not found
 */

router.post(
  "/",
  validateRequest(genreSchema.create),
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  genreService.createGenre,
);

router.get("/", genreService.getAllGenres);

router.get(
  "/:id",
  validateRequest(genreSchema.getById),
  genreService.getGenreById,
);

router.put(
  "/:id",
  validateRequest(genreSchema.update),
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  genreService.updateGenre,
);

router.delete(
  "/:id",
  validateRequest(genreSchema.delete),
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  genreService.deleteGenre,
);

export default router;
