const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {version} = require("../../package.json");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HARVEST HUB REST API DOCS",
            version,
        },
        components: {
            securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
            },
        },
        security: [
            {
            bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/mainRouter.js", "./src/sub-routes/**/*.js", './src/models/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app,port) => {
    // Swagger page
    app.use("/harvest-hub/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/harvest-hub/api-docs`);
}

module.exports = swaggerDocs;