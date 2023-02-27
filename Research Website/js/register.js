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

document.getElementById("submitData").onclick = function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPass").value;

    if (!validation(firstName, lastName, email, password)) {
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        set(ref(db, 'users/' + user.uid + '/accountInfo'), {
            uid: user.uid,
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
    });})
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
}


function isEmptyorSpaces(str){
    return str === null || str.match(/^ *$/) !== null
}

function validation(firstName, lastName, email, password) {
    let fNameRegex = /^[a-zA-Z]+$/;
    let lNameRegex = /^[a-zA-Z]+$/;
    let emailRegex = /^[a-zA-z0-9]+@ctemc\.org$/;

    if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)) {
        alert("Please fill out all fields");
        return false;
    }
    
    if (!fNameRegex.test(firstName)) {
        alert("Invalid first name");
        return false;
    }

    if (!lNameRegex.test(lastName)) {
        alert("Invalid last name");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return false;
    }
    return true;
}

function encryptPass(password) {
    let encrypted = CryptoJS.AES.encrypt(password, password);
    return encrypted.toString();
}

function decryptPass(password) {
    let decrypted = CryptoJS.AES.decrypt(password, password);
    return decrypted.toString();
}