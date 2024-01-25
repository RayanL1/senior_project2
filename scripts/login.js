// const login = document.getElementById("login")
// const loginForm = document.getElementById("login-form")

// loginForm.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     const password = document.getElementById("password")
//     const email = document.getElementById("email")
//     fetch("login",{method:"post",headers:{
//         "Content-Type":"application/json"
//     },
// body:JSON.stringify({
//     password:password.value,
//     email:email.value
// })}).then(async data=>{
//     let data2 = await data.json()
//     // if(data.status !== 200){
//     //     alert("Check The Email & Password")
//     // }else{
//     //     localStorage.setItem("token",data2)
//     //     location.href="/dashboard.html"
//     // }

//     // res.status(401).send("Invalid credentials"); this is a code from server.js
//     if(data.status === 401){
//         alert("Invalid credentials")
//         console.log(data)
//     }
//     else{
//         localStorage.setItem("token",data2)
//         location.href="/dashboard.html"
//     }

// })
// })
//     }).then((res) => res.json())




// login.onclick=()=>{
//     const password = document.getElementById("password")
//     const email = document.getElementById("email")
//     fetch("login",{method:"post",headers:{
//         "Content-Type":"application/json"
//     },
// body:JSON.stringify({
//     password:password.value,
//     email:email.value
// })}).then(async data=>{
//     let data2 = await data.json()
//     if(data.status !== 200){
//         alert("Check The Email & Password")
//     }else{
//         localStorage.setItem("token",data2)
//         location.href="/dashboard.html"
//     }
// })
// } 



const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const password = document.getElementById("password")
    const email = document.getElementById("email")

    fetch("login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password.value,
            email: email.value
        })
    })
    .then(async (data) => {
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }

        try {
            const data2 = await data.json();
            localStorage.setItem("token", data2);
            location.href = "/dashboard.html";
        } catch (jsonError) {
            // If parsing JSON fails, it means the response is not in JSON format
            console.log("Parsing JSON failed:", jsonError);

            // Handle plain text error message
            if (data.status === 401) {
                const errorText = await data.text();
                alert(errorText);
                console.log(errorText);
                console.log(data);
            }
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Login Failed");
    });
});
