// JSON Demonstration with COVID-19 Data

async function getData() {
    // Create empty arrays to hold the data
    const state = [];
    const positive = [];

    // Select the <tbody> element
    const tbody = document.querySelector('tbody');

    const data = await fetch('covid19.json')
        .then(data => data.json())
        .then(data => {
            console.log(data);

            // Push JSON data to the arrays by looping through the data
            for (let i = 0; i < data.length; i++) {
                state.push(data[i].state);
                positive.push(data[i].positive);
            }

            // Dynamically add table rows to the <tbody> element
            tbody.innerHTML += `
                <tr>
                    <td>${state[i]}</td>
                    <td>${positive[i]}</td>
                </tr>
            `;            
        });
}

getData();