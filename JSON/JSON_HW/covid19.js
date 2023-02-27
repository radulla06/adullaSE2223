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
        });

        return { state, positive };
}

async function createChart() {
    const data = await getData();                                     // Get the data from the csv file
    const ctx = document.getElementById('myChart');                   // Get the canvas element
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.state,                                      
            datasets: [{
                label: 'Positive Cases',
                data: data.positive,                                    
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'State',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        stepSize: 1,
                        min: 0,
                        autoSkip: false
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Positive Cases',
                        font: {
                            size: 20
                        },
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'COVID Cases by State',
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