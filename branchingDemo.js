// Filename:        branchingDemo.js
// Author:          Ranvith Adulla
// Objective:       Demonstrate how to use GitHub branches

const months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October", "November", "December"];

const d = new Date();

// getMonth() returns the month as an integer (0 - 11), where Jan = 0 and Dec = 11
let month = months[d.getMonth()];

console.log("The date is: " + d);
