const signup = document.getElementById("signup")

const signupForm = document.getElementById("signup-form")


//  signupForm.addEventListener("submit",(e)=>{
//     e.preventDefault()

//     const email =  document.getElementById("email")
//     const username =  document.getElementById("username")
//     const Class  =  document.getElementById("class")
//     const password  =  document.getElementById("password")
//     const repassword  =  document.getElementById("repassword")
//     const major  =  document.getElementById("major")


//     fetch("/signup",{method:"post",body:JSON.stringify({
//         username:username.value,
//         email:email.value,
//         repassowrd:repassword.value,
//         password:password.value,
//         major:major.value,
//         class:Class.value
//     }),headers:{
//         "Content-Type":"application/json"
//     }}).then(res=>res.json()).then(data=>{
//         if(data.error){
//             alert(data.error)
//         }else{
//             alert("Signup Success")
//             window.location.href = "/login"
//         }
//     }).catch(err=>{
//         console.log(err)
//         alert("Signup Failed")
//     }
//     )

// })

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const userClass = document.getElementById("class");
    const password = document.getElementById("password");
    const repassword = document.getElementById("repassword");
    const major = document.getElementById("major");

    fetch("/signup", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            repassword: repassword.value,
            password: password.value,
            major: major.value,
            class: userClass.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        if (data.error) {
            alert(data.error);
        } else {
            alert("Signup Success");
            window.location.href = "/login";
        }
    })
    .catch((err) => {
        console.error("Error:", err);
        alert("Signup Failed");
    });
});