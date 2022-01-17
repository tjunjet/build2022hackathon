#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import requests
import json
import geocoder
import today_weather
import pandas as pd
import random
import train_test_generation


# In[ ]:


historical_weather_data_api_key = 'e873e86301b849268257b3b949de85b4'


# In[ ]:


#today_data = today_weather.gettemperaturedata("eb11283d82ed8ad579eca6904e3a6712")
    


# In[ ]:


#today_data 


# In[ ]:


#YYYY-MM-DD
from datetime import date
import datetime
def gethistorical(api, period):
    today_data = today_weather.gettemperaturedata("eb11283d82ed8ad579eca6904e3a6712")
    g = geocoder.ip('me')
    lat, lon = g.latlng[0], g.latlng[1]
    api_key = api
    end = '20' + date.today().strftime("%y-%m-%d")
    start = '20' + (date.today() - datetime.timedelta(period)).strftime("%y-%m-%d")
    complete_url = f'https://api.weatherbit.io/v2.0/history/daily?lat={lat}&lon={lon}&start_date={start}&end_date={end}&key={api}'
    response = requests.get(complete_url)    
    data = response.json()
    final_data = [today_data]
    for day in data['data']:
        result = {
            'date' : day['datetime'], #Date (YYYY-MM-DD)
            'temperature' : day['temp'], #average daily temp in celcius
            'humidity' : day['rh'], 
            'precipitation' : random.randint(0,100), #Note we randomize this because we cant really get a prediction
                                                     # from historical data
            'windspeed' : day['wind_spd'] * 2.237 #in mph
        }
        final_data.append(result)

    return final_data


# In[ ]:


#'20' + (date.today() - datetime.timedelta(3000)).strftime("%y-%m-%d")


# In[ ]:





# In[ ]:


#weather_data = gethistorical(historical_weather_data_api_key, 365)


# In[ ]:


#weather_data


# In[ ]:


#weather_df = pd.DataFrame(weather_data)


# In[ ]:


#weather_df


# In[ ]:


def userDataframe(sex, age, height, weight, preference_factor):
        BMI = weight/(height**2)*10000
        #male
        if sex == 0:
            fatpercentage = (1.20 * BMI) + (0.23 * age) - 16.2

        elif sex == 1:
            fatpercentage = (1.20 * BMI) + (0.23 * age) - 5.4

        #adjustment for negative fatpercentage
        if fatpercentage < 0:
            fatpercentage = 1
            
        cold_resistance = train_test_generation.coldresistance(sex, age, fatpercentage, BMI)
        
        df = pd.DataFrame([[sex, age, height, weight, preference_factor, fatpercentage, BMI, cold_resistance]], columns = ['sex', 'age', 'height', 'weight', 'preference_factor', 'fatpercentage', 'BMI', 'cold_resistance'])
        df['adjusted_cold_resistance'] = (df['cold_resistance'] * (df['preference_factor']/100))
        return df


# In[ ]:


def returnFinalDataframe(sex, age, height, weight, preference_factor, api, period):
    weatherdata = gethistorical(api, period)
    weather_df = weather_df = pd.DataFrame(weather_data)
    
    user_df = userDataframe(sex, age, height, weight, preference_factor)
    
    duplicated_df = pd.concat([user_df] * weather_df.shape[0], ignore_index = True)
    
    combined_df = pd.concat([duplicated_df, weather_df], axis = 1)
    
    for article in train_test_generation.clothesmap:
        combined_df[article] = combined_df.apply(lambda row : train_test_generation.predictusingheatscore(row['temperature'], row['adjusted_cold_resistance'], train_test_generation.heatmap,row['windspeed'], row['precipitation'])[train_test_generation.clothesmap[article]], axis = 1)
    combined_df['scoring_difference'] = combined_df.apply(lambda row : train_test_generation.getdifference(row['temperature'], row['adjusted_cold_resistance'], train_test_generation.heatmap, row['windspeed'], row['precipitation']), axis = 1)
    # newly added user_feedback
    combined_df['user_feedback'] = combined_df.apply(lambda row : train_test_generation.getUserFeedback(row['scoring_difference']), axis = 1)
    return combined_df


# In[ ]:


#dataf = returnFinalDataframe(0,25, 170, 57, 95, 'e873e86301b849268257b3b949de85b4', 365)


# In[ ]:


#dataf.head()


# In[ ]:


#dataf


# In[ ]:




