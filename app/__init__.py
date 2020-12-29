from flask import request, render_template, Flask
from flask_cors import CORS


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
        return {"text" : "Error : Please send POST request"}


from pyowm import OWM
owm = OWM('ba03fa18e8886caf962b3ca43263459b')
mgr = owm.weather_manager()


def getWheatherAt(a : str):
    res = {}
    observation = mgr.weather_at_place(a)
    w = observation.weather
    res["location"] = a
    res["remarks"] = w.detailed_status
    res["wind_speed"] = w.wind()['speed']
    res['humidity'] = w.humidity
    res['temperature'] = w.temperature('celsius')
    res['rain'] = w.rain
    return res

if __name__ == '__main__':
    app.run()
