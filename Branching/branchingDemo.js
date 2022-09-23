// Filename:        branchingDemo.js
// Author:          Ranvith Adulla
// Objective:       Demonstrate how to use GitHub branches

const months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October", "November", "December"];

const d = new Date();

// getMonth() returns the month as an integer (0 - 11), where Jan = 0 and Dec = 11
// getDay() returns the day as an integer (1 - 31)
// getFullYear() returns the year as a 4 digit number

let month = months[d.getMonth()];
let day = d.getDate();
let year = d.getFullYear();

let currentDate = "The current date is: " + month + " " + day + ", " + year;

console.log("The date is: " + d);
console.log(currentDate);