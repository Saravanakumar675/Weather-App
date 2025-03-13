const apiKey = "7ffeda6a84d6d91e5e21507c59a46417";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather"; 
const URL = apiUrl +"appid=" + apiKey + "&q=" + "London" + "&units=metric";

import clear from "./images/clear.png";
import cloudy from "./images/cloudy.png";
import rain from "./images/rain.png";
import drizzle from "./images/drizzle.png";
import mist from "./images/mist.png";



const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    if(!city){
        alert("please enter valid city name");
        return;
    }
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);

        if(response.status == 404){
            document.querySelector("weather").style.display = "block";
            document.querySelector("error").style.display = "none";
        }
    
        const data = await response.json(url);
        console.log(data);
   
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °c" ;
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h" ;
    
        if(data.weather[0].main =="Clouds"){
            weatherIcon.src = cloudy;
        }
        else if(data.weather[0].main =="Clear"){
            weatherIcon.src = clear;
        }
        else if(data.weather[0].main =="Rainr"){
            weatherIcon.src = rain;
        }
        else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src = drizzle;
        }
        else if(data.weather[0].main =="Mist"){
            weatherIcon.src = mist;
        }
    
        document.querySelector(".Weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        } 
        catch (error) {
            console.error("Error fetching weather data:", error);
         }
    }



searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

