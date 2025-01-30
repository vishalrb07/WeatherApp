const apiKey = "97a12f94032bee4661df38481e6974ec"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weathericon");

async function checkWeather(city) {
    city = city.trim(); // Remove extra spaces

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json(); // Parse JSON response

        if (response.status === 404 || data.cod === "404") {
            alert("City not found. Please enter a valid city name.");
            return;
        }

        if (!response.ok) {
            console.error("API Error:", data);
            alert("Something went wrong. Try again later.");
            return;
        }

        console.log(data); // Log API response for debugging

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        const weatherCondition = data.weather[0].main;
        const weatherIcons = {
            Clouds: "images/clouds.png",
            Clear: "images/clear.png",
            Rain: "images/rain.png",
            Snow: "images/snow.png",
            Drizzle: "images/drizzle.png",
            Thunderstorm: "images/thunderstorm.png",
        };

        weatherIcon.src = weatherIcons[weatherCondition] || "images/default.png"; // Default image if unknown condition
    } catch (error) {
        console.error("Fetch Error:", error);
       // alert("Network error. Please check your internet connection.");
    }
}

// Event Listener for Button Click
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event Listener for Enter Key Press
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
