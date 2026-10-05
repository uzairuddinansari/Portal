import { ATTENDANCE } from "./managment.js";

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

let selectedStudent = JSON.parse(
    localStorage.getItem("selectedStudent")
);

if (!selectedStudent) {
    window.location.href = "Student.html";
}

ATTENDANCE.student.name.textContent = selectedStudent.name;
ATTENDANCE.student.roll.textContent = selectedStudent.roll;

if (ATTENDANCE.container.password) {
    ATTENDANCE.container.password.addEventListener("input", () => {
        clearError(ATTENDANCE.container.password);
    });
}

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

        if (attendanceData[dateKey] === "absent") {
            dayBox.classList.add("absent");
        } else if (attendanceData[dateKey]) {
            dayBox.classList.add("present");
        }

        dayBox.innerHTML = `
            <span class="date">${day}</span>
            <span class="status">
                ${
                    attendanceData[dateKey] === "absent"
                        ? "✗ Absent"
                        : attendanceData[dateKey]
                        ? "✓ Present"
                        : ""
                }
            </span>
        `;

        ATTENDANCE.container.days.appendChild(
            dayBox
        );
    }

    if (window.gsap) {
        gsap.fromTo(ATTENDANCE.container.days.children, 
            { opacity: 0, scale: 0.96 }, 
            { opacity: 1, scale: 1, duration: 0.25, stagger: 0.008, ease: "power1.out" }
        );
    }
}

ATTENDANCE.container.absentBtn.addEventListener("click", (e) => {
    if (e && e.preventDefault) e.preventDefault();

    let today = new Date();

    let dateKey =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (attendanceData[dateKey]) {
        showPopup("Today's attendance is already marked");
        return;
    }

    attendanceData[dateKey] = "absent";

    saveAttendance();

    renderCalendar();

    showPopup("Absent marked");
});

ATTENDANCE.container.form.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        let passwordInput = ATTENDANCE.container.password;
        let password = passwordInput.value.trim();

        if (password === "") {
            showError(passwordInput, "Please enter student sign");
            return;
        }

        if (password !== selectedStudent.sign) {
            showPopup("Wrong sign");
            return;
        }

        let today = new Date();

        let dateKey =
            `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (attendanceData[dateKey]) {
            showPopup("Today's attendance is already marked");
            return;
        }

        attendanceData[dateKey] = true;

        saveAttendance();

        passwordInput.value = "";

        currentDate = new Date();

        renderCalendar();

        showPopup("Attendance marked successfully");
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