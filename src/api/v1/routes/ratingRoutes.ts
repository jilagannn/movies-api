import express from "express";
// import { validateRequest } from "../middleware/validate";
import * as ratingController from "../controllers/ratingController";

const router = express.Router();

router.get("/ratings", 
    ratingsController.getAllRatings
)

router.get("/ratings/:id", 
    ratingsController.getRatingById
)

router.get("/ratings", 
    ratingsController.getRatingByTitle
)

router.post("/ratings",
    ratingsController.createRating
)
router.put("/events/:id",
    ratingsController.updateRating
);

router.delete("/events/:id",
    ratingsController.deleteRating
);

export default router;
