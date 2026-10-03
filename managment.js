export let Data = {
    Mandatory:{
    name: document.querySelector("#name"),
    age:  document.querySelector("#age"),
    roll: document.querySelector("#roll"),
   },
   optional:{
     semester:""
   }
}

let name = "" 

Data.Mandatory.name.addEventListener("input",(e)=>{
     name = e.target.value
})


export class students {
    // mandotary
    constructor(name , roll , age){
        this.name =  name  
        this.roll = roll 
        this.age  = age
    }
    //  Optional
    semester(sem){
        this.sem = sem
    }
}


console.log("hello world");
