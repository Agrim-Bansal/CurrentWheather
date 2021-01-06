from flask import request, render_template, Flask, abort, redirect
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)


url = "https://weatherteller.vercel.app/"


@app.route('/')
def helloWorld():
    return render_template('hello.html', url=url)


@app.route('/currentWheather', methods = ['GET', 'POST'])
def req():
    if request.method == 'POST' :
        request_json = request.json
        return (getWheatherAt(request_json['place']))

    else :

        return abort(404)



from pyowm import OWM
owm = OWM(environ['OWM_API_KEY'])

mgr = owm.weather_manager()


def getWheatherAt(a : str):
    res = {}
    observation = mgr.weather_at_place(a)
    w = observation.weather
    res["location"] = a
    res["remarks"] = w.detailed_status
    res["wind_speed"] = str(round(float(w.wind(unit='meters_sec')['speed'] * 18/5),2))
    res['humidity'] = w.humidity
    res['temperature'] = w.temperature('celsius')
    res['sunrise'] = w.sunrise_time(timeformat='iso')
    res['sunset'] = w.sunset_time(timeformat='iso')

    url = w.weather_icon_url()
    res['url'] = url[:-4] + '@4x.png'

    return res
