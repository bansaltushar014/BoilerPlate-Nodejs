const express = require("express");
const session = require('express-session')
const logger = require("./lib/logger");
const app = express();
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("config/app.properties");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//const userRoutes= require("./routes/userroutes");
app.use(express.json()); //This is used in order for req.body.abc statemnets to work fine.
let cors = require("cors");
app.use(cors());
app.use(session({ secret: 'Secret_Key' }));
require("dotenv").config();

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

// const purchaseOrderRoutes = require("./routes/PurchaseOrderRoute.js");
// app.use("/manufacturer/purchase-order", purchaseOrderRoutes);

// const serviceOrderRoutes = require("./routes/ServiceOrderRoute.js");
// app.use("/service-order", serviceOrderRoutes);

// const shipmentRoutes = require("./routes/ShipmentRoute.js");
// app.use("/shipment", shipmentRoutes);

// const manufacturerRoutes = require("./routes/ManufacturerRoute.js");
// app.use("/manufacturer", manufacturerRoutes);

// const documentRoutes = require("./routes/DocumentRoute.js");
// app.use("/document", documentRoutes);

app.listen(5002, () => {
    logger.info("app is listening on port 5002");
});
