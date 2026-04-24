import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import { accessLogger, consoleLogger, errorLogger } from "./api/v1/middleware/logger";
import healthRoutes from "../src/api/v1/routes/healthRoutes";
import setupSwagger from "../config/swagger";
import movieRoutes from "../src/api/v1/routes/movieRoutes";
import genreRoutes from "../src/api/v1/routes/genreRoutes";
import ratingRoutes from "../src/api/v1/routes/ratingRoutes"
import adminRoutes from "../src/api/v1/routes/adminRoutes";
import userRoutes from "../src/api/v1/routes/userRoutes";
import loginRoutes from "../src/api/v1/routes/loginRoutes";
import errorHandler from "../src/api/v1/middleware/errorHandler";

// start express
const app: Express = express();

// configure logging middleware
if (process.env.NODE_ENV === "production") {
    // log to files for production
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // log to console for immediate feedback in development
    app.use(consoleLogger);
}


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

// Login
app.use("/api/v1", loginRoutes);

// Users
app.use("/api/v1/users", userRoutes);

// Admin
app.use("/api/v1/admin", adminRoutes);

// swagger
setupSwagger(app);

//  error handler
app.use(errorHandler);

export default app;
