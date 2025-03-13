document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_API_KEY"; // Replace with your WeatherAPI key
    const cityInput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    const locationText = document.getElementById("location");
    const weatherIcon = document.getElementById("weatherIcon");
    const temperatureText = document.getElementById("temperature");
    const descriptionText = document.getElementById("description");

    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert("City not found. Please enter a valid city name.");
                    return;
                }

                locationText.innerText = `${data.location.name}, ${data.location.country}`;
                temperatureText.innerText = `Temperature: ${data.current.temp_c}°C`;
                descriptionText.innerText = `Condition: ${data.current.condition.text}`;
                weatherIcon.src = data.current.condition.icon;
                weatherInfo.classList.remove("hidden");
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("Something went wrong. Try again later.");
            });
    });
});
