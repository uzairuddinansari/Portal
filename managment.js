let name = "";
let age = "";
let roll = "";
let sign = "";

export let AllStudents = JSON.parse(
    localStorage.getItem("student")
) || [];

export let ST_data = {
    get St_name() {
        return name;
    },

    get St_age() {
        return age;
    },

    get St_roll() {
        return roll;
    },

    get St_sign() {
        return sign;
    }
};

export let Data = {
    Mandatory: {
        name: document.querySelector("#name"),
        age: document.querySelector("#age"),
        roll: document.querySelector("#roll"),
        sign: document.querySelector("#sign")
    },

    optional: {
        semester: ""
    },

    container: {
        box: document.querySelector("#students")
    }
};

if (Data.Mandatory.name) {
    Data.Mandatory.name.addEventListener("input", (e) => {
        name = e.target.value;
    });
}

if (Data.Mandatory.age) {
    Data.Mandatory.age.addEventListener("input", (e) => {
        age = e.target.value;
    });
}

if (Data.Mandatory.roll) {
    Data.Mandatory.roll.addEventListener("input", (e) => {
        roll = e.target.value;
    });
}

if (Data.Mandatory.sign) {
    Data.Mandatory.sign.addEventListener("input", (e) => {
        sign = e.target.value;
    });
}

export class students {
    constructor(name, roll, age, sign) {
        this.name = name;
        this.roll = roll;
        this.age = age;
        this.sign = sign;
    }

    semester(sem) {
        this.sem = sem;
    }
}

export let LOGIN = {
    Mandatory: {
        ST_name: document.querySelector("#Admitname"),
        ST_password: document.querySelector("#password")
    },

    container: {
        form: document.querySelector("#admitForm")
    }
};

export let ATTENDANCE = {
    student: {
        name: document.querySelector("#studentName"),
        roll: document.querySelector("#studentRoll")
    },

    container: {
        form: document.querySelector("#attendanceForm"),
        password: document.querySelector("#password"),
        passBtn: document.querySelector("#passBtn"),
        absentBtn: document.querySelector("#absent"),
        month: document.querySelector("#month"),
        days: document.querySelector("#days"),
        previous: document.querySelector("#previousMonth"),
        next: document.querySelector("#nextMonth")
    }
};