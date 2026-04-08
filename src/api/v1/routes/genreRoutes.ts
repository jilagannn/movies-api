import express from "express";
import * as genreService from ".././controllers/genreController";

const router = express.Router();

router.post("/", genreService.createGenre);

router.get("/", genreService.getAllGenres);

router.get("/:id", genreService.getGenreById);

router.put("/:id", genreService.updateGenre);

router.delete("/:id", genreService.deleteGenre);

export default router;
