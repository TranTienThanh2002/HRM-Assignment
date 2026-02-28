const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employee.routes");
const leaveRoutes = require("./routes/leave.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/leave", leaveRoutes);

app.use(errorHandler);

module.exports = app;