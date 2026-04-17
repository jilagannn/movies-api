import express from "express";
import * as ratingController from "../controllers/ratingController";

const router = express.Router();

/**
 * @openapi
 * /ratings:
 *   get:
 *     summary: Retrieve all ratings
 *     tags: [Rating]
 *     parameters: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rating'
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved all ratings
 *                 count:
 *                   type: number
 *                   example: 12
 *       '404':
 *         description: "Failed to get all ratings"
 */
router.get("/ratings", 
    ratingController.getAllRatings
)

/**
 * @openapi
 * /rating/{id}:
 *   get:
 *     summary: Retrieve a single rating
 *     tags: [Rating]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the rating
 *         required: true
 *         schema:
 *           type: string 
 *     responses:
 *       '200':
 *         description: Successfully retrieved rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Rating'
 *                 message:
 *                   type: string
 *                   example: Rating successfully retrived from the database.
 *       '404':
 *         description: Rating not found
 */
router.get("/ratings/searchID/:id", 
    ratingController.getRatingById
)

/**
 * @openapi
 * /ratings?title=movieTitle:
 *   get:
 *     summary: Retrieve an array of ratings with the title given 
 *     tags: [Rating]
 *     queries:
 *       - name: title
 *         in: path
 *         description: The title of the movie
 *         required: true
 *         type: string 
 *     responses:
 *       '200':
 *         description: Successfully retrieved rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Rating'
 *                 message:
 *                   type: string
 *                   example: Rating successfully retrived from the database.
 *       '404':
 *         description: Rating not found
 */
router.get("/ratings/searchTitle", 
    ratingController.getRatingByTitle
)

/**
 * @openapi
 * /rating:
 *   post:
 *     summary: Create a new rating
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieTitle
 *               - rating
 *               - review
 *             properties:
 *               movieTitle:
 *                 type: string
 *                 example: "Summer Movie"
 *               rating:
 *                 type: number
 *                 maximum: 10
 *                 example: 7
 *               review:
 *                 type: string
 *                 example: 90
 *     responses:
 *       '201':
 *         description: Rating created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Rating'
 *                 message:
 *                   type: string
 *                   example: Rating created
 *       '400':
 *         description: Invalid input data
 *       '404':
 *         description: "Failed to create Rating: Info"
 */
router.post("/ratings",
    ratingController.createRating
)

// Example 3: Path parameters and authentication
/**
 * @openapi
 * /rating/{id}:
 *   put:
 *     summary: Update an rating's information
 *     tags: [Rating]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       '200':
 *         description: Rating updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       '404':
 *         description: Rating not found
 */
router.put("/ratings/:id",
    ratingController.updateRating
);

/**
 * @openapi
 * /rating/{id}:
 *   delete:
 *     summary: Delete an rating by ID
 *     tags: [Rating]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the item
 *     responses:
 *       '200':
 *         description: Rating deleted successfully
 *       '404':
 *         description: Rating not found
 */
router.delete("/ratings/:id",
    ratingController.deleteRating
);

export default router;
