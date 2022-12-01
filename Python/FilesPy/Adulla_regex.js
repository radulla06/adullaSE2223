let firstName = "Ranvith";
let lastName = "Adulla";
let email = "raadulla@ctemc.org";

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function validation() {
    let fNameRegex = /^[a-zA-Z]+$/;
    let lNameRegex = /^[a-zA-Z]+$/;
    let emailRegex = /^[a-zA-Z0-9]+@(ctemc|gmail|yahoo)+.(org|com|edu)$/;
    if(!fNameRegex.test(firstName) || isEmptyOrSpaces(firstName)) {
        console.log("First name should only contain letters");
        return false;
    }
    if(!lNameRegex.test(lastName) || isEmptyOrSpaces(lastName)) {
        console.log("Last name should only contain letters");
        return false;
    }
    if(!emailRegex.test(email) || isEmptyOrSpaces(email)) {
        console.log("Email is not valid");
        return false;
    }
    console.log("All inputs have been validated");
    return true;
}

validation()