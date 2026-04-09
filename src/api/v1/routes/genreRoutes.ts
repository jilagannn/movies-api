import express from "express";
import * as genreService from ".././controllers/genreController";
import { genreSchema } from "../validation/genreSchema";
import { validateRequest } from "../middleware/validate";

const router = express.Router();

router.post("/", validateRequest(genreSchema.create), genreService.createGenre);

router.get("/", genreService.getAllGenres);

router.get("/:id", validateRequest(genreSchema.getById), genreService.getGenreById);

router.put("/:id",validateRequest(genreSchema.update), genreService.updateGenre);

router.delete("/:id",validateRequest(genreSchema.delete), genreService.deleteGenre);

export default router;
