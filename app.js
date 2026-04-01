const express = require("express");
const cors = require("cors");
const diagnosisRoutes = require("./routes/diagnosis.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", diagnosisRoutes);

app.get("/", (req, res) => {
  res.send("Smart Diagnosis API is running...");
});


module.exports = app;