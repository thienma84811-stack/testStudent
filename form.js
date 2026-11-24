let addStudentForm = document.getElementById("addStudentForm");
let nameInput = document.getElementById("name");
let classInput = document.getElementById("studentClass");
addStudentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let enteredName = nameInput.value.trim();
    let enteredClass = classInput.value.trim();

    addStudentToTable(enteredName, enteredClass);
    addStudentForm.reset();
});