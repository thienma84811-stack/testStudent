const Database = require("better-sqlite3");
const path = require("node:path");
const db = new Database(path.join(__dirname, "..", "students.db"));
db.pragma("foreign_keys = ON");
db.exec(`
    CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY,
    name TEXT,
    class TEXT)`);

db.exec(`
    CREATE TABLE IF NOT EXISTS student_score(
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    subject TEXT,
    score REAL,
    FOREIGN KEY (student_id) REFERENCES students(id))`)

db.exec(`
    CREATE TABLE IF NOT EXISTS study_records(
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    hours REAL,
    score REAL,
    FOREIGN KEY (student_id) REFERENCES students(id))`)

db.exec(`
    CREATE TABLE IF NOT EXISTS student_ratings(
    student_id INTEGER PRIMARY KEY,
    rating REAL NOT NULL DEFAULT 1000,
    FOREIGN KEY (student_id) REFERENCES students(id))`)
module.exports = db;