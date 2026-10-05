import { LOGIN } from "./managment.js";

function showPopup(message) {
    let existingPopup = document.querySelector(".custom-popup");
    if (existingPopup) {
        existingPopup.remove();
    }

    let popup = document.createElement("div");
    popup.className = "custom-popup";
    popup.innerHTML = `
        <div class="popup-box">
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 10);

    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 2500);
}

function showError(inputElement, message) {
    clearError(inputElement);
    let error = document.createElement("h4");
    error.className = "input-error";
    error.textContent = message;
    inputElement.after(error);
}

function clearError(inputElement) {
    let nextElement = inputElement.nextElementSibling;
    if (nextElement && nextElement.classList.contains("input-error")) {
        nextElement.remove();
    }
}

let nameInput = LOGIN.Mandatory.ST_name;
let passwordInput = LOGIN.Mandatory.ST_password;

if (nameInput) {
    nameInput.addEventListener("input", () => clearError(nameInput));
}

if (passwordInput) {
    passwordInput.addEventListener("input", () => clearError(passwordInput));
}

LOGIN.container.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = nameInput.value.trim();
    let password = passwordInput.value.trim();

    let hasError = false;

    if (name === "") {
        showError(nameInput, "Please enter your username");
        hasError = true;
    }

    if (password === "") {
        showError(passwordInput, "Please enter your password");
        hasError = true;
    }

    if (hasError) {
        return;
    }

    let response = await fetch("./credantials.json");
    let credentials = await response.json();

    if (
        name === credentials.name &&
        password === credentials.password
    ) {
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "Student.html";
    } else {
        showPopup("Wrong username or password");
    }
});