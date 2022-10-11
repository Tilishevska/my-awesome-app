let now = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = now.getDay();
let currentHour = now.getHours();
let currentMinute = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

function updateDayAndTime() {
  let dayTime = document.querySelector("#date");
  dayTime.innerHTML = `${day[currentDay]} ${currentHour}:${currentMinute}`;
}

updateDayAndTime();

function fullDate(date) {
  let dayNumber = date.getDate();
  if (dayNumber < 10) {
    dayNumber = `0${dayNumber}`;
  }

  let monthNumber = date.getMonth();
  let fullYear = date.getFullYear();
  return `${dayNumber}.${monthNumber + 1}.${fullYear}`;
}
let fullDateNow = document.querySelector("#fullDate");
fullDateNow.innerHTML = fullDate(now);

function convertCelsius() {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round((temperature.innerHTML - 32) * (5 / 9));
  convertCelsiusStyle();
}

function convertCelsiusStyle() {
  let celcius = document.querySelector("#celsius-link");
  let fahrenheit = document.querySelector("#fahrenheit-link");
  celcius.style.fontWeight = "600";
  fahrenheit.style.fontWeight = "300";
}

function convertFahrenheit() {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(temperature.innerHTML * (9 / 5) + 32);
  convertFahrenheitStyle();
}

function convertFahrenheitStyle() {
  let celcius = document.querySelector("#celsius-link");
  let fahrenheit = document.querySelector("#fahrenheit-link");
  celcius.style.fontWeight = "300";
  fahrenheit.style.fontWeight = "600";
}

let linkCelsius = document.querySelector("#celsius-link");
linkCelsius.addEventListener("click", convertCelsius);

let linkFahrenheit = document.querySelector("#fahrenheit-link");
linkFahrenheit.addEventListener("click", convertFahrenheit);

let newCity = "";
function onSearchCity(event) {
  event.preventDefault();
  newCity = `${city.value.trim()}`;
  setWeatherApi();
}

let cityForm = document.querySelector(".search-form");
cityForm.addEventListener("submit", onSearchCity);

let lat = "";
let lon = "";

function onGeolocationButton() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  setGeoWeatherApi();
}

let cityButton = document.querySelector("#current-city-btn");
cityButton.addEventListener("click", onGeolocationButton);

let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "4310b5245b3d40079e6701f6a0b3466e";
let limit = 1;
let unit = "metric";

function setWeatherApi() {
  if (newCity === undefined || newCity.length < 1) {
    alert("Error, please enter a city to continue");
  } else {
    let apiUrl = `${apiEndpoint}q=${newCity}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(updateDisplays);
  }
}

function setGeoWeatherApi() {
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateDisplays);
}

function updateDisplays(response) {
  updateCity();
  updateDesc(response);
  updateGeoName(response);
  updateHumidity(response);
  updateTemperature(response);
  updateWind(response);
}

function updateCity() {
  let currentCity = document.querySelector("#requested-city");
  currentCity.innerHTML = `${city.value.trim()}`;
}

function updateDesc(response) {
  let weatherDesc = `${response.data.weather[0].main}`;
  let nowWeatherDesc = document.querySelector("#current-weather-desc");
  nowWeatherDesc.innerHTML = weatherDesc;
}

function updateGeoName(response) {
  let currentCity = document.querySelector("#requested-city");
  currentCity.innerHTML = `${response.data.name}`;
}

function updateHumidity(response) {
  let humidity = Math.round(`${response.data.main.temp}`);
  let nowHumidity = document.querySelector("#humidity");
  nowHumidity.innerHTML = humidity;
}

function updateTemperature(response) {
  let temperature = Math.round(`${response.data.main.temp}`);
  let nowTemp = document.querySelector("#current-temperature");
  nowTemp.innerHTML = temperature;
}

function updateWind(response) {
  let wind = Math.round((`${response.data.wind.speed}` * 3600) / 1000);
  let nowWind = document.querySelector("#wind");
  nowWind.innerHTML = wind;
}
