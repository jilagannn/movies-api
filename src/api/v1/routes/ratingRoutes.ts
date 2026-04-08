import express from "express";
// import { validateRequest } from "../middleware/validate";
import * as ratingController from "../controllers/ratingController";

const router = express.Router();

router.get("/ratings", 
    ratingController.getAllRatings
)

router.get("/ratings/:id", 
    ratingController.getRatingById
)

router.get("/ratings", 
    ratingController.getRatingByTitle
)

router.post("/ratings",
    ratingController.createRating
)
router.put("/events/:id",
    ratingController.updateRating
);

router.delete("/events/:id",
    ratingController.deleteRating
);

export default router;
