// all element refences for scripts

//The Form elements
const form = document.getElementById("form")
const showWeatherButton = document.querySelector('#showWeather')
const place_element = document.querySelector('#place');
const bufferimage = document.getElementById("buffer");
const formbackspace = document.getElementById('form_backspace')

//The display elements
const result_div = document.getElementById('result') 
const remarks = document.getElementById('remarks')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
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


    // window.onload= () =>{
    //     showWeatherButton.click()
    // }



showWeatherButton.addEventListener('click', showWeather);
place_element.addEventListener("keyup", function(event) {
    
    if (event.keyCode === 13) {
      showWeatherButton.click();
    }
  });

//Managing Visiblity of elements and Making the call for API at the root
async function showWeather(){
    
    form.style.display = "None";
    bufferimage.style.display = "Block";
    const a = await showWeatherReport(place_element.value);
    bufferimage.style.display="none";
    
    result_div.style.display = "Block";
    
    if (a == "error"){
        remarks.innerHTML = "";
        humidity.innerHTML = "";
        temp.innerHTML = "";
        temp_max.innerHTML = "";
        temp_min.innerHTML = "";
        wind.innerHTML = "";
        window.alert("Some error occured. \nEither You have not entered a valid location or \nthe location is not supported")
    }
}

//Retreive API data and Display 
showWeatherReport = async (place) =>{
    const weather = await getWheather(place);
    if (weather == "Error Ocurred"){
        return 'error'
    }
    
    else{

    remarks.innerHTML= `Remarks : ${weather['remarks']}` 
    humidity.innerHTML= `Humidity : ${weather['humidity']}` 
    wind.innerHTML= `Wind : ${weather['wind_speed']}` 
    temp.innerHTML= `Temperature : ${weather['temperature']['temp']}` 
    temp_max.innerHTML= `Maximum temperature : ${weather['temperature']['temp_max']}` 
    temp_min.innerHTML= `Minimum temperature : ${weather['temperature']['temp_min']}` 
    
}
}
//API request to backend
getWheather = async (place) => {
    data = {place : place};
    request.body = JSON.stringify(data);
    try{
        const result = await fetch(url, request)
        const wheather = await result.json();
        console.log(wheather);
        return wheather;
    }
    catch(error){
        console.log('Error')
        return 'Error Ocurred'
    };

};



//Return to prevScreen
prevScreenButton.onclick = () => {
    result_div.style.display = "None";
    form.style.display = "Block"
};

/*
humidity: 79
location: "India"
rain: {}
remarks: "broken clouds"
temperature: {feels_like: -8.62, temp: -5.02, temp_kf: null, temp_max: -3, temp_min: -7.78}
wind_speed: 1*/