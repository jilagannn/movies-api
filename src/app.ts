import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import morgan from "morgan";
import healthRoutes from "../src/api/v1/routes/healthRoutes";
import setupSwagger from "../config/swagger";
import movieRoutes from "../src/api/v1/routes/movieRoutes";
import genreRoutes from "../src/api/v1/routes/genreRoutes";
import ratingRoutes from "../src/api/v1/routes/ratingRoutes"

// start express
const app: Express = express();

// configure Morgan
app.use(morgan("combined"));

// middleware parsing for json responses
app.use(express.json());

// basic route
app.get("/", (req, res) => {
    res.send("This is a response to the request");
});

// health route
app.use("/api/v1/health", healthRoutes);

// Movies
app.use("/api/v1/movies", movieRoutes);

// Genres
app.use("/api/v1/genres", genreRoutes);

// Ratings
app.use("/api/v1", ratingRoutes);

setupSwagger(app);

export default app;
