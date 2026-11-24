const express = require("express");
const router = express.Router();
const {getStudentStatistics} = require("../controllers/statsController");
router.get("/:id/statistics", getStudentStatistics);
module.exports = router;