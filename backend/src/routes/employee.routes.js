const express = require("express");
const router = express.Router();
const controller = require("../controllers/employee.controller");

router.get("/", controller.getAllEmployees);
router.post("/", controller.createEmployee);
router.get("/:id", controller.getEmployeeById);
router.delete("/:id", controller.deleteEmployee);

module.exports = router;