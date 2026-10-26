let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // format UVT
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{0,2}@e-uvt\.ro$/;
    
    // min 7 caractere, litere mari, litere mici, cifre si caracter special
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if (!emailRegex.test(email)) {
        alert("Email invalid! Folosește formatul UVT (ex: prenume.nume@e-uvt.ro sau prenume.nume01@e-uvt.ro).");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Parolă invalidă! Trebuie să conțină cel puțin 7 caractere, inclusiv litere mari, mici, cifre și un caracter special.");
        return;
    }

    window.location.href = "home.html"; 
});