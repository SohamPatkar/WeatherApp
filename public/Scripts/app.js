import db from "./connectionDb.js";

const btnRedirect = document.querySelector(".color-btn");
const formLocation = document.querySelector(".change-location");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const image = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  const dataCity = data.cityDetails;
  const dataWeather = data.weatherDetails;
  console.log(data);
  details.innerHTML = `<h3 class="my-2">${dataCity.EnglishName}</h3>
    <div class="my-2">${dataWeather.WeatherText}</div>
    <div class="display-4 my-2">
        <span>${dataWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

  let iconsrc = `img/icons/${dataWeather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconsrc);

  if (dataWeather.IsDayTime) {
    image.src = "img/day.svg";
  } else {
    image.setAttribute("src", "img/night.svg");
  }

  if(card.classList.contains("d-none")){
    card.classList.remove("d-none");
  }
};


formLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.clear();
  card.classList.remove("d-none");
  const cityName = formLocation.city.value.trim();
  localStorage.setItem('nameofCity', cityName);

  formLocation.reset();

  forecast.getData(cityName)
    .then((data) => {updateUI(data);
      addDatabase(data);
    })
    .catch((err) => console.log(err));
});

window.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('nameofCity')){
    let city = localStorage.getItem('nameofCity');
    console.log(city);
    forecast.getData(city)
      .then(data => {updateUI(data);})
      .catch(err => console.log(err));
  }
});

function addDatabase(data){
  const date = new Date();

  db.collection("WeatherHistory").add({
    placename: data.cityDetails.EnglishName,
    temperature: data.weatherDetails.Temperature.Metric.Value,
    weatherdetails: data.weatherDetails.WeatherText,
    created_at: firebase.firestore.Timestamp.fromDate(date)
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}


btnRedirect.addEventListener("click" , ()=>{
  window.location.href = "./History.html";
});


