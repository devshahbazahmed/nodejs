document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.querySelector("#city-input");
  const getWeatherBtn = document.querySelector("#get-weather-btn");
  const weatherInfo = document.querySelector("#weather-info");
  const errorMessage = document.querySelector("#error-message");
  const cityName = document.querySelector("#city-name");
  const temperature = document.querySelector("#temperature");
  const description = document.querySelector("#description");

  const API_KEY = "Your API_KEY";

  getWeatherBtn.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    cityInput.value = "";
    try {
      const weatherData = await fetchWeatherData(city);
      console.log(weatherData);
      displayWeather(weatherData);
    } catch (error) {
      showError(error);
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      console.log(response);

      if (!response.ok) {
        throw new Error("City Not Found");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      showError(error);
    }
  }

  function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError(error) {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
