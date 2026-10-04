import {Data,students,ST_data,AllStudents} from "./managment.js";

let form_data = function () {
    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault();

        if (
            ST_data.St_name === "" ||
            ST_data.St_age === "" ||
            ST_data.St_roll === "" ||
            ST_data.St_sign === ""
        ) {
            console.log("Please fill all fields");
            return;
        }

        let rollExists = AllStudents.some(
            (student) => String(student.roll).trim() === String(ST_data.St_roll).trim()
        );

        if (rollExists) {
            alert("Roll number already exists");
            return;
        }

        let signExists = AllStudents.some(
            (student) =>
                String(student.sign).trim().toLowerCase() ===
                String(ST_data.St_sign).trim().toLowerCase()
        );

        if (signExists) {
           alert("Sign already exists");
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
        <form onsubmit="saveUpdate(event, ${student.roll})">
            <input
                type="text"
                id="name-${student.roll}"
                value="${student.name}"
            >

            <input
                type="number"
                id="age-${student.roll}"
                value="${student.age}"
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

    let newName = document.querySelector(
        `#name-${id}`
    ).value;

    let newAge = document.querySelector(
        `#age-${id}`
    ).value;

    student.name = newName;
    student.age = newAge;

    localStorage.setItem(
        "student",
        JSON.stringify(AllStudents)
    );

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