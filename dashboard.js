let scoreForm = document.getElementById("scoreForm");
let student = document.getElementById("student");
let subject = document.getElementById("subject");
let score = document.getElementById("score");
let scoreTableBody = document.getElementById("scoreTableBody");
scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let selectedStudent = student.value;
    let selectedSubject = subject.value;
    let scoreValue = Number(score.value);

    let row = document.createElement("tr");
    let studentCell = document.createElement("td");
    let subjectCell = document.createElement("td");
    let scoreCell = document.createElement("td");

    studentCell.textContent = selectedStudent;
    subjectCell.textContent = selectedSubject;
    scoreCell.textContent = scoreValue;

    row.appendChild(studentCell);
    row.appendChild(subjectCell);
    row.appendChild(scoreCell);
    scoreTableBody.appendChild(row);

    let total = 0;
    for(let i = 0; i<scoreTableBody.rows.length; i++){
        total += Number(scoreTableBody.rows[i].cells[2].textContent);
    }
    let average = total/scoreTableBody.rows.length;
    document.getElementById("averageScore").textContent = average.toFixed(1);

    document.getElementById("scoreCount").textContent = scoreTableBody.rows.length;
    scoreForm.reset();
});