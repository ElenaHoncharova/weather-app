//Forecast's part
function getForecast(coordinates) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlForecast).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forcastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forcastHTML =
        forcastHTML +
        ` 
    
    <div class="col-2">
     <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    <img 
    src="ForecastImages/${forecastDay.weather[0].icon}.png" 
    alt="${forecastDay.weather[0].description}" 
    width="40px"
    />
    <div class="forecast-temp">
   <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°
   </span>
   <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°
   </span>
    </div>
    </div>`;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forecastElement.innerHTML = forcastHTML;
}

//Main function
function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let headerCity = document.querySelector("#choosen-city");
  let skyElement = document.querySelector("#sky");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  getForecast(response.data.coord);
  skyElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: <b style="color:#FF934F;">${response.data.main.humidity}</b>%`;

  windElement.innerHTML = `Wind: <b style="color:#FF934F;">${Math.round(
    response.data.wind.speed
  )}</b> km/h`;
  headerCity.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let date = new Date(response.data.dt * 1000);
  let todayDay = document.querySelector("#current-time");
  let day = date.getDay();
  let number = date.getDate();
  let month = date.getMonth();
  /*let hour = date.getHours();
  let minutes = date.getMinutes();*/
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  month = months[month];
  day = days[day];
  todayDay.innerHTML = `${day}<br />${month} <b style="color:#FF934F;">${number}</b>`;
  /*if (hour < 10 && minutes < 10) {
    todayDay.innerHTML = `${day} 0${hour}:0${minutes}`;
  } else if (hour >= 10 && minutes < 10) {
    todayDay.innerHTML = `${day} ${hour}:0${minutes}`;
  } else if (hour < 10 && minutes >= 10) {
    todayDay.innerHTML = `${day} 0${hour}:${minutes}`;
  } else {
    todayDay.innerHTML = `${day} ${hour}:${minutes}`;
  }*/

  function changeFah(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round(
      (Math.round(response.data.main.temp) * 9) / 5 + 32
    );
    cel.classList.remove("active");
    fah.classList.add("active");
  }
  function changeCel(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    fah.classList.remove("active");
    cel.classList.add("active");
  }
  let fah = document.querySelector("#fah");
  let cel = document.querySelector("#cel");

  fah.addEventListener("click", changeFah);
  cel.addEventListener("click", changeCel);

  let bigIcon = document.querySelector("#big-icon");
  bigIcon.setAttribute("src", `TopImages/${response.data.weather[0].icon}.png`);
  bigIcon.setAttribute("alt", `${response.data.weather[0].description}`);
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
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl2).then(showTemp);
}

function getNavigation() {
  navigator.geolocation.getCurrentPosition(getCity);
}

let button = document.querySelector("button");
button.addEventListener("click", getNavigation);

//Defaul city = Kyiv
let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=kyiv&appid=ebef9ca4a8de66ed586fac628fade056&units=metric`;
axios.get(apiUrl1).then(showTemp);
