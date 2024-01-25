fetch("/dashboard", {
    method: "post",
    headers: {
      "Content-Type": "application/json" // تم تصحيح هنا
    },
    body: JSON.stringify({
      token: localStorage.getItem("token")
    })
  }).then(async data => {
    user = await data.json();
    document.getElementById("name").innerHTML = user.username;
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("major").innerHTML = user.major;
    document.getElementById("email").innerHTML = user.email;
    document.getElementById("avatar").src = user.avatar || "media/Profilepicture.jpg";
    document.getElementById("icon").src = user.avatar || "media/Profilepicture.jpg";
    console.log(user.languages)
    for(let key in user.languages){
      console.log(user.languages[key],`${key}`)
      document.getElementById(`${user.languages[key]}`).style.filter = "blur(0px)"
    }
    document.getElementById("coding").style.width = `${user.skills["coding"]}%`
    document.getElementById("coding").innerText = `${user.skills["coding"]}%`
    document.getElementById("design").style.width = `${user.skills["design"]}%`
    document.getElementById("design").innerText = `${user.skills["design"]}%`
    document.getElementById("analysis").style.width = `${user.skills["analysis"]}%`
    document.getElementById("analysis").innerText = `${user.skills["analysis"]}%`
    for(let key in user.projects){
      console.log(user.projects[key])
      document.getElementById("projects").innerHTML += `<div class="col-12 col-xl-4 col-lg-3 col-md-6">
      <!-- Certification 6 -->
      <div class="item">
        <img src="${user.projects[key].ImageUrl}" alt="Project Picture">
        <div class="item-content">
          <h3>${user.projects[key].name}</h3>
        </div>
      </div>
    </div>`
    }
    for(let key in user.certificates){
      console.log(user.certificates[key])
      document.getElementById("certificates").innerHTML += `<div class="col-12 col-xl-4 col-lg-3 col-md-6">
      <!-- Certification 6 -->
      <div class="item">
        <img src="${user.certificates[key].ImageUrl}" alt="Project Picture">
        <div class="item-content">
          <h3>${user.certificates[key].name}</h3>
        </div>
      </div>
    </div>`
    }
  });
