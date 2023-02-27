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

document.getElementById("signIn").onclick = function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        let logDate = new Date();
        update(ref(db, 'users/' + user.uid + '/accountInfo'), {
            last_login: logDate,
        })
        .then(() => {
            alert("Sign-in successful");

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
            alert(error);
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    })
}

function logIn(user) {
    let keepLoggedIn = document.getElementById("keepLoggedInSwitch").ariaCheked;

    if (!keepLoggedIn) {
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location = "home.html";
    } else {
        localStorage.setItem("keepLoggedIn", "yes");       
        localStorage.setItem("user", JSON.stringify(user));
        window.location = "home.html";
    }
}