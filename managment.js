let name = "";
let age = "";
let roll = "";

export let AllStudents = [];

export let ST_data = {
    get St_name() {
        return name;
    },

    get St_age() {
        return age;
    },

    get St_roll() {
        return roll;
    }
};

export let Data = {
    Mandatory: {
        name: document.querySelector("#name"),
        age: document.querySelector("#age"),
        roll: document.querySelector("#roll")
    },

    optional: {
        semester: ""
    },
    container:{
        box: document.querySelector("#students"),
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

export class students {
    constructor(name, roll, age) {
        this.name = name;
        this.roll = roll;
        this.age = age;
    }

    semester(sem) {
        this.sem = sem;
    }
}