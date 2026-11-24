const express = require("express");
const router = express.Router();
const {getAllStudents, createStudent, getStudentById, putStudentById, deleteStudentById, createScores, getScores, createStudyrecord, getStudyrecords, createPredictScore, createElo, getElo} = require("../controllers/studentsController");
router.get("/", getAllStudents);

router.post("/", createStudent);

router.get("/:id", getStudentById);

router.put("/:id", putStudentById);

router.delete("/:id", deleteStudentById);

router.post("/:id/scores", createScores);

router.get("/:id/scores", getScores);

router.post("/:id/study-records", createStudyrecord);

router.get("/:id/study-records", getStudyrecords);

router.post("/:id/predict-score", createPredictScore);

router.post("/:id/elo", createElo);

router.get("/:id/elo", getElo);
module.exports = router;