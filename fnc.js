import {Data,students,ST_data,AllStudents} from "./managment.js";

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

window.clearError = clearError;

if (Data.Mandatory.name) {
    Data.Mandatory.name.addEventListener("input", () => clearError(Data.Mandatory.name));
}

if (Data.Mandatory.age) {
    Data.Mandatory.age.addEventListener("input", () => clearError(Data.Mandatory.age));
}

if (Data.Mandatory.roll) {
    Data.Mandatory.roll.addEventListener("input", () => clearError(Data.Mandatory.roll));
}

if (Data.Mandatory.sign) {
    Data.Mandatory.sign.addEventListener("input", () => clearError(Data.Mandatory.sign));
}

let form_data = function () {
    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault();

        let hasError = false;

        if (ST_data.St_name.trim() === "") {
            showError(Data.Mandatory.name, "Please enter student name");
            hasError = true;
        }

        if (ST_data.St_age.trim() === "") {
            showError(Data.Mandatory.age, "Please enter student age");
            hasError = true;
        }

        if (ST_data.St_roll.trim() === "") {
            showError(Data.Mandatory.roll, "Please enter roll number");
            hasError = true;
        }

        if (ST_data.St_sign.trim() === "") {
            showError(Data.Mandatory.sign, "Please enter student sign");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        let rollExists = AllStudents.some(
            (student) => String(student.roll).trim() === String(ST_data.St_roll).trim()
        );

        if (rollExists) {
            showPopup("Roll number already exists");
            return;
        }

        let signExists = AllStudents.some(
            (student) =>
                String(student.sign).trim().toLowerCase() ===
                String(ST_data.St_sign).trim().toLowerCase()
        );

        if (signExists) {
            showPopup("Sign already exists");
            return;
        }

        const stu_data = new students(
            ST_data.St_name,
            ST_data.St_roll,
            ST_data.St_age,
            ST_data.St_sign
        );

        AllStudents.push(stu_data);

        localStorage.setItem(
            "student",
            JSON.stringify(AllStudents)
        );

        rendarAll();
    });
};

function rendarAll() {
    Data.container.box.innerHTML = "";

    AllStudents.map((student) => {
        Data.container.box.innerHTML += `
            <div class="card">
                <h2>${student.name}</h2>
                <p>Age: ${student.age}</p>
                <p>Roll: ${student.roll}</p>
                <p>Sign: ${student.sign}</p>

                <button onclick="deleteStudent(${student.roll})">
                    Delete
                </button>

                <button onclick="updateStudent(${student.roll})">
                    Update
                </button>

                <a href="Attendance.html">
                    <button onclick="attendance(${student.roll})">
                        Check Attendance
                    </button>
                </a>
            </div>
        `;
    });
}

let deleteStudent = function (id) {
    let newData = AllStudents.filter(
        (student) => student.roll != id
    );

    AllStudents.length = 0;
    AllStudents.push(...newData);

    localStorage.setItem(
        "student",
        JSON.stringify(AllStudents)
    );

    rendarAll();

    console.log("delete howa");
};

function updateStudent(id) {
    let student = AllStudents.find(
        (student) => student.roll == id
    );

    if (!student) return;

    event.target.parentElement.innerHTML += `
        <form onsubmit="saveUpdate(event, ${student.roll})" novalidate>
            <input
                type="text"
                id="name-${student.roll}"
                value="${student.name}"
                placeholder="Name"
                oninput="clearError(this)"
            >

            <input
                type="number"
                id="age-${student.roll}"
                value="${student.age}"
                placeholder="Age"
                oninput="clearError(this)"
            >

            <input
                type="text"
                id="sign-${student.roll}"
                value="${student.sign}"
                placeholder="Sign"
                oninput="clearError(this)"
            >

            <button type="submit">
                Save
            </button>
        </form>
    `;
}

function saveUpdate(e, id) {
    e.preventDefault();

    let student = AllStudents.find(
        (student) => student.roll == id
    );

    let nameInput = document.querySelector(`#name-${id}`);
    let ageInput = document.querySelector(`#age-${id}`);
    let signInput = document.querySelector(`#sign-${id}`);

    let newName = nameInput.value.trim();
    let newAge = ageInput.value.trim();
    let newSign = signInput.value.trim();

    let hasError = false;

    if (newName === "") {
        showError(nameInput, "Please enter student name");
        hasError = true;
    }

    if (newAge === "") {
        showError(ageInput, "Please enter student age");
        hasError = true;
    }

    if (newSign === "") {
        showError(signInput, "Please enter student sign");
        hasError = true;
    }

    if (hasError) return;

    student.name = newName;
    student.age = newAge;
    student.sign = newSign;

    localStorage.setItem(
        "student",
        JSON.stringify(AllStudents)
    );

    let selectedStudent = JSON.parse(
        localStorage.getItem("selectedStudent")
    );

    if (selectedStudent && selectedStudent.roll == id) {
        localStorage.setItem(
            "selectedStudent",
            JSON.stringify(student)
        );
    }

    rendarAll();
}

function attendance(id) {
    let student = AllStudents.find(
        (student) => student.roll == id
    );

    if (!student) return;

    localStorage.setItem(
        "selectedStudent",
        JSON.stringify(student)
    );
}

window.attendance = attendance;
window.updateStudent = updateStudent;
window.saveUpdate = saveUpdate;
window.deleteStudent = deleteStudent;

rendarAll();
form_data();