import swaggerUi from "swagger-ui-express";
import { Express } from "express";
// import { generateSwaggerSpec } from "./swaggerOptions";
import swaggerDocs from "../openapi.json"
import path from "path";
import express from "express"

const swaggerDistPath: string = path.join(
	__dirname,
	"../node_modules/swagger-ui-dist"
);

const setupSwagger = (app: Express): void => {
    app.use("/api-docs", 
        express.static(swaggerDistPath, { index: false }), 
        swaggerUi.serve, 
        swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
