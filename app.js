const express = require("express");
const cors = require("cors");
const diagnosisRoutes = require("./routes/diagnosis.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", diagnosisRoutes);

module.exports = app;