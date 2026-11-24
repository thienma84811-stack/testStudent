let registerTab = document.getElementById("registerTab");
let registerModal = document.getElementById("registerModal");
let closeRegister = document.getElementById("closeRegister");
let toggleLoginPassword = document.getElementById("toggleLoginPassword");
let togglePasswordAgain = document.getElementById("togglePasswordAgain");
let loginPassword = document.getElementById("password");
let confirmPassword = document.getElementById("passwordAgain");
let registerForm = document.getElementById("registerForm");
let registerMessage = document.getElementById("registerMessage");
let registrationPassword = document.getElementById("registrationPassword");
let passwordAgain = document.getElementById("passwordAgain");
registerTab.addEventListener("click", function() {
    registerModal.hidden = false;
});
closeRegister.addEventListener("click", function() {
    registerModal.hidden = true;
});
toggleLoginPassword.addEventListener("click", function() {
    if(loginPassword.type === "password"){
        loginPassword.type = "text";
        toggleLoginPassword.textContent = "Ẩn";
    }else{
        loginPassword.type = "password";
        toggleLoginPassword.textContent = "Hiện";
    }
});
togglePasswordAgain.addEventListener("click", function() {
    if(confirmPassword.type === "password"){
        confirmPassword.type = "text";
        togglePasswordAgain.textContent = "Ẩn";
    }else{
        confirmPassword.type = "password";
        togglePasswordAgain.textContent = "Hiện";
    }
});
registerForm.addEventListener("submit", function(event){
    event.preventDefault();
    let password = registrationPassword.value;
    let againPassword = passwordAgain.value;
    if(password !== againPassword){
        registerMessage.textContent = "Mật khẩu nhập lại không đúng";
        registerMessage.classList.add("error");
        registerMessage.classList.remove("success");
    }else{
        registerMessage.textContent = "Hai mật khẩu đúng";
        registerMessage.classList.remove("error");
        registerMessage.classList.add("success");
    }
});
registerForm.addEventListener("input", function() {
    registerMessage.classList.remove("error");
    registerMessage.classList.remove("success");
    registerMessage.textContent = "";
});
registerModal.addEventListener("click", function(event) {
    if(event.target === registerModal){
        registerModal.hidden = true;
    }
});
document.addEventListener("keydown", function(event) {
    if(event.key === "Escape" && !registerModal.hidden){
        registerModal.hidden = true;
    }
});