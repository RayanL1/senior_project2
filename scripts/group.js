
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
          <td>${member.ratings[0]}</td>
          <td>${member.ratings[0]}</td>
          <td>${member.ratings[0]}</td>
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
            <td>${data.groups[key].members[u].ratings[0]}</td>
            <td>${data.groups[key].members[u].ratings[1]}</td>
            <td>${data.groups[key].members[u].ratings[2]}</td>
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
  inv.addEventListener("click",()=>{
    console.log(inv.getAttribute("href"))
  })
})
    }
})
///////////////////////////////////////////////////

document.getElementById('create-group-button').addEventListener('click', function() {
  const currentUserData = JSON.parse(localStorage.getItem('fulldata'));
  if (currentUserData) {
    const newRow = `<tr class="group-member">
      <td>${currentUserData.name}</td>
      <td>${currentUserData.id}</td>
      <td>${currentUserData.major}</td>
      <td>${currentUserData.ratings ? currentUserData.ratings[0] : '0'}</td>
      <td>${currentUserData.ratings ? currentUserData.ratings[1] : '0'}</td>
      <td>${currentUserData.ratings ? currentUserData.ratings[2] : '0'}</td>
      <td>${currentUserData.phone || 'Not Provided'}</td>  
    </tr>`;

    document.getElementById('my-group').innerHTML += newRow;
  }
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
