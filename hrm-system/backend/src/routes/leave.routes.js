const express = require("express");
const router = express.Router();
const controller = require("../controllers/leave.controller");

router.post("/", controller.createLeave);
router.get("/", controller.getAllLeaves);
router.patch("/:id/approve", controller.approveLeave);
router.patch("/:id/reject", controller.rejectLeave);

module.exports = router;