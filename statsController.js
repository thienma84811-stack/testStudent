const db = require("../database/db");
const {
    calculateAverage,
    calculateHighestScore,
    calculateLowestScore,
    calculateStandardDeviation
} = require("../../algorithms/statistics");

function getStudentStatistics(req, res){
    const id = req.params.id;
    const students = db.prepare("SELECT * FROM student_score WHERE student_id = ?").all(id);
    const ID = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(ID === undefined){
        return res.status(404).json({error: "không tồn tại"});
    }
    const scores = [];
    for(const row of students){
        scores.push(row.score);
    }
    if(scores.length === 0){
        return res.status(400).json({error: "Học sinh chưa có điểm"});
    }
    const stats = {
        total: scores.length,
        average: calculateAverage(scores),
        highest: calculateHighestScore(scores),
        lowest: calculateLowestScore(scores),
        standardDeviation: calculateStandardDeviation(scores)
    };
    return res.status(200).json(stats);
}
module.exports = {getStudentStatistics};