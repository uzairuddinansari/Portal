import { LOGIN } from "./managment.js";

LOGIN.container.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = LOGIN.Mandatory.ST_name.value.trim();
    let password = LOGIN.Mandatory.ST_password.value.trim();

    if (name === "" || password === "") {
        alert("Please fill all fields");
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
        alert("Wrong username or password");
    }
});