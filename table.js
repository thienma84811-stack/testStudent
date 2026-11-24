function addStudentToTable(name, studentClass){
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let classCell = document.createElement("td");

    nameCell.textContent = name;
    classCell.textContent = studentClass;

    row.appendChild(nameCell);
    row.appendChild(classCell);

    let studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.appendChild(row);

    document.getElementById("studentCount").textContent = studentTableBody.rows.length;

    let select = document.getElementById("student");
    let option = document.createElement("option");

    option.value = name;
    option.textContent = name;
    select.appendChild(option);
}