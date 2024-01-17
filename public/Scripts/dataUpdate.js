import db from "./connectionDb.js";

const data = db.collection("WeatherHistory");

const historyContainer = document.querySelector(".container-history");

data.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        updateUIHistory(doc.data());
    });
});


function updateUIHistory(data){
    let dateData = new Date();
    let dateDetails = dateData.getTime(data.created_at);
    let Time = new Date(dateDetails);
    console.log(Time);
    let html_history = `<div class="card-size col-12 text-size col-md-12 text-start my-2 mx-auto">
    <div class="card-body justify-content-between d-flex m-2 p-0">
        <div>
            <h4 class="card-title">City: ${data.placename}</h4>
            <p class="card-text">Weather: ${data.weatherdetails}</p>
        </div>
        <p class="date my-0 text-end">Date: ${Time}</p>
    </div>
  </div>`
  
    historyContainer.innerHTML += html_history;
}

