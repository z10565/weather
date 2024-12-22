const apiKey = "c09b9ee40f82dc4ccd2ff58d8e9553e2"; 

function getCurrentWeather() {
  const city = document.getElementById("city-input").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        document.getElementById("weather-data").innerText =
          "City not found or error occurred";
      } else {
        document.getElementById("weather-data").innerHTML = `
                    <strong>${data.name}, ${data.sys.country}</strong><br>
                    Temperature: ${data.main.temp}&deg;C<br>
                    Weather: ${data.weather[0].description}<br>
                    Humidity: ${data.main.humidity}%<br>
                    Wind Speed: ${data.wind.speed} m/s
                `;
      }
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
    });
}

function getWeatherForecast() {
  const city = document.getElementById("city-input").value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== "200") {
        document.getElementById("forecast-data").innerHTML =
          "City not found or error occurred";
      } else {
        const forecastContainer = document.getElementById("forecast-data");
        forecastContainer.innerHTML = "";
        const forecasts = data.list.filter((item, index) => index % 8 === 0);

        forecasts.forEach((item) => {
          const forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item");
          forecastItem.innerHTML = `
                        <strong>${new Date(
                          item.dt_txt
                        ).toDateString()}</strong><br>
                        Temp: ${item.main.temp}&deg;C<br>
                        Weather: ${item.weather[0].description}<br>
                        Humidity: ${item.main.humidity}%
                    `;
          forecastContainer.appendChild(forecastItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
    });
}

// const fetch = require('node-fetch');

// const apiKey = '<YOUR_API_KEY>';
// const city = '<CITY_NAME>';
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
