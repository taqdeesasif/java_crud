let deleteRows =() => {  
    
    let tbl_del =  document.getElementById('flt-tbl');
    tbl_del.innerHTML = '';
 }



let createTable = (data, table) => {
    
    data.forEach((value)=> {
     let template = `
                <tr>
                    <td>${value["username"]}</td>
                    <td>${value["email"]}</td>
                    <td>${value["address"]}</td>
                </tr>`;
     
     table.innerHTML += template;
     
 })
}


const users_data = [
  {
    username: 'user1',
    email: 'user1@example.com',
    address: '123 Main St, City1, Country1'
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    address: '456 Elm St, City2, Country2'
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    address: '789 Oak St, City3, Country3'
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    address: '101 Maple St, City4, Country4'
  },
  {
    username: 'user5',
    email: 'user5@example.com',
    address: '555 Pine St, City5, Country5'
  },
  {
    username: 'user6',
    email: 'user6@example.com',
    address: '777 Birch St, City6, Country6'
  },
  {
    username: 'user7',
    email: 'user7@example.com',
    address: '888 Cedar St, City7, Country7'
  },
  {
    username: 'user8',
    email: 'user8@example.com',
    address: '999 Walnut St, City8, Country8'
  },
  {
    username: 'user9',
    email: 'user9@example.com',
    address: '222 Oak St, City9, Country9'
  },
  {
    username: 'user10',
    email: 'user10@example.com',
    address: '333 Pine St, City10, Country10'
  }
];

/* --------------------FILTER RECORD ----------------*/

let filterRecordTable = () => {
    
    deleteRows();  
    let filter = document.getElementById('uname').value;
    a = true;
    if(a){
        let flt_d = users_data.filter(user => user.username.includes(filter));
        let tbl_new =  document.getElementById('flt-tbl');
        createTable(flt_d, tbl_new);
        }     
}

/* --------DISPLAY RECORD ______________________*/

let tbl =  document.getElementById('flt-tbl');
createTable(users_data, tbl);




 






