const express = require("express");
const session = require('express-session')
const logger = require("./lib/logger");
const app = express();
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("config/app.properties");
const {connectMongo} = require("./config/dbConnection");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//const userRoutes= require("./routes/userroutes");
app.use(express.json()); //This is used in order for req.body.abc statemnets to work fine.
let cors = require("cors");
app.use(cors());
app.use(session({ secret: 'Secret_Key' }));
require("dotenv").config();

connectMongo();

const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "System apis",
            version: "1.0.0",
            description: "Apis for managing the blockchain system",
        },
        servers: [
            {
                url: `http://${properties.get("server.ip")}:5002`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header",
                },
            },
        },

        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                scheme: "bearer",
                in: "header",
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const enrollmentRoutes = require("./routes/EnrollmentRoute.js");
app.use("/enrollment", enrollmentRoutes);

app.listen(5002, () => {
    logger.info("app is listening on port 5002");
});
