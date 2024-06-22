/* ------------------------------SUBMIT FORM -----------------------------------*/ 
var usersArray = []
let isEdit = false
let editIndex = null

let submitForm = () => {
     const formData = readForm();;
     let validate = validateForm(formData["name"], formData["email"], formData["address"]);
    console.log(validate);
    
   if(validate == 'true')
       {
           createRecord(formData["name"], formData["email"], formData["address"]);
           clearRecord();
       }
    
  }

/* --------------------------------CLEAR RECORD ------------------------------------*/

let clearRecord = () =>{
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
}


/* ----------------------------------EDIT RECORD -----------------------------------*/

let editRecord = (bt) => {
    isEdit = true
    editIndex = bt
   const data = usersArray[bt]
     document.getElementById('name').value = data.name;
     document.getElementById('email').value = data.email;
     document.getElementById('address').value = data.address;
      document.getElementById('sub-id').innerHTML = 'Update Record'
    document.getElementById('sub-id').setAttribute('onclick','updateRecord()');
}

/* --------------------------------- UPDATE RECORD ------------------------------------*/

let updateRecord = (bt) => {
      
      usersArray[editIndex].name = document.getElementById('name').value
      usersArray[editIndex].email =  document.getElementById('email').value
      usersArray[editIndex].address =  document.getElementById('address').value

    document.getElementById('sub-id').innerHTML = 'Submit Record'
    document.getElementById('sub-id').setAttribute('onclick','submitForm()');
    
        renderHtml()
}

/* -----------------------------------READ FORM DATA --------------------------------*/

let readForm = () =>{
    let formData = {};
    formData["name"] = document.getElementById('name').value;
    formData["email"] = document.getElementById('email').value;
    formData["address"] = document.getElementById('address').value;
  
    return formData;
}
 
/* ------------------------------------ VALIDATE FORM -------------------------------*/

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


/*--------------------------------CREATE RECORD ----------------------------------------*/
let renderHtml = () => {
     let tbl =  document.getElementById('tbl-id');
       tbl.innerHTML = '';
    let html = '';
    usersArray.map((item, key) => (
        html+=`
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td> <button type="button" onclick="editRecord(${key})"> Edit </button> </td>
            <td> <button type="button" onclick="deleteRecord(${key})"> Delete </button> </td>
        </tr>`
    
    ))
    tbl.innerHTML = html
}

let createRecord = (name, em, add) => {
  
    
    usersArray.push({ name: name, email: em, address: add })

    renderHtml()
}

/* -----------------------------DELETE RECORD ------------------------------*/

let deleteRecord = (bt) => {

   editIndex = bt
   const data = usersArray[bt];
    usersArray.splice(editIndex,1);
    
    renderHtml()
    
    
    
    
}
