const inviteViewButton = document.getElementById('modal-invite-button');
//create a modal for the invite view

inviteViewButton.addEventListener('click', function () {

  console.log('invite view button clicked');
//create a modal for the invite view
//create the elements for the modal
const modal = document.createElement('div');
modal.classList.add('modal');
const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');
const modalHeader = document.createElement('div');
modalHeader.classList.add('modal-header');
const modalTitle = document.createElement('h2');
modalTitle.textContent = 'Invites';
const modalCloseButton = document.createElement('span');
modalCloseButton.classList.add('close');
modalCloseButton.textContent = 'x';
const modalBody = document.createElement('div');
modalBody.classList.add('modal-body');
const modalFooter = document.createElement('div');
modalFooter.classList.add('modal-footer');
const modalAcceptButton = document.createElement('button');
modalAcceptButton.classList.add('accept-button');
modalAcceptButton.textContent = 'Accept';
const modalRejectButton = document.createElement('button');
modalRejectButton.classList.add('reject-button');
modalRejectButton.textContent = 'Reject';

//append the elements to the modal
modalHeader.appendChild(modalTitle);
modalHeader.appendChild(modalCloseButton);
modalFooter.appendChild(modalAcceptButton);
modalFooter.appendChild(modalRejectButton);
modalContent.appendChild(modalHeader);
modalContent.appendChild(modalBody);
modalContent.appendChild(modalFooter);
modal.appendChild(modalContent);
document.body.appendChild(modal);


modal.style.display = 'block';



//add event listeners to the buttons
modalCloseButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

modalAcceptButton.addEventListener('click', function () {
  modal.style.display = 'none';
}
);

modalRejectButton.addEventListener('click', function () {
  modal.style.display = 'none';
}
);



//get the group name of the user





//get the invites from the server

//get the user's id
let userId = fetch('/get-user-data', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('token') })
}).then(data => data.json()).then(data => {
  return data.id;
});

//get the invites from the server using the user's id
let invites = fetch('/get-user-data', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('token') })
}).then(data => data.json()).then(data => {
  return data.invites;
});

let groupname = fetch('/get-user-data', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('token') })
}).then(data => data.json()).then(data => {
  return data.group;
});

//show the the invites in the modal
invites.then(invites => {
  console.log(invites);
  for (let key in invites) {
    console.log(invites[key]);
    modalBody.innerHTML += `<div class="invite">
    <h3>${invites[key].inviter} invited you to join ${invites[key].group}</h3>
    <button class="accept-button" style="background-color: #47ff78; border-radius: 5px;">Accept</button>
    <button class="reject-button" style="background-color: #ff6652; border-radius: 5px;">Reject</button>
  </div>`;
  }
});

});



fetch("/get_group",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:localStorage.getItem("token")})}).then(async data=>{
    data =await data.json()
    console.log(data)
    for(let key in data.groups){
        console.log(data.groups[key])
        let me = localStorage.getItem("fulldata")
        let finder = Object.values(data.groups[key].members).find(usr=> usr.name == JSON.parse(me).username)
         if(finder){
          Object.values(data.groups[key].members).map(member=>{
            console.log(finder,data.groups[key])
          document.getElementById("my-group").innerHTML += `<tr class="group-leader group-member">
          <td>${member.name}</td>
          <td>${member.id}</td>
          <td>${member.major}</td>
          <td>${member.skills[0]}</td>
          <td>${member.skills[1]}</td>
          <td>${member.skills[2]}</td>
          <td>+966599854716</td>
        </tr>`
          })
          
         }
        document.getElementById("groups").innerHTML = `<thead>
        <tr>
          <th>${data.groups[key].name}</th>
          <th>Student Id</th>
          <th>Major</th>
          <th><i class="fa-solid fa-star"></i>Coding</th>
          <th><i class="fa-solid fa-star"></i>Design</th>
          <th><i class="fa-solid fa-star"></i>Analysis</th>
          <td>
            <button class="request-button">Request to join</button>
          </td>
        </tr>
      </thead>
      <tbody id="members-${data.groups[key].name}"></tbody>`
        for(let u in data.groups[key].members){
            console.log(data.groups[key].members)
            document.getElementById(`members-${data.groups[key].name}`).innerHTML += `<tr>
            <td>${data.groups[key].members[u].name}</td>
            <td>${data.groups[key].members[u].id}</td>
            <td>${data.groups[key].members[u].major}</td>
            <td>${data.groups[key].members[u].coding}</td>
            <td>${data.groups[key].members[u].design}</td>
            <td>${data.groups[key].members[u].analysis}</td>
            <td></td>
          </tr>`
        }

    }
    for(let key in data.users){
      console.log(data.users[key],"fdsfs")
      let real =""
          for(let keyy in data.users[key].skills){
            console.log(data.users[key].skills[keyy],"ds")
            real += `<td>${data.users[key].skills[keyy]}</td>\n`
          } 
          document.getElementById("members").innerHTML +=`<tr>
        <td>${data.users[key].name}</td>
        <td>${data.users[key].id}</td>
        <td>${data.users[key].major}</td>
        ${real || `<td>0</td>\n<td>0</td>\n<td>0</td>\n`}
        <td><button class="invite-button" href="${data.users[key].id}">Invite</button></td>
        <td></td>
      </tr>`
      const invite = document.querySelectorAll(".invite-button")
invite.forEach(inv=>{
  inv.addEventListener("click",async ()=>{
    console.log(inv.getAttribute("href"))
    //find the group name


    

    // fetch("/invite",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:localStorage.getItem("token"),userId:inv.getAttribute("href"),group:data.groups[key].name,inviter:JSON.parse(localStorage.getItem("fulldata")).username})}).then(data=>data.json()).then(data=>{
    //   console.log(data)
    // })

    //add an invite to the user

    let groupname = await fetch('/get-user-data', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') })
    }).then(data => data.json()).then(data => {
      const groupKeys = Object.keys(data.groups);
    
      if (groupKeys.length > 0) {
        const firstGroupKey = groupKeys[0];
        const groupInfo = data.groups[firstGroupKey];
        
        // Assuming the group name is stored as "name" property
        const firstGroupName = groupInfo.name;
    
        console.log('name is: ' + firstGroupName);
        return firstGroupName;
      } else {
        console.log('No groups available.');
        return '';
      }
    });
    
    console.log('group name is: ' + groupname)
    await fetch("/invite", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        userId: inv.getAttribute("href"),
        group: groupname,
        inviter: JSON.parse(localStorage.getItem("fulldata")).username
      })
    }).then(data => data.text()).then(data => {
      console.log(data);
      alert(data);

    }).catch(error => {
      console.error("Error sending invite:", error);
      // Handle the error as needed
      alert('Failed to send invite');
    });
  })
})
    }
    
})
///////////////////////////////////////////////////

document.getElementById('create-group-button').addEventListener('click', async function () {
  // Check if the user is already in a group
  const username = JSON.parse(localStorage.getItem('fulldata')).username;
  console.log(username);

  let isInGroup = false;

  const groupData = await fetch('/get_group', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') })
  }).then(async data => {
    data = await data.json();
    console.log(data);
    for (let key in data.groups) {
      console.log(data.groups[key]);
      let finder = Object.values(data.groups[key].members).find(usr => usr.name == username);
      if (finder) {
        alert('You are already in a group');
        isInGroup = true;
        break; // exit the loop early
      } else {
        console.log('not in a group');
      }
    }
  });

  if (isInGroup) {
    return; // exit the function early
  }

  // Rest of your code for creating a group
  const currentUserData = await fetch("/get-user-data", { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: localStorage.getItem("token") }) }).then(data => data.json());

  // get groups from server.js
  const groups = await fetch("/get_group", { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: localStorage.getItem("token") }) }).then(data => data.json());
  console.log(groups);

  // the name of the group is like group1 , group2 , group3
  await fetch("/create_group", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
      name: `group${Object.keys(groups.groups).length + 1}`,
      maxusers: 12,
      userInfo: currentUserData
    })
  }).catch(error => {
    console.error("Error creating group:", error);
    // Handle the error as needed
    alert('Failed to create group');
  });

  console.log(currentUserData);
  console.log('group created');
  alert('Group created successfully');
  // reload the page
  location.reload();
  // user id is the email of the user without the @ and the domain
});







document.addEventListener('DOMContentLoaded', function () {
  const membersBody = document.getElementById('members');
  const codingButton = document.getElementById('coding');
  const designButton = document.getElementById('design');
  const analysisButton = document.getElementById('analysis');
  const searchBox = document.querySelector('input[placeholder="Search"]');

  function sortRowsByColumn(columnIndex) {
    // Convert the collection of rows to an array for sorting
    let rowsArray = Array.from(membersBody.rows);
  
    // Sort the array of rows based on the column index provided
    rowsArray.sort(function (rowA, rowB) {
      // Parse the text content of the specified cell as an integer for row A and B
      const gradeOfRowA = parseInt(rowA.cells[columnIndex].textContent, 10);
      const gradeOfRowB = parseInt(rowB.cells[columnIndex].textContent, 10);
  
      // If the grade of row A is less than the grade of row B, row B should come first
      if (gradeOfRowA < gradeOfRowB) {
        return 1;
      }
      // If the grade of row A is greater than the grade of row B, row A should come first
      if (gradeOfRowA > gradeOfRowB) {
        return -1;
      }
      // If the grades are equal, do not change the order
      return 0;
    });
  
    // Clear the current rows from the table body
    membersBody.innerHTML = '';
    
    // Append the sorted rows back to the table body
    rowsArray.forEach(function(row) {
      membersBody.appendChild(row);
    });
  }
  
  function filterRowsByName() {
    const searchTerm = searchBox.value.toLowerCase();
    let rowsArray = Array.from(membersBody.rows);
    let filteredRows = rowsArray.filter(row => row.cells[0].textContent.toLowerCase().includes(searchTerm));
    membersBody.innerHTML = ''; // Clear existing rows
    filteredRows.forEach(row => membersBody.appendChild(row)); // Append filtered rows
    rowsArray.filter(row => !filteredRows.includes(row)).forEach(row => membersBody.appendChild(row)); // Append non-filtered rows
  }

  codingButton.addEventListener('click', function () { sortRowsByColumn(3); });
  designButton.addEventListener('click', function () { sortRowsByColumn(4); });
  analysisButton.addEventListener('click', function () { sortRowsByColumn(5); });
  searchBox.addEventListener('keyup', filterRowsByName);
});
