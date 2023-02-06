//Finall function. ❓Is it OK to put all together in one function?
function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let headerCity = document.querySelector("#choosen-city");
  let skyElement = document.querySelector("#sky");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  skyElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  headerCity.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let date = new Date(response.data.dt * 1000);
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
    todayDay.innerHTML = `Last updated: ${day} 0${hour}:0${minutes}`;
  } else if (hour >= 10 && minutes < 10) {
    todayDay.innerHTML = `Last updated: ${day} ${hour}:0${minutes}`;
  } else if (hour < 10 && minutes >= 10) {
    todayDay.innerHTML = `Last updated: ${day} 0${hour}:${minutes}`;
  } else {
    todayDay.innerHTML = `Last updated: ${day} ${hour}:${minutes}`;
  }
  function changeFah(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round(
      (Math.round(response.data.main.temp) * 9) / 5 + 32
    );
  }
  function changeCel(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round(response.data.main.temp);
  }
  let fah = document.querySelector("#fah");
  let cel = document.querySelector("#cel");

  fah.addEventListener("click", changeFah);
  cel.addEventListener("click", changeCel);

  console.log(currentTemp);
}

//When "Find" button is clicked
function changeCity(event) {
  event.preventDefault();
  let myCity = document.querySelector("#enter-city");
  let cityName = myCity.value;
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

//When the "Current location" button is clicked
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

/*//Defaul city = Kyiv
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=kyiv&appid=ebef9ca4a8de66ed586fac628fade056&units=metric`;
axios.get(apiUrl).then(showTemp);

//🙀Bonus Feature
function changeFah(event) {
  event.preventDefault();
  return ${temp} * 1,8 + 32;
  
 
}
function changeCel(event) {
  event.preventDefault();
 
 return ${temp}
}
let fah = document.querySelector("#fah");
let cel = document.querySelector("#cel");
let temp = Math.round(response.data.main.temp);
temp.innerHTML = fah.addEventListener("click", changeFah) || cel.addEventListener("click", changeCel)
fah.addEventListener("click", changeFah(temp));
cel.addEventListener("click", changeCel);*/
