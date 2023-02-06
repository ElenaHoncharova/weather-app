//⏰Feature #1
/*let date = new Date();
let todayDay = document.querySelector("#current-time");
let day = date.getDay();
let hour = date.getHours();
let minutes = date.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[day];
if (hour < 10 && minutes < 10) {
  todayDay.innerHTML = `${day} 0${hour}:0${minutes}`;
} else if (hour >= 10 && minutes < 10) {
  todayDay.innerHTML = `${day} ${hour}:0${minutes}`;
} else if (hour < 10 && minutes >= 10) {
  todayDay.innerHTML = `${day} 0${hour}:${minutes}`;
} else {
  todayDay.innerHTML = `${day} ${hour}:${minutes}`;
}*/

function showTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector(".temp-number");
  let headerCity = document.querySelector("#choosen-city");
  let skyElement = document.querySelector("#sky");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  skyElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  headerCity.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
}
//🕵️‍♀️Feature #2
function changeCity(event) {
  event.preventDefault();
  let myCity = document.querySelector("#enter-city");
  let cityName = myCity.value;
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
  /*let headerCity = document.querySelector("#choosen-city");
 headerCity.innerHTML = `${myCity.value}`;*/
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function getCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getNavigation() {
  navigator.geolocation.getCurrentPosition(getCity);
}

let button = document.querySelector("button");
button.addEventListener("click", getNavigation);

/*//🙀Bonus Feature
function changeFah(event) {
  event.preventDefault();
  let temp = document.querySelector(".temp-number");
  temp.innerHTML = "66";
}
function changeCel(event) {
  event.preventDefault();
  let temp = document.querySelector(".temp-number");
  temp.innerHTML = "19";
}
let fah = document.querySelector("#fah");
let cel = document.querySelector("#cel");
fah.addEventListener("click", changeFah);
cel.addEventListener("click", changeCel);*/
