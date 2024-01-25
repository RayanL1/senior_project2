const students = document.getElementById("students")
const send = document.getElementById("send-data")
fetch("/asses",{method:"post",body:JSON.stringify({token:localStorage.getItem("token")})})
.then(async data =>{
    data = await data.json()
    data.map(usr=>{
        students.innerHTML += `<option value="${usr.id}">${usr.name}</option>`
    })
})
send.onclick = ()=>{
    if(students.value == "none")return alert("Choice Student Please")
    fetch("/send-data",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        coding:document.getElementById("coding").value,
        analysis:document.getElementById("analysis").value,
        design:document.getElementById("design").value,
        student:students.value
    })})
}