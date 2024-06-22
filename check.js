
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



if(getapi(api_url))
    {
        renderHtml();
    }
else
    {
        console.log('error');
    }





//------------------------------SUBMIT FORM -------------------------------------------------

let submitForm = () => {
     const formData = readForm();
    let validate = true;
    
   if(validate == 'true')
       {
           createRecord(formData["userId"], formData["title"], formData["body"]);
           clearRecord();
       }
    
  }

// --------------------------------CLEAR RECORD ------------------------------------

let clearRecord = () =>{
    document.getElementById('userId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
}


// ----------------------------------EDIT RECORD -----------------------------------

let editRecord = (bt) => {
    isEdit = true
    editIndex = bt
   const data = usersArray[bt]
     document.getElementById('userId').value = data.name;
     document.getElementById('title').value = data.email;
     document.getElementById('body').value = data.address;
      document.getElementById('s-id').innerHTML = 'Update Record'
    document.getElementById('s-id').setAttribute('onclick','updateRecord()');
}

// --------------------------------- UPDATE RECORD ------------------------------------

let updateRecord = (bt) => {
      
      usersArray[editIndex].userId = document.getElementById('userId').value
      usersArray[editIndex].title =  document.getElementById('title').value
      usersArray[editIndex].body =  document.getElementById('body').value

    document.getElementById('s-id').innerHTML = 'Submit Record'
    document.getElementById('s-id').setAttribute('onclick','submitForm()');
    
        renderHtml()
}

// -----------------------------------READ FORM DATA --------------------------------

let readForm = () =>{
    let formData = {};
    formData["userId"] = document.getElementById('userId').value;
    formData["title"] = document.getElementById('title').value;
    formData["body"] = document.getElementById('body').value;
  
    return formData;
}
 
// ------------------------------------ VALIDATE FORM -------------------------------


let validateForm = (nam, em , add) => {
   let n =  validateName(nam);
   let e = validateEmail(em);
    let ad = validateAddress(add);
    return (n && e && ad) ? 'true': 'false';
}


let validateName = (nam) =>{                                                 //validate name
  let u_length = nam.length;
    let message =  document.getElementById("name-val");
    if(u_length<=0)
        {
           message.innerHTML = '*required';  
            return false;
        }
    else {
        message.innerHTML = '';
        return true;
        }
}

let validateEmail = (em) => {                                               //validate email
    let result = null;
    usersArray.map(item=> {
        if(item.email.includes(em)){
            console.log(item.email);
            result = true;
        }
        
    })
         
         
    let email_frmt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let message =  document.getElementById("email-val");
    if(em.length<=0)
         {
             message.innerHTML = '*required';
             return false;
         }
    else if(!(em.match(email_frmt)))
        {
             message.innerHTML = '*email format something@gmail.com';
             return false;     
        }
    else if(result){
            message.innerHTML = '';
           alert('*email already exists');
             return false; 
    }
    else{
        message.innerHTML = '';
        return true;
    }
    
}

let validateAddress = (add) => {                                               //validate address
     let add_length = add.length;
    let message = document.getElementById("add-val");
    if(add_length<=0)
        {
           message.innerHTML = '*required';
          
            return false;
        }
    else {
        message.innerHTML = '';
        return true;
        }
    
    
}


//--------------------------------CREATE RECORD ----------------------------------------

let createRecord = (userId, title, body) => {
  
    
    usersArray.push({ userId: name, title: title, body: body })

    renderHtml()
}

// -----------------------------DELETE RECORD ------------------------------

let deleteRecord = (bt) => {
   editIndex = bt
   const data = usersArray[bt];
    usersArray.splice(editIndex,1);
    
    renderHtml()
   
    
}


