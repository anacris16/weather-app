function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDays];
  return `${day} ${hours}:${minutes}`;
}
function showLongDate(date) {
  let currentMonth = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentMonth];
  let today = date.getDate();
  let year = date.getFullYear();
  return `${month} ${today}, ${year}`;
}
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#location-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value.toLowerCase()}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

/*function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temperature");
  temperatureElement.innerHTML = 50;
}*/

/*function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temperature");
  temperatureElement.innerHTML = 17;
}*/

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#actual-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  //let timeZone=position.coords.
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formatDate(now);

let longDateElement = document.querySelector("#long-date");
let currentDate = new Date();
longDateElement.innerHTML = showLongDate(currentDate);

let searchForm = document.querySelector("#search-form");
console.log(searchForm);
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentWeather);

/*let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);*/
