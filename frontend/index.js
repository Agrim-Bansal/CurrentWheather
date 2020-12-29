const url = "https://weathertelling.herokuapp.com/currentWheather"

const request = {
    method : 'POST',
    headers: {
        'Content-Type': 'application/json'
      }
}

var place = ""

getWheather = async () => {
    
    data = {place : place}
    request.body = JSON.stringify(data)

    const result = await fetch(url, request)
    const wheather = await result.json()

    console.log(wheather)
}


document.querySelector('#button').addEventListener('click', getWheather)