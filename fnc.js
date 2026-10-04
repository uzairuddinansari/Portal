import {Data, students, ST_data ,AllStudents} from "./managment.js";

let form_data = function () {
    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault();

        if (
            ST_data.St_name === "" ||
            ST_data.St_age === "" ||
            ST_data.St_roll === ""
        ) {
            console.log("Please fill all fields");
            return;
        }

        console.log("Form submitted");
        

        const stu_data = new students(
            ST_data.St_name,
            ST_data.St_roll,
            ST_data.St_age
        );

        AllStudents.push(stu_data);

        localStorage.setItem("student",JSON.stringify(AllStudents))

        rendarAll()
         
    });

};


function rendarAll(){
             AllStudents.map((student) => {
        Data.container.box.innerHTML += `
        <div class="card">
            <h2>${student.name}</h2>
            <p>Age: ${student.age}</p>
            <p>Roll: ${student.roll}</p>
            <button onclick="deleteStudent(${student.roll})">
                Delete
            </button>
        </div>
    `;
});
}

let deleteStudent = function (id) {
    let newData = AllStudents.filter((student) => student.roll != id);

    AllStudents.length = 0
    AllStudents.push(...newData)

    localStorage.setItem("student",JSON.stringify(AllStudents))
    rendarAll()

    console.log("delet howa");
    
};


window.deleteStudent = deleteStudent
rendarAll()
form_data();