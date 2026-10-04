import { ATTENDANCE } from "./managment.js";

let selectedStudent = JSON.parse(
    localStorage.getItem("selectedStudent")
);

if (!selectedStudent) {
    window.location.href = "Student.html";
}

ATTENDANCE.student.name.textContent = selectedStudent.name;
ATTENDANCE.student.roll.textContent = selectedStudent.roll;

let currentDate = new Date();

let attendanceData = JSON.parse(
    localStorage.getItem(
        `attendance_${selectedStudent.roll}`
    )
) || {};

function saveAttendance() {
    localStorage.setItem(
        `attendance_${selectedStudent.roll}`,
        JSON.stringify(attendanceData)
    );
}

function renderCalendar() {

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    ATTENDANCE.container.month.textContent =
        currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

    ATTENDANCE.container.days.innerHTML = "";

    let firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    let totalDays = new Date(
        year,
        month + 1,
        0
    ).getDate();

    for (let i = 0; i < firstDay; i++) {

        let emptyDay = document.createElement("div");

        emptyDay.classList.add("day", "empty");

        ATTENDANCE.container.days.appendChild(
            emptyDay
        );
    }

    for (let day = 1; day <= totalDays; day++) {
        let dayBox = document.createElement("div");
        dayBox.classList.add("day");
        let dateKey =`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        let today = new Date();
        let isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        if (isToday) {
            dayBox.classList.add("today");
        }

        if (attendanceData[dateKey]) {
            dayBox.classList.add("present");
        }

        dayBox.innerHTML = `
            <span class="date">${day}</span>
            <span class="status">
                ${
                    attendanceData[dateKey]
                        ? "✓ Present"
                        : ""
                }
            </span>
        `;

        ATTENDANCE.container.days.appendChild(
            dayBox
        );
    }
}

ATTENDANCE.container.absentBtn.addEventListener("click", () => {

    let today = new Date();

    let dateKey =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (attendanceData[dateKey]) {
        alert("Today's attendance is already marked");
        return;
    }

    attendanceData[dateKey] = "absent";

    saveAttendance();

    renderCalendar();

    alert("Absent marked");
});

ATTENDANCE.container.form.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        let password =
            ATTENDANCE.container.password.value.trim();

        if (password === "") {
            alert("Please enter your sign");
            return;
        }

        if (password !== selectedStudent.sign) {
            alert("Wrong sign");
            return;
        }

        let today = new Date();

        let dateKey =
            `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (attendanceData[dateKey]) {
            alert("Today's attendance is already marked");
            return;
        }

        attendanceData[dateKey] = true;

        saveAttendance();

        ATTENDANCE.container.password.value = "";

        currentDate = new Date();

        renderCalendar();

        alert("Attendance marked successfully");
    }
);

ATTENDANCE.container.previous.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();
    }
);

ATTENDANCE.container.next.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        renderCalendar();
    }
);

renderCalendar();