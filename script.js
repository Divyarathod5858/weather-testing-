const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "443c7dd739fc2b43af9c8d4aa582255c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        console.log("Making API call to:", url);
        const response = await fetch(url);
        const weather_data = await response.json();

        console.log("Received data:", weather_data);

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        // If location is found
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Display weather data
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Update weather image based on conditions
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "./assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "./assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "./assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "./assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "./assets/snow.png";
                break;
            default:
                weather_img.src = "./assets/default.png";  // Fallback image
                break;
        }

        console.log("Weather data processed successfully.");

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    console.log("Search button clicked");
    checkWeather(inputBox.value);  // Pass input value to checkWeather function
});
