require("dotenv").config();

const express = require("express");

const app = express();

const PORT = 3001;

const path = require("path");

var admin = require("firebase-admin");

var serviceAccount = require("./senior-project-624e4-firebase-adminsdk-3fsj4-9dd65c0637.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://senior-project-624e4-default-rtdb.firebaseio.com"
});
let users = admin.database().ref("users")
const jwt = require('jsonwebtoken');

const secretKey = 'testingapp2024'; // قم بتغييرها إلى مفتاح سري قوي


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "landing.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname+ "/admin.html");
});
app.get("/scripts/:filename", (req, res) => {
  const {filename} = req.params
  res.sendFile(__dirname+`/scripts/${filename}`);
});

// The logout code start

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("sid");
    res.redirect("/");
  });
});

//post requests

// app.post("/login",(req,res)=>{
//   users.get().then(data => {
//     let data2 = data.val();
//     if (!data2) {
//       res.status(500).send("No Users Included");
//       return;
//     }
  
//     const userFound = Object.values(data2).find(user =>
//       (user.email === req.body.email && user.password === req.body.password) ||
//       (user.username === req.body.username && user.password === req.body.password)
//     );
  
//     if (userFound) {
//       res.json(userFound.token);
//     } else {
//       res.status(401).send("Invalid credentials");
//     }
//   });
  
// })


app.post("/login", (req, res) => {
  users.get().then(data => {
      let data2 = data.val();
      if (!data2) {
          res.status(500).send("No Users Included");
          return;
      }

      const userFound = Object.values(data2).find(user =>
          (user.email === req.body.email && user.password === req.body.password) ||
          (user.username === req.body.username && user.password === req.body.password)
      );

      if (userFound) {
          res.json(userFound.token);
      } else {
          res.status(401).json({ error: "Invalid credentials" });
      }
  });
});


app.post("/signup",(req,res)=>{
  // const token = jwt.sign(req.body, secretKey, { expiresIn: '30d' });
  // req.body.token = token
  // //check if user exists
  // users.get().then(data => {
  //   let data2 = data.val();
  //   if (!data2) {
  //     res.status(500).send("No Users Included");
  //     return;
  //   }

  // users.push(req.body).then(data=>{
  //   console.log(data)
  //   // res.send("Ok")
  //   //send res to client

  //   res.send({token:token})
  // })

  // check if user exists

  users.get().then(data => {
    let data2 = data.val();
    if (!data2) {
      res.status(500).send("No Users Included");
      return;
    }

    const userFound = Object.values(data2).find(user =>
      user.email === req.body.email || user.username === req.body.username
    );

    if (userFound) {
      res.status(401).json({ error: "User already exists" });
    } else {
      const token = jwt.sign(req.body, secretKey, { expiresIn: '30d' });
      req.body.token = token
      users.push(req.body).then(data=>{
        console.log(data)
        // res.send("Ok")
        //send res to client

        res.send({token:token})
      })
    }
  });


})
app.post("/project",(req,res)=>{
  users.get().then(data => {
    let data2 = data.val();
    for(let key in data2){
      if(data2[key]?.token === req.body.token){
        console.log(data2[key],req.body)
        admin.database().ref(`users/${key}/projects`).push(req.body)
        res.send("OK")
      }
    }
  });
})
app.post("/certificates",(req,res)=>{
  users.get().then(data => {
    let data2 = data.val();
    for(let key in data2){
      if(data2[key]?.token === req.body.token){
        console.log(data2[key],req.body)
        admin.database().ref(`users/${key}/certificates`).push(req.body)
        res.send("OK")
      }
    }
  });
})
app.post("/personal",(req,res)=>{
  users.get().then(data => {
    let data2 = data.val();
    for(let key in data2){
      if(data2[key]?.token === req.body.token){
        console.log(data2[key],req.body)
        data2[key].username = req.body.name
        data2[key].about = req.body.about
        data2[key].major = req.body.major
        data2[key].email = req.body.email
        admin.database().ref(`users/${key}`).set(data2[key])
        res.send("OK")
      }
    }
  });
})


app.post("/create_group", async (req, res) => {
  try {
    // Check if user is already in a group
    const groupsSnapshot = await admin.database().ref("groups").get();
    const groups = groupsSnapshot.val();

    for (let key in groups) {
      let finder = Object.values(groups[key].members).find(
        (usr) => usr.name == req.body.userInfo.username
      );
      if (finder) {
        console.log("You are already in a group");
        return res.status(401).json({ error: "You are already in a group" });
      }
    }

    // Check if user exists
    const usersSnapshot = await users.get();
    const data2 = usersSnapshot.val();

    if (!data2) {
      console.log("No Users Included");
      return res.status(500).json({ error: "No Users Included" });
    }

    const userInfo = req.body.userInfo;

    if (!userInfo) {
      console.log("User not found or user data incomplete");
      return res.status(401).json({ error: "User not found or user data incomplete" });
    }

    //find the user key in the database
    let userKey = Object.keys(data2).find(
      (key) => data2[key].username == userInfo.username
    );


for(let key in data2){
    // Create a new group
    const newGroup = {
      name: req.body.name,
      maxusers: req.body.maxusers,
      createdAt: new Date(),
      members: [
        {
          name: userInfo.username,
          id: userKey,
          major: userInfo.major,
          skills: [0, 0, 0],
        },
      ],
    };

    // Attempt to create the new group
    const newGroupRef = await admin.database().ref("groups").push(newGroup);

    // Add the group key to the user
    await admin
      .database()
      .ref(`users/${userKey}/groups`)
      .push({ name: req.body.name, key: newGroupRef.key });

    console.log("Group created successfully with key:", newGroupRef.key);

    return res.send("OK");
  } 

}
catch (error) {
  console.error("Error:", error);
  return res.status(500).json({ error: "Internal Server Error", details: error.message });
}


});





app.post("/get_group",(req,res)=>{
  let users_list = []
  let groups_list = []
  users.get().then(async user=>{
    user = await user.val()
    for(let key in user){
      if(user[key].token == req.body.token){
        users_list.push({name:user[key].username,id:key,major:user[key].major,skills:user[key].skills,type:"me"})
      }else{
        users_list.push({name:user[key].username,id:key,major:user[key].major,skills:user[key].skills,type:"other"}) 
      }
    }
  }).then(async data=>{
    admin.database().ref("groups").get(data=>{
    groups_list.push(data.val())
  }).then(async data=>{
    await res.json({users:users_list,groups:data.val()})
  })
  })
  
  
})
app.post("/dashboard",(req,res)=>{
  let realuser
  users.get().then(data => {
    let data2 = data.val();
    if (!data2) {
      res.status(500).send("No Users Included");
      return;
    }
  
    Object.values(data2).map(user =>{
      console.log("+token+",req.body.token,"+user+",user," '''")
      if(user.token === req.body.token)return  realuser = user
    });
  
    if (realuser) {
      res.json(realuser);
      console.log(realuser)
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
})
app.post("/invite", (req, res) => {
  // Check if the group invite is already sent
  admin.database().ref(`users/${req.body.userId}/invites`).get().then(data => {
    data = data.val();
    if (data) {
      for (let key in data) {
        if (data[key].group == req.body.group) {
          res.send("Already Sent");
          return;
        }
      }
    }

    // If the invite is not already sent, proceed to send the invite
    admin.database().ref(`users/${req.body.userId}/invites`).push({ group: req.body.group, inviter: req.body.inviter });
    res.send("invite has been sent successfully"); 
    console.log(req.body);
    console.log("OK");
  });
});

app.post("/asses",(req,res)=>{
  let ulist = []
  users.get().then(async data=>{
    data = await data.val()
    for(let key in data){
      ulist.push({name:data[key].username,id:key})
    }
    res.json(ulist)
  })
})
app.post("/send-data",(req,res)=>{
  admin.database().ref(`users/${req.body.student}/skills`).set({
        coding:req.body.coding,
        analysis:req.body.analysis,
        design:req.body.design
      })
})
app.post("/save_languages",(req,res)=>{
  if(req.body.student == "none")return res.status(500).send("No Student")
  admin.database().ref(`users/${req.body.student}/languages`).set(req.body.languages)
res.send("Done")
})


app.post("/get-user-data",(req,res)=>{
  users.get().then(async data=>{
    data = await data.val()
    for(let key in data){
      if(data[key].token == req.body.token){
        res.json(data[key])
        console.log('info is: ' + data[key])
      }
    }
  })
})
// The logout code end


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
