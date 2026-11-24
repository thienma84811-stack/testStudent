const db = require("../database/db");
const {predictScore} = require("../../algorithms/regression");
const {updateRating} = require("../../algorithms/elo")
function getAllStudents(req, res){
    const students = db.prepare("SELECT * FROM students").all();
    return res.status(200).json(students);
}

function createStudent(req, res){
    const name = req.body.name;
    const Class = req.body.class;
    if(
        typeof name !== "string" || !name.trim() ||
        typeof Class !== "string" || !Class.trim() 
    ){
        return res.status(400).json({error: "Thiếu hoặc sai 1 trong 2"});
    }
    const insertStudent = db.prepare("INSERT INTO students(name, class) VALUES(?, ?)");
    insertStudent.run(name, Class);
    return res.status(201).json({name: name, class: Class});
}

function getStudentById(req, res){
    const id = req.params.id;
    const students = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(students === undefined){
        return res.status(404).json({error: "Không tìm thấy id"});
    }
    res.status(200).json(students);
}

function putStudentById(req, res){
    const id = req.params.id;
    const name = req.body.name;
    const Class = req.body.class;
    if(
        typeof name !== "string" || !name.trim() ||
        typeof Class !== "string" || !Class.trim()
    ){
        return res.status(400).json({error: "Thiếu hoặc sai 1 trong 2"});
    }
    const update = db.prepare("UPDATE students SET name = ?, class = ? WHERE id = ?");
    const result = update.run(name, Class, id);
    if(result.changes === 0){
        return res.status(404).json({error: "Không tồn tại"});
    }
    res.status(200).json({name: name, class: Class, id: id});
}

function deleteStudentById(req, res){
    const id = req.params.id;
    const deleteStudent = 
db.transaction(function(studentId) {
        db.prepare("DELETE FROM student_score WHERE student_id = ?").run(studentId);
        db.prepare("DELETE FROM study_records WHERE student_id = ?").run(studentId);
        db.prepare("DELETE FROM student_ratings WHERE student_id = ?").run(studentId);

        return db.prepare("DELETE FROM students WHERE id = ?").run(studentId);
});
    const result = deleteStudent(id);
    if(result.changes === 0){
        return res.status(404).json({error: "Không tồn tại"});
    }
    res.status(200).json({message: "Xóa thành công"});
}

function createScores(req, res){
    const id = req.params.id;
    const subject = req.body.subject;
    const score = req.body.score;
    const student = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(student === undefined){
        return res.status(404).json({error: "Không tìm thấy id"});
    }
    if(typeof subject !== "string" || !subject.trim() || !Number.isFinite(score) || score < 0 || score > 10){
        return res.status(400).json({error: "Cần nhập môn học hợp lệ"});
    } 
    const insertStudent = db.prepare("INSERT INTO student_score(student_id, subject, score) VALUES(?, ?, ?)");
    insertStudent.run(id, subject, score);
    res.status(201).json({student_id: id, subject: subject, score: score});
}

function getScores(req, res){
    const id = req.params.id;
    const students = db.prepare("SELECT * FROM student_score WHERE student_id = ?").all(id);
    const ID = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(ID === undefined){
        return res.status(404).json({error: "Học sinh không tồn tại"});
    }
    res.status(200).json(students);
}

function createStudyrecord(req, res){
    const id = req.params.id;
    const hours = req.body.hours;
    const score = req.body.score;
    const students = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(students === undefined){
        return res.status(404).json({error: "Không tìm thấy id"});
    }
    if(!Number.isFinite(hours) || !Number.isFinite(score) || hours < 0 || score < 0 || score > 10){
        return res.status(400).json({error: "Giờ học hoặc điểm sai"});
    }
    const insertStudy_records = db.prepare("INSERT INTO study_records(student_id, hours, score) VALUES(?, ?, ?)");
    insertStudy_records.run(id, hours, score)
    res.status(201).json({student_id: id, hours: hours, score: score});
}

function getStudyrecords(req, res){
    const id = req.params.id;
    const students = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(students === undefined){
        return res.status(404).json({error: "Không tìm thấy"});
    }
    const saved = db.prepare("SELECT * FROM study_records WHERE student_id = ?").all(id);
    return res.status(200).json(saved);
}

function createPredictScore(req, res){
    const id = req.params.id;
    const hours = req.body.hours;
    const students = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(students === undefined){
        return res.status(404).json({error: "không tồn tại"});
    }
    if(!Number.isFinite(hours) || hours < 0){
        return res.status(400).json({error: "Giờ phải là số không âm"});
    }
    const data = db.prepare("SELECT hours, score FROM study_records WHERE student_id = ?").all(id);
    if(data.length < 2){
        return res.status(400).json({error: "Cần ít nhất 2 bản ghi để dự đoán"});
    }
    const predictedScore = predictScore(data, hours);
    if(predictedScore === null){
        return res.status(400).json({error: "Dữ liệu giờ học không đủ khác nhau để dự đoán"})
    }
    return res.status(200).json({predictedScore: predictedScore});
}

function createElo(req, res){
    const id = req.params.id;
    const difficulty = req.body.difficulty;
    const result = req.body.result;
    const students = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(students === undefined){
        return res.status(404).json({error: "Không tìm thấy"});
    }
    if(!Number.isFinite(difficulty) || difficulty < 0){
        return res.status(400).json({error: "phải là số không âm"});
    }
    if(result !== 0 && result !== 0.5 && result !== 1){
        return res.status(400).json({error: "Phải là 0, 0.5 hoặc 1"});
    }
    const saved = db.prepare("SELECT rating FROM student_ratings WHERE student_id = ? ").get(id);
    let currentRating = 1000;
    if(saved){
        currentRating = saved.rating;
    }
    const newRating = updateRating(currentRating, difficulty, result);
    if(!Number.isFinite(newRating)){
        return res.status(400).json({error: "Không tính được rating hợp lệ"});
    }
    db.prepare(`
        INSERT INTO student_ratings(student_id, rating)
        VALUES(?, ?)
        ON CONFLICT(student_id)
        DO UPDATE SET rating = excluded.rating`).run(id, newRating);
    return res.status(200).json({student_id: id, rating: newRating});
}

function getElo(req, res){
    const id = req.params.id;
    const students = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if(students === undefined){
        return res.status(404).json({error: "Không tìm thấy"});
    }
    const saved = db.prepare("SELECT rating FROM student_ratings WHERE student_id = ?").get(id);
    let rating = 1000;
    if(saved === undefined){
        rating = 1000;
    }else{
        rating = saved.rating;
    }
    return res.status(200).json({student_id: id, rating: rating});
}
module.exports = {getAllStudents, createStudent, getStudentById, putStudentById, deleteStudentById, createScores, getScores, createStudyrecord, getStudyrecords, createPredictScore, createElo, getElo};