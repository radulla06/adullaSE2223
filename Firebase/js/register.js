// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get }
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// Initialize Authentication
const auth = getAuth();

// Initialize Database
const db = getDatabase();

// ---------------- Register New User --------------------------------//
document.getElementById("submitData").onclick = function() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPass").value;

  // Validate user input
  if (!validation(firstName, lastName, email, password)) {
    return;
  }

  // Create new user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    // Add user account to database
    // Set function creates a new reference or overwrites an existing one
    // Each new user will be placed in the "users" node
    set(ref(db, 'users/' + user.uid + '/accountInfo'), {
      uid: user.uid,        // Save user ID for home.js reference
      email: email,
      password: encryptPass(password),
      firstName: firstName,
      lastName: lastName
    })
    .then(() => {
      alert("Registration successful");
    })
    .catch((error) => {
      alert(error);
    }
    );
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}


// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password) {
  let nameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-z0-9]+@ctemc\.org$/;

  if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)) {
    alert("Please fill out all fields");
    return false;
  }
  
  if (!nameRegex.test(firstName)) {
    alert("Invalid first name");
    return false;
  }
  
  if (!nameRegex.test(lastName)) {
    alert("Invalid last name");
    return false;
  }
  
  if (!emailRegex.test(email)) {
    alert("Invalid email address");
    return false;
  }
  return true;
}

// --------------- Password Encryption -------------------------------------//
function encryptPass(password) {
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}

function decryptPass(password) {
  let decrypted = CryptoJS.AES.decrypt(password, password);
  return decrypted.toString();
}