// all element refences for scripts

//The Form elements
const form = document.getElementById("form")
const showWeatherButton = document.querySelector('#showWeather')
const place_element = document.querySelector('#place');
const bufferimage = document.getElementById("buffer");
const formbackspace = document.getElementById('form_backspace')

//The display elements
const result_div = document.getElementById('result') 
const img = document.getElementById('img') 
const remarks = document.getElementById('remarks')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const temp = document.getElementById('temp')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const feels_like = document.getElementById('feels_like')
const prevScreenButton = document.getElementById('returnPrevScreen')

//Constants for API request
const url = "https://weathertelling.herokuapp.com/currentWheather";
// const url = 'http://localhost:5000/currentWheather'
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
        feels_like.innerHTML = "";
        sunrise.innerHTML = "";
        sunset.innerHTML = "";
        wind.innerHTML = "";
        prevScreenButton.click();
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
    img.src = weather['url']
    console.log(weather['url'])
    remarks.innerHTML= `${weather['remarks']}` 
    humidity.innerHTML= `${weather['humidity']}%` 
    wind.innerHTML= `${weather['wind_speed']} km/h` 
    temp.innerHTML= `${weather['temperature']['temp']} &degC` 
    feels_like.innerHTML= `${weather['temperature']['feels_like']} &degC` 

    weather['sunrise'] = weather['sunrise'].split(' ')[1].split(['+'])[0]
    weather['sunset'] = weather['sunset'].split(' ')[1].split(['+'])[0]

    sunrise.innerHTML= `${weather['sunrise']} UTC` 
    sunset.innerHTML= `${weather['sunset']} UTC` 
    
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
