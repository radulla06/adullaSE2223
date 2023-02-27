// ----------------- User Sign-In Page --------------------------------------//

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

// ---------------------- Sign-In User ---------------------------------------//
document.getElementById("signIn").onclick = function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    //Attempt to sign user in
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // create a user and store the user ID
        const user = userCredential.user;

        // log sign-in date in DB
        // update will only add the last_login
        let logDate = new Date();
        update(ref(db, 'users/' + user.uid + '/accountInfo'), {
            last_login: logDate,
        })
        .then(() => {
            // User Signed in
            alert("Sign-in successful");

            // get snapshot of all user info
            // login() function and stored in session or local storage
            get(ref(db, 'users/' + user.uid + '/accountInfo')).then((snapshot) => {
                if (snapshot.exists()) {
                    logIn(snapshot.val());
                }
                else {
                    console.log("User does not exist");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch(() => {
            // Error
            alert(error);
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    })
}

// ---------------- Keep User Logged In ----------------------------------//
function logIn(user) {
    let keepLoggedIn = document.getElementById("keepLoggedInSwitch").ariaChecked;

    // Session storage is temporary (only active while browser is open)
    // Information is saved as a string (must be converted back to object)
    // Session storage will be cleared with a signOut() function
    if (keepLoggedIn == "false") {
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location = "home.html";
    } else {
        // Local storage is permanent (until cleared)
        localStorage.setItem("keepLoggedIn", "yes");       
        localStorage.setItem("user", JSON.stringify(user));
        window.location = "home.html";
    }
}