var APIkey = "bd86d22637aad3772ee0a0b7c11465f2";
var city;


function getWeather(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";
    fetch(queryURL) .then(res => res.json()) .then(data => {
        console.log(data);
    document.getElementById("cityName").innerText= city + " (" + moment.unix(data.dt).format('L') + ")";
    document.getElementById("mainTemp").innerText= data.main.temp + "°F";
    document.getElementById("icon").src="https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    document.getElementById("mainWind").innerText= data.wind.speed + " MPH";
    document.getElementById("mainHumidity").innerText= data.main.humidity + "%";
    });
    var history = JSON.parse(localStorage.getItem("cities")) || [];
    if(!history.includes(city)){
        history.push(city);
    }
    localStorage.setItem("cities", JSON.stringify(history));
    displayHistory();
}

function displayHistory(){
    document.getElementById("past").innerHTML= "";
    var history = JSON.parse(localStorage.getItem("cities")) || [];
    for(i=0; i<history.length; i++){
        var cityEl = document.createElement("button");
        cityEl.innerText = history[i];
        cityEl.classList.add("btn", "btn-primary", "w-100", "mt-3");
        cityEl.addEventListener("click",function(event){
            getWeather(event.target.innerText);
            fiveDay(event.target.innerText);
        });
        document.getElementById("past").appendChild(cityEl);
    }
}

function fiveDay(city){
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";
    fetch(fiveDayURL).then(res => res.json()) .then(data => {
        console.log(data);
        document.getElementById("date1").innerText= moment.unix(data.list[4].dt).format('L');
        document.getElementById("icon1").src="https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png";
        document.getElementById("temp1").innerText= data.list[4].main.temp + "°F";
        document.getElementById("wind1").innerText= data.list[4].wind.speed + " MPH";
        document.getElementById("humidity1").innerText= data.list[4].main.humidity + "%";
        // 
        document.getElementById("date2").innerText= moment.unix(data.list[12].dt).format('L');
        document.getElementById("icon2").src="https://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + "@2x.png";
        document.getElementById("temp2").innerText= data.list[12].main.temp + "°F";
        document.getElementById("wind2").innerText= data.list[12].wind.speed + " MPH";
        document.getElementById("humidity2").innerText= data.list[12].main.humidity + "%";
        // 
        document.getElementById("date3").innerText= moment.unix(data.list[20].dt).format('L');
        document.getElementById("icon3").src="https://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + "@2x.png";
        document.getElementById("temp3").innerText= data.list[20].main.temp + "°F";
        document.getElementById("wind3").innerText= data.list[20].wind.speed + " MPH";
        document.getElementById("humidity3").innerText= data.list[20].main.humidity + "%";
        // 
        document.getElementById("date4").innerText= moment.unix(data.list[28].dt).format('L');
        document.getElementById("icon4").src="https://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + "@2x.png";
        document.getElementById("temp4").innerText= data.list[28].main.temp + "°F";
        document.getElementById("wind4").innerText= data.list[28].wind.speed + " MPH";
        document.getElementById("humidity4").innerText= data.list[28].main.humidity + "%";
        // 
        document.getElementById("date5").innerText= moment.unix(data.list[36].dt).format('L');
        document.getElementById("icon5").src="https://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + "@2x.png";
        document.getElementById("temp5").innerText= data.list[36].main.temp + "°F";
        document.getElementById("wind5").innerText= data.list[36].wind.speed + " MPH";
        document.getElementById("humidity5").innerText= data.list[36].main.humidity + "%";
    });
}

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var search = document.getElementById("wordSearch").value;
    console.log(search);
    getWeather(search);
    fiveDay(search);
})

displayHistory();
