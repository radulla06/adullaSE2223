// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signOut} 
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyPFURYIkezAiM4UY8J2n-Br0PpwPzI1g",
  authDomain: "fir-demo-6b6f3.firebaseapp.com",
  databaseURL: "https://fir-demo-6b6f3-default-rtdb.firebaseio.com",
  projectId: "fir-demo-6b6f3",
  storageBucket: "fir-demo-6b6f3.appspot.com",
  messagingSenderId: "178867746810",
  appId: "1:178867746810:web:3210ab531d928d0c685643"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize authentication
const auth = getAuth();

//Return instance of your app's FRD
const db = getDatabase(app);


// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink');   // user name for number
let signOutLink = document.getElementById('signOut'); // sign-out link
let welcome = document .getElementById('welcome');    // welcome header
let currentUser = null;                               // initialize currentUser to null


// ----------------------- Get User's Name'Name ------------------------------
function getUserName() {
  // Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem('keepLoggedIn');
  
  // Grab uder information passed in from signIn.js
  if (keepLoggedIn == 'yes') {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

function signOutUser() {
  sessionStorage.removeItem('user'); // clear session storage
  localStorage.removeItem('user');   // clear local storage
  localStorage.removeItem('keepLoggedIn');

  signOut(auth, db).then(() => {
    // Sign-out successful.
    window.location.href = '/';
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}
  
  // Remove user info from local/session storage

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------
function setData(userID, year, month, day, temperature){
  // Must use brackets around variable names to use it as a key
  set(ref(db, 'users/' + userID + '/data/' + year + '/' + month), {
    [day]: temperature
  })
  .then(() => {
    alert('Data stored successfully.')
  }).catch((error) => {
    alert('There was an error. Error: ' + error)
  });
}

// -------------------------Update data in database --------------------------
function updateData(userID, year, month, day, temperature){
  // Must use brackets around variable names to use it as a key
  update(ref(db, 'users/' + userID + '/data/' + year + '/' + month), {
    [day]: temperature
  })
  .then(() => {
    alert('Data updated successfully.')
  }).catch((error) => {
    alert('There was an error. Error: ' + error)
  });
 }

// ----------------------Get a datum from FRD (single data point)---------------
function getData(userID, year, month, day){
  
  let yearVal = document.getElementById('yearVal');
  let monthVal = document.getElementById('monthVal');
  let dayVal = document.getElementById('dayVal');
  let temperatureVal   = document.getElementById('tempVal');

  const dbref = ref(db); // firbease paramter to get a reference to the database

  //Provide the path thrugh the nodes
  get(child(dbref, 'users/' + userID + '/data/' + year + '/' + month)).then((snapshot) => {
    if (snapshot.exists()) {
      yearVal.textContent = year;
      monthVal.textContent = month;
      dayVal.textContent = day;

      //To fet set of data, use snapshot.val()
      tempVal.textContent = snapshot.val()[day];

    } else {
      alert("Unsuccessful, error" + error);
    }
  })
  .catch((error) => {
    alert("Unsuccessful, error" + error);
  });
}

// ---------------------------Get a dataset --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph
async function getDataSet(userID, year, month) {
  let yearVal = document.getElementById('setYearVal');
  let monthVal = document.getElementById('setMonthVal');

  yearVal.textContent = `Year: ${year}`;
  monthVal.textContent = `Month: ${month}`;

  const days = [];
  const temps = [];
  const tbodyEl = document.getElementById('tbody-2');

  const dbref = ref(db);

  await get(child(dbref, 'users/' + userID + '/data/' + year + '/' + month))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());

      snapshot.forEach(child => {
        console.log(child.key, child.val());
        days.push(child.key);
        temps.push(child.val());
      })
    } else {
      alert("No data found");
    }
  })
  .catch((error) => {
    alert(error);
  });

  // Dynamically add table rows to HTML
  for (let i = 0; i < days.length; i++) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

    td1.textContent = days[i];
    td2.textContent = temps[i];

    tr.appendChild(td1);
    tr.appendChild(td2);

    tbodyEl.appendChild(tr);
  }
}

// Add a item to the table of data



// -------------------------Delete a day's data from FRD ---------------------
function deleteData(userID, year, month, day) {
  remove(ref(db, 'users/' + userID + '/data/' + year + '/' + month + '/' + day))
  .then(() => {
    alert('Data deleted successfully.')
  }).catch((error) => {
    alert('There was an error. Error: ' + error)
  });
}

// --------------------------- Home Page Loading -----------------------------
window.onload = function() {
  // ---------------------------------- Set Welcome Message -------------------------
  getUserName();
  if(currentUser == null) {
    userLink.innerHTML = "Welcome!";
    userLink.classList.replace("nav-link", "btn");
    userLink.classList.add("btn-primary");
    userLink.href = "/register";

    signOutLink.innerHTML = "Sign In";
    signOutLink.classList.replace("nav-link", "btn");
    signOutLink.classList.add("btn-success");
    signOutLink.href = "/signIn";
  
  }
  else {
    userLink.innerText = currentUser.firstName;
    welcome.innerText = `Welcome ${currentUser.firstName}`;
    userLink.classList.replace("btn", "nav-link");
    userLink.classList.add("btn-primary");
    userLink.href = "/home";

    signOutLink.innerHTML = "Sign Out";
    signOutLink.classList.replace("btn", "nav-link");
    signOutLink.classList.add("btn-success");
    document.getElementById('signOut').onclick = function(){
      signOutUser();
    }
  } 

  // Set, Update, Get, Remove Temperature Data
  
  //Set Data
  document.getElementById('set').onclick = function() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const temperature = document.getElementById('temperature').value;
    const userID = currentUser.uid;
    setData(userID, year, month, day, temperature);
};

// Update data
document.getElementById('update').onclick = function() {
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const day = document.getElementById('day').value;
  const temperature = document.getElementById('temperature').value;
  const userID = currentUser.uid;
  updateData(userID, year, month, day, temperature);

}

// get a datum
document.getElementById('get').onclick = function() {
  const year = document.getElementById('getYear').value;
  const month = document.getElementById('getMonth').value;
  const day = document.getElementById('getDay').value;
  const temperature = document.getElementById('getTemperature').value;
  const userID = currentUser.uid;
  getData(userID, year, month, day);

}
}
  // ------------------------- Set Welcome Message -------------------------

  
  // Get, Set, Update, Delete Sharkriver Temp. Data in FRD
  // Set (Insert) data function call
  

  // Update data function call
  

  // Get a datum function call
document.getElementById('getDataSet').onclick = function() {
  const year = document.getElementById('getSetYear').value;
  const month = document.getElementById('getSetMonth').value;
  const userID = currentUser.uid;
  getDataSet(userID, year, month);
}

  // Get a data set function call
  

  // Delete a single day's data function call