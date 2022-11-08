// Graph CSV data with Chart.js

async function getData() {
    const response = await fetch('data.csv');       // Fetch the csv file
    const data = await response.text();             // Read the csv file into a string

    const xGrowth = [];
    const yControl = [];
    const yCornflower = [];
    const yOregano = [];
    const ySoap = [];

    const table = data.split('\n').slice(1);                          // Split the csv file and remove the header row
    console.log(table);                                               // Log the table to the console

    table.forEach(row => {
        const columns = row.split(',');                               // Split each row into columns

        const growth = columns[0];                                   
        xGrowth.push(growth);                                            

        const controlGrowth = columns[1];                          
        yControl.push(controlGrowth);

        const cornflowerGrowth = columns[2];
        yCornflower.push(cornflowerGrowth);

        const oreganoGrowth = columns[3];
        yOregano.push(oreganoGrowth);

        const soapGrowth = columns[4];
        ySoap.push(soapGrowth);                      
    });
    return { xGrowth, yControl, yCornflower, yOregano, ySoap };                      // Return the arrays
}

async function createChart() {
    const data = await getData();                                     // Get the data from the csv file
    const ctx = document.getElementById('myChart');                   // Get the canvas element
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xGrowth,                                      
            datasets: [{
                label: 'Control',
                data: data.yControl,                                    
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Cornflower',
                data: data.yCornflower,                                
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Oregano',
                data: data.yOregano,                                   
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: 'Soap',
                data: data.ySoap,
                backgroundColor: 'rgba(235, 128, 111, 0.2)',
                borderColor: 'rgba(91, 53, 158, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Day',
                        font: {
                           size: 20
                        },
                    },
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Growth',
                        font: {
                            size: 20
                        },
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Growth of Bacteria in Each Prepared Sample in cm',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10
                    }
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}
createChart();