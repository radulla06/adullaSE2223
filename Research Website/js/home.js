import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get }
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQbXZTeNWCcpUUkduZr8Li4PJqd97kHD0",
  authDomain: "research-website-5116b.firebaseapp.com",
  databaseURL: "https://research-website-5116b-default-rtdb.firebaseio.com",
  projectId: "research-website-5116b",
  storageBucket: "research-website-5116b.appspot.com",
  messagingSenderId: "127535651431",
  appId: "1:127535651431:web:23ed44f5445b5ac23dd2c2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getDatabase();

let userLink = document.getElementById("userLink");
let signOutLink = document.getElementById("signOut");
let welcome = document.getElementById("welcome");
let currentUser = null;

function getUserName() {
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  if (keepLoggedIn == "yes") {
      currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
      currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
}

function signOutUser() {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  localStorage.removeItem("keepLoggedIn");

  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateData(userID, extract, day, diameter) {
  update(ref(db, "users/" + "1rBGEb9AsUaAP4xFXil8I8chUwp2" + "/data/Day_" + day), {
    [extract]: diameter
  })
  .then(() => {
    alert("Data updated successfully.");
  })
  .catch((error) => {
    alert("There was an error. Error: " + error);
  });
}

window.onload = function () {
  getUserName();
  if (currentUser == null) {
    userLink.innerText = "Create account";
    userLink.classList.replace("nav-link", "btn");
    userLink.classList.add("btn-primary");
    userLink.href = "register.html";

    signOutLink.innerText = "Sign In";
    signOutLink.classList.replace("nav-link", "btn");
    signOutLink.classList.add("btn-success");
    signOutLink.href = "signIn.html";
  } else {
    userLink.innerText = currentUser.firstName;
    welcome.innerText = "Welcome " + currentUser.firstName + "!";
    userLink.classList.replace("btn", "nav-link");
    userLink.classList.add("btn-primary");
    userLink.href = "#";

    signOutLink.innerHTML = "Sign Out";
    signOutLink.classList.replace("btn", "nav-link");
    signOutLink.classList.add("btn-success");
    document.getElementById("signOut").onclick = function () {
      signOutUser();
    };
  }

  document.getElementById("update").onclick = function () {
    const extract = document.getElementById("extract").value;
    const day = document.getElementById("day").value;
    const diameter = document.getElementById("diameter").value;
    const userID = currentUser.uid;
    updateData(userID, extract, day, diameter);
  };

};