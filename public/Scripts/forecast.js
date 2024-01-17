// fetch("http://dataservice.accuweather.com/currentconditions/v1/")
// .then(response => response.json())
// .then(data => console.log(data)).catch(err => console.log("error:",err));
const keyApi = "wIlDuIN2dNv3CQiIaGmmizQDV5YjAsUx";
const base_city = "http://dataservice.accuweather.com/locations/v1/cities/search";
const corsProxy = "https://cors-proxy.htmldriven.com/";

class Forecast{

  constructor(){
    this.key = keyApi;
    this.city = base_city;
    this.corsProxy = corsProxy;
  }
  //Get City  and Weather
  async getData(city){
    const cityDetails = await this.getCity(city);
    const weatherDetails = await this.weather(cityDetails.Key);
    console.log(cityDetails, weatherDetails);

    return { cityDetails, weatherDetails };
  }

  async getCity(city){
    const query = `?apikey=${this.key}&q=${city}`;
    const countryName = await fetch(this.corsProxy + this.city + query);
    const data = await countryName.json();
  
    return data[0];
  }

  async weather(city_weather){
    const base_weather = `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/${city_weather}`;
    const fetch_query = `?apikey=${this.key}`;
    const weather_location = await fetch(this.corsProxy + base_weather + fetch_query);
    const data_weather = await weather_location.json();
  
    return data_weather[0];
  }

}





