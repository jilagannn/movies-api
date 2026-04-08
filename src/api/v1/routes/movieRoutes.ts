import express, { Router } from "express";
import * as movieControllers from "../controllers/movieController";
import { validateRequest } from "../middleware/validate";
import { movieSchemas } from "../validation/movieValidation";

const router: Router = express.Router();

router.get(
    "/",
    movieControllers.getAllMovies
);

router.get(
    "/:id",
    validateRequest(movieSchemas.getMovieById),
    movieControllers.getMovieById
);

router.post(
    "/",
    validateRequest(movieSchemas.createMovie),
    movieControllers.createMovie
);

router.put(
    "/:id",
    validateRequest(movieSchemas.updateMovie),
    movieControllers.updateMovie
);

router.delete(
    "/:id",
    validateRequest(movieSchemas.deleteMovie),
    movieControllers.deleteMovie
);

export default router;