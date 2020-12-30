// all element refences for scripts

//The Form elements
const form = document.getElementById("form")
const showWeatherButton = document.querySelector('#showWeather')
const place_element = document.querySelector('#place');

//The display elements
const result_div = document.getElementById('result') 
const remarks = document.getElementById('remarks')
const humidity = document.getElementById('humidity')
const temp = document.getElementById('temp')
const temp_min = document.getElementById('temp_min')
const temp_max = document.getElementById('temp_max')
const prevScreenButton = document.getElementById('returnPrevScreen')

//Constants for API request
const url = "https://weathertelling.herokuapp.com/currentWheather";
const request = {
    method : 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};


showWeatherButton.addEventListener('click', showWeather);
place_element.addEventListener("keyup", function(event) {
    
    if (event.keyCode === 13) {
      showWeatherButton.click();
    }
  });

//Managing Visiblity of elements and Making the call for API at the root
async function showWeather(){
    await showWeatherReport(place_element.value);
    result_div.style.display = "Block";
    form.style.display = "None"
}

//Retreive API data and Display 
showWeatherReport = async (place) =>{
    const weather = await getWheather(place);
    remarks.innerHTML= `Remarks : ${weather['remarks']}` 
    humidity.innerHTML= `Humidity : ${weather['humidity']}` 
    temp.innerHTML= `Temperature : ${weather['temperature']['temp']}` 
    temp_max.innerHTML= `Maximum temperature : ${weather['temperature']['temp_max']}` 
    temp_min.innerHTML= `Minimum temperature : ${weather['temperature']['temp_min']}` 
    
}
//API request to backend
getWheather = async (place) => {
    data = {place : place};
    request.body = JSON.stringify(data);
    const result = await fetch(url, request);
    const wheather = await result.json();
    console.log(wheather);
    return wheather;
};



//Return to prevScreen
prevScreenButton.onclick = () => {
    result_div.style.display = "None";
    form.style.display = "Block"
};