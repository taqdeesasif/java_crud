var usersArray = [];
let isEdit = false
let editIndex = null
const api_url =
      "https://jsonplaceholder.typicode.com/posts";
// --------------- FETCH RECORD ---------------------------------------
let getapi = async (url) =>{
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    usersArray = await response.json();
    
     if (response) { 
        hideloader();
    }
    renderHtml();       
}
getapi(api_url);

// ----------------HIDE LOADER ---------------------------------------

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
//---------------- RENDER TABLE ----------------------------------------
let renderHtml = () => {
     let tbl =  document.getElementById('tb-id');
       tbl.innerHTML = '';
    let html = '';
    usersArray.map((item, key) => (
        html+=`
        <tr>
            <td>${item.userId}</td>
            <td>${item.title}</td>
            <td>${item.body}</td>
            <td> <button type="button" onclick="editRecord(${key})"> Edit </button> </td>
            <td> <button type="button" onclick="deleteRecord(${key})"> Delete </button> </td>
        </tr>`
    
    ))
    tbl.innerHTML = html
}




//------------------------------POST FORM -------------------------------------------------

let postForm= async (id, title, body) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: title,
    body: body,
    userId: id,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
    
    cons res = await response.json();
    
   if(res){
      usersArray.push(res)
        renderHtml();
   }
    console.log(usersArray);
}

// ------------------- SUBMIT FORM ------------------------------------------------

let submitForm = () => {
     const formData = readForm();
            postForm(formData["userId"], formData["title"], formData["body"]);
            clearRecord();
       
    
  }


// -----------------------------------READ FORM DATA --------------------------------

let readForm = () =>{
    let formData = {};
    formData["userId"] = document.getElementById('userId').value;
    formData["title"] = document.getElementById('title').value;
    formData["body"] = document.getElementById('body').value;
  
    return formData;
}

// ----------------------------------EDIT RECORD -----------------------------------

let editRecord = (key) => {
    isEdit = true
   const data = usersArray[key]
     document.getElementById('userId').value = data.userId;
     document.getElementById('title').value = data.title;
     document.getElementById('body').value = data.body;
      document.getElementById('s-id').innerHTML = 'Update Record'
    document.getElementById('s-id').setAttribute('onclick',`updateRecord(${key})`);
}

// --------------------------------- UPDATE RECORD ------------------------------------

let updateRecord = async (key) => {
    const title = document.getElementById('title').value;
    const userId = document.getElementById('userId').value;
    const body = document.getElementById('body').value;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${key}`, {
  method: 'PATCH',
  body: JSON.stringify({
    title: title,
    body: body,
    userId:userId ,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
    
    const res = await response.json()
    usersArray[key].title = res.title;
    usersArray[key].body = res.body;
    usersArray[key].userId = res.userId;
      renderHtml();
      clearRecord();
    
    document.getElementById('s-id').innerHTML = 'Submit Record'
    document.getElementById('s-id').setAttribute('onclick','submitForm()');
    
}


// -----------------------------DELETE RECORD ------------------------------

let deleteRecord = async (key) => {

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${key}`, {
  method: 'DELETE',
});

    usersArray.splice(key,1);
    
    renderHtml()   
}

// --------------------------------CLEAR RECORD ------------------------------------

let clearRecord = () =>{
    document.getElementById('userId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
}
