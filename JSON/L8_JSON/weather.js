/* JSON Demonstration Using Lincroft Weather Data
    1.  Temperatures in Kelvin
    2.  Humidity in %
    3.  Atmospheric Pressue:  hPa = Pa x 100
    4.  Wind Speed: m/s
    5.  Cloudiness: %
    6.  Rain:  mm       Had to convert key "1h" to "h1" (Can't follow # with letter in JS)
 */

async function getData() {
    // Create empty arrays to hold the data
    let temps = [];
    let humidity = [];
    let pressure = [];
    let windSpeed = [];
    let rain = [];
    let weather = [];
    let icons = [];

    // Fetch the data from the API and convert it to JSON
    const response = await fetch('weather.json')
        .then(data => data.json())
        .then(data => {
            console.log(data);

            // Push JSON data to the arrays
            temps.push(data.main.temp);
            humidity.push(data.main.humidity);
            pressure.push(data.main.pressure);
            windSpeed.push(data.wind.speed);
            rain.push(data.rain.h1);
            weather.push(data.weather[0].main);
            icons.push(data.weather[0].icon);

            document.getElementById("temp").innerHTML = `${temps[0]} K`;
            document.getElementById("humidity").innerHTML = `${humidity[0]}%`;
            document.getElementById("pressure").innerHTML = `${pressure[0]} hPa`;
            document.getElementById("windSpeed").innerHTML = `${windSpeed[0]} m/s`;
            document.getElementById("rain").innerHTML = `${rain[0]} mm`;
        });
    
    // Set the weather icon
    document.getElementById("weather").innerHTML = `<img src="img/${icons[0]}.png" alt="rain" width="75">`;
}

getData();