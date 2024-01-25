fetch("/dashboard",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
    token:localStorage.getItem("token")
})}).then(async data=>{
    let user = await data.json()
    localStorage.setItem("fulldata",JSON.stringify(user))
    document.getElementById("name").innerText = user.username
    document.getElementById("avatar").src = user.avatar || "media/Profilepicture.jpg"
})