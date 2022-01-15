#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#https://www.geeksforgeeks.org/python-find-current-weather-of-any-city-using-openweathermap-api/
import requests
import json


# In[ ]:


#https://pretagteam.com/question/how-to-get-current-latitude-and-longitude-in-python
import geocoder


# In[ ]:


#takes in api key and connects to openweather api to draw
#fields that we want
#current.temp (celcius)
#current.humidity %
#current.wind_speed (meter/sec)
#hourly.pop (probability of precipitation)

from datetime import date
    
def gettemperaturedata(api):
    g = geocoder.ip('me')
    lat, lon = g.latlng[0], g.latlng[1]
    api_key = api
    complete_url = f"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=metric&exclude=minutely,daily&appid={api_key}"
    response = requests.get(complete_url)    
    data = response.json()
    if len(data) < 3:
        return 'ERROR'
    result = {
        'date' : '20' + date.today().strftime("%y-%m-%d"),
        'temperature' : data['current']['temp'],
        'humidity' : data['current']['humidity'], 
        'precipitation' : data['hourly'][-1]['pop'],
        'windspeed' : data['current']['wind_speed'] * 2.237 #in mph

    }

    return result


# In[ ]:


#result = gettemperaturedata("eb11283d82ed8ad579eca6904e3a6712")


# In[ ]:


#result


# In[ ]:




