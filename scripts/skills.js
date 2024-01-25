const students = document.getElementById("students")
fetch("/asses",{method:"post",body:JSON.stringify({token:localStorage.getItem("token")})})
.then(async data =>{
    data = await data.json()
    data.map(usr=>{
        students.innerHTML += `<option value="${usr.id}">${usr.name}</option>`
    })
})
const skills = document.querySelectorAll(".item")
skills.forEach(skill =>{
    console.log(skill)
    skill.addEventListener("click",()=>{
        console.log(skill.style.backgroundColor)
        if(skill.id == "save"){
            let languages = []
            skills.forEach(skil =>{
                if(skil.style.backgroundColor == "rgb(105, 177, 244)"){
                    languages.push(skil.id)
                }
            })
            fetch("/save_languages",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({student:students.value,languages:languages})})
        }else{
            if(skill.style.backgroundColor == "rgb(105, 177, 244)"){
                skill.style.backgroundColor ="#e0e0e0"
            }else{
                skill.style.backgroundColor = "#69b1f4"
                skill.style.backgroundColor = "#69b1f4"

            }
        }
        
    })
})