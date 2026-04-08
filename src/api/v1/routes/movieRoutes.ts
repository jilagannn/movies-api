import express, { Router } from "express";
import * as movieControllers from "../controllers/movieController";

const router: Router = express.Router();

router.get(
    "/",
    movieControllers.getAllMovies
);

router.get(
    "/:id",
    movieControllers.getMovieById
);

router.post(
    "/",
    movieControllers.createMovie
);

router.put(
    "/:id",
    movieControllers.updateMovie
);

router.delete(
    "/:id",
    movieControllers.deleteMovie
);

export default router;