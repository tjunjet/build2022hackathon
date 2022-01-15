#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np
import pandas as pd
import random
import datetime
from sklearn.model_selection import train_test_split



# In[ ]:


#Creating the dataset

#features

"""
Weather features:
1. Temperature (Celcius) (-20 to 25)
2. Humidity (%) (relative) (0 to 100)
3. Probability of Precipitation (%) (0 to 100)
4. Wind speed (mph)
User features:
1. Age (15 to 60)
2. Weight (kg)
3. Sex
4. Height (cm)
5. Fat percentage
6. BMI
"""

#output
"""
output will be in the form of a boolean array with each index presenting different clothing articles
'thermal' : 0, #(both top and bottom)
'hoodie' : 1,
'fleece' : 2,
'wool' : 3,
'light_down' : 4,
'thick_down' : 5,
'wind_breaker' : 6,
'umbrella' : 7,
'winter_boots': 8
"""


# In[ ]:


#smart generator for people's height, weight, age, sex
def peopledatagenerator():
    sex = random.randint(0,1)
    age = random.randint(15, 60)
    #stats from (United states)
    #https://en.wikipedia.org/wiki/Average_human_height_by_country
    #https://en.wikipedia.org/wiki/Human_body_weight
    #male
    if sex == 0:
        height = np.random.normal(loc = 175.3, scale = 6.35)
        weight = np.random.normal(loc = 90.6, scale = 15)
    #female
    else:
        height = np.random.normal(loc = 161.3, scale = 5.59)
        weight = np.random.normal(loc = 77.5, scale = 15)

    # newly added preference factor, could use normal distribution later on to vary it
    preference_factor = random.randint(95,105) # adjustment to cold resistance index
        
    return sex, age, height, weight, preference_factor

peopledatagenerator()

# In[ ]:


#cold resistance calculation
male_weights = {
    'age' : 40,
    'bmi' : 30,
    'fatpercentage' : 30
}


female_weights = {
    'age' : 40,
    'bmi' : 30,
    'fatpercentage' : 30
}

# cold resistance categories:
# low: 0 - 24
# mid-low: 25 - 49
# mid-high: 50 - 74
# high: 75 - 99
cold_resistance_scores = {
    'low' : 25,
    'mid-low' : 50,
    'mid-high' : 75,
    'high' : 100
}


def coldresistance(sex, age, fatpercentage, BMI):
    #female case
    if sex == 1:
        if (age <= 15 or age >= 50):
            #low immunity to cold at younger or older ages
            age_score = cold_resistance_scores['low']
            #mid low immunity between 13 and 25 years old
        elif 16 <= age <= 25:
            age_score = cold_resistance_scores['mid-high']
            #highest immunity between 26 and 40 years old
        elif 26 <= age <= 40:
            age_score = cold_resistance_scores['high']
        else:
            #mid high immunity between 41 and 54 years old
            age_score = cold_resistance_scores['mid-low']

        #fatpercentage ranges referenced from https://www.medicalnewstoday.com/articles/body-fat-percentage-chart#chart

        if (fatpercentage <= 14):
            fatpercentage_score = cold_resistance_scores['low']
        elif (14 < fatpercentage <= 20):
            fatpercentage_score = cold_resistance_scores['mid-low']

        elif (20 < fatpercentage <= 25): 
            fatpercentage_score = cold_resistance_scores['mid-high']

        else:
            fatpercentage_score = cold_resistance_scores['high']

        #severly underweight
        if (BMI <= 15):
            bmi_score = cold_resistance_scores['low']
        #underweight
        elif (15 < BMI <= 18):
            bmi_score = cold_resistance_scores['mid-low']
        #healthy
        elif (18 < BMI <= 25):
            bmi_score = cold_resistance_scores['mid-high']
        #overweight
        else:
            bmi_score = cold_resistance_scores['high']
      
    #men
    else:
        if (age <= 12 or age >= 50):
            #low immunity to cold at younger or older ages
            age_score = cold_resistance_scores['low']
            #mid low immunity between 13 and 25 years old
        elif 16 <= age <= 25:
            age_score = cold_resistance_scores['mid-low']
            #highest immunity between 26 and 40 years old
        elif 26 <= age <= 40:
            age_score = cold_resistance_scores['high']
        else:
            #mid high immunity between 41 and 54 years old
            age_score = cold_resistance_scores['mid-high']

        #fatpercentage ranges referenced from https://www.medicalnewstoday.com/articles/body-fat-percentage-chart#chart

        if (fatpercentage <= 8):
            fatpercentage_score = cold_resistance_scores['low']
        elif (8 < fatpercentage <= 15):
            fatpercentage_score = cold_resistance_scores['mid-low']

        elif (15 < fatpercentage <= 24): 
            fatpercentage_score = cold_resistance_scores['mid-high']

        else:
            fatpercentage_score = cold_resistance_scores['high']

        #severly underweight
        if (BMI <= 15):
            bmi_score = cold_resistance_scores['low']
        #underweight
        elif (15 < BMI <= 18):
            bmi_score = cold_resistance_scores['mid-low']
        #healthy
        elif (18 < BMI <= 25):
            bmi_score = cold_resistance_scores['mid-high']
        #overweight
        else:
            bmi_score = cold_resistance_scores['high']
            
    #female case
    if sex == 1:
        cold_resistance = age_score/100*female_weights['age'] + bmi_score/100*female_weights['bmi'] + fatpercentage_score/100*female_weights['fatpercentage']
    
    #male case
    elif sex == 0:
        cold_resistance = age_score/100*male_weights['age'] + bmi_score/100*male_weights['bmi'] + fatpercentage_score/100*male_weights['fatpercentage']
    
    return cold_resistance


print( coldresistance(1, 13, 30, 21) )
    
# In[ ]:


clothesmap = {
    'thermal' : 0, #(both top and bottom)
    'hoodie' : 1,
    'fleece' : 2,
    'wool' : 3,
    'light_down' : 4,
    'thick_down' : 5,
    'wind_breaker' : 6,
    'umbrella' : 7,
    'winter_boots': 8
    #'scoring_difference' : 9
}

heatmap = {
    'thermal' : 30, #(both top and bottom)
    'hoodie' : 10,
    'fleece' : 20,
    'wool' : 40,
    'light_down' : 50,
    'thick_down' : 60
}


# In[ ]:


def findlowestheatscore(map):
    lowest = 100000
    for i in map:
        if map[i] < lowest:
            lowest = map[i]
    
    return lowest

#temperature range is from -20 to 25
def predictusingheatscore(temperature, cold_resistance, heatmap, windspeed, precipitation):
    #print(temperature)
    prediction = [False] * len(clothesmap.keys())
    
    #wind breaker and umbrella are independent of cold resistance
    if windspeed >= 25:
        prediction[clothesmap['wind_breaker']] = True
    
    if precipitation >= 50:
        prediction[clothesmap['umbrella']] = True
        
    if precipitation >= 50 and temperature <= 5:
        prediction[clothesmap['winter_boots']] = True
    
    #calulation layers required
    lowest_heatscore = findlowestheatscore(heatmap)

    
    #map using linear equation (-20,300) to (25, 0), x is temperature y is insulation needed
    insulation_calculation = -1 * (300/45) * temperature + (-1) * (300/45)* (-25)
    
    insulation_required = insulation_calculation - cold_resistance
    
    if insulation_required < lowest_heatscore:
        #dont need put on any extra layers if insulation required is lower than the lowest_heatscore
        return prediction
    
    else:
        result = []
        
        #we want to get the comparison insulation to classify for too hot too cold later
        comparison_insulation = insulation_required
        
        
        while insulation_required > 0:
            smallest_difference = 100000
            best_cloth = ''
            #hardstop at 5 layers
            if len(result) == 6:
                break
            
            for clothes in heatmap:
                #avoid repeats
                if clothes in result: continue
                difference = abs(insulation_required - heatmap[clothes])
                if difference < smallest_difference:
                    smallest_difference = difference
                    best_cloth = clothes
            
            result.append(best_cloth)
            insulation_required = insulation_required - heatmap[best_cloth]
            
        for ite in result:
            prediction[clothesmap[ite]] = True
            
        

        
        return prediction
        


# In[ ]:


def getdifference(temperature, cold_resistance, heatmap, windspeed, precipitation):
    lowest_heatscore = findlowestheatscore(heatmap)
    #map using linear equation (-20,300) to (25, 0), x is temperature y is insulation needed
    insulation_calculation = -1 * (300/45) * temperature + (-1) * (300/45)* (-25)
    
    insulation_required = insulation_calculation - cold_resistance
    
    if insulation_required < lowest_heatscore:
        #dont need put on any extra layers if insulation required is lower than the lowest_heatscore
        return 0
    else:
        result = []
        #we want to get the comparison insulation to classify for too hot too cold later
        comparison_insulation = insulation_required
        while insulation_required > 0:
            smallest_difference = 100000
            best_cloth = ''
            #hardstop at 5 layers
            if len(result) == 6:
                break
            
            for clothes in heatmap:
                #avoid repeats
                if clothes in result: continue
                difference = abs(insulation_required - heatmap[clothes])
                if difference < smallest_difference:
                    smallest_difference = difference
                    best_cloth = clothes
            
            result.append(best_cloth)
            insulation_required = insulation_required - heatmap[best_cloth]
                
        clothesindex = list(clothesmap.keys())
            
        heatprovidedbyclothes = 0    
        for i in result:
            heatprovidedbyclothes += heatmap[i]
        
        #difference in expectation of insulation required and what is really given
        differenceinexpectation = comparison_insulation - heatprovidedbyclothes
        return differenceinexpectation


# In[ ]:
def getUserFeedback(scoring_difference):
    if scoring_difference < -5:
        return 0 # too hot
    elif scoring_difference > 5:
        return 2 # too hot
    else:
        return 1 # ok
            




#returns the features and output dataframes for ML
def generateSmartDataset(count):

    from datetime import date
    data = []
    currentdate = date.today()
    for i in range(count):
        date = (currentdate - datetime.timedelta(i)).strftime("%d/%m/%Y") #display in day/month/year
        temperature = random.randint(0, 45) - 20
        humidity = random.randint(0, 100)
        precipitation = random.randint(0, 100)
        windspeed = random.randint(0, 40) #mph
        
        
        sex, age, height, weight, preference_factor = peopledatagenerator()

        #fat percentage formula from
        #https://www.gaiam.com/blogs/discover/how-to-calculate-your-ideal-body-fat-percentage

        BMI = weight/(height**2)*10000
        if sex == 0:
            fatpercentage = (1.20 * BMI) + (0.23 * age) - 16.2

        elif sex == 1:
            fatpercentage = (1.20 * BMI) + (0.23 * age) - 5.4

        #adjustment for negative fatpercentage
        if fatpercentage < 0:
            fatpercentage = 1

        datapoint = (date, temperature, humidity, precipitation, windspeed, age, weight, height, sex, fatpercentage, BMI, preference_factor)
        data.append(datapoint)
        
        
    columnstring = 'date,temperature,humidity,precipitation,windspeed,age,weight,height,sex,fatpercentage,bmi,preference_factor'
    column = columnstring.split(',')
    df = pd.DataFrame(data, columns = column)
    
    df['cold_resistance'] = df.apply(lambda row : coldresistance(row['sex'], row['age'], row['fatpercentage'], row['bmi']), axis = 1)
    
    
    
    # newly added adjusted cold resistance
    df['adjusted_cold_resistance'] = (df['cold_resistance'] * (df['preference_factor']/100))
    
    for article in clothesmap:
        df[article] = df.apply(lambda row : predictusingheatscore(row['temperature'], row['adjusted_cold_resistance'], heatmap,row['windspeed'], row['precipitation'])[clothesmap[article]], axis = 1)
    df['scoring_difference'] = df.apply(lambda row : getdifference(row['temperature'], row['adjusted_cold_resistance'], heatmap,                                                              row['windspeed'], row['precipitation']), axis = 1)
 
    # newly added user_feedback
    df['user_feedback'] = df.apply(lambda row : getUserFeedback(row['scoring_difference']), axis = 1)
       
    
    return df
   




#totally random data
def generaterandomDataset(count):
    from datetime import date
    data = []
    currentdate = date.today()
    for i in range(count):
    
    #randomly generated user data
        date = (currentdate - datetime.timedelta(i)).strftime("%d/%m/%Y") #display in day/month/year
        temperature = random.randint(0, 45) - 20
        humidity = random.randint(0, 100)
        precipitation = random.randint(0, 100)
        windspeed = random.randint(0, 40) #mph
        age = random.randint(15, 60)
        weight = random.randint(30, 120) #kg
        height = random.randint(110, 200) #cm
        sex = random.randint(0,1) # 0:M 1:F
        # newly added preference factor, could use normal distribution later on to vary it
        preference_factor = random.randint(95,105) # adjustment to cold resistance index
        
        BMI = weight/(height**2)*10000
        if sex == 0:
            fatpercentage = (1.20 * BMI) + (0.23 * age) - 16.2

        elif sex == 1:
            fatpercentage = (1.20 * BMI) + (0.23 * age) - 5.4

        #adjustment for negative fatpercentage
        if fatpercentage < 0:
            fatpercentage = 1

        datapoint = (date, temperature, humidity, precipitation, windspeed, age, weight, height, sex, fatpercentage, BMI, preference_factor)
        
        data.append(datapoint)
        
        
    columnstring = 'date,temperature,humidity,precipitation,windspeed,age,weight,height,sex,fatpercentage,bmi,preference_factor'
    column = columnstring.split(',')
    df = pd.DataFrame(data, columns = column)
    
    
    df['cold_resistance'] = df.apply(lambda row : coldresistance(row['sex'], row['age'], row['fatpercentage'], row['bmi']), axis = 1)
    
    for article in clothesmap:
        df[article] = -1
        for ite in range(count):
            df[article][ite] = bool(random.getrandbits(1))
    
    # newly added adjusted cold resistance
    df['adjusted_cold_resistance'] = (df['cold_resistance'] * (df['preference_factor']/100))
    
    df['scoring_difference'] = df.apply(lambda row : getdifference(row['temperature'], row['adjusted_cold_resistance'], heatmap,                                                                  row['windspeed'], row['precipitation']), axis = 1)
    
    # newly added user_feedback
    df['user_feedback'] = df.apply(lambda row : getUserFeedback(row['scoring_difference']), axis = 1)
       
    return df
                   




# In[ ]:


def generatefinaldf(count, mode, proportion):

    smartdf = generateSmartDataset(int(count/100*proportion))
    randomdf = generaterandomDataset(int(count/100*(100-proportion)))
    #ans1 = smartdf.size
    #ans2 = randomdf.size
    #print(ans1, ans2)
    #return None
    final_df = pd.concat([smartdf, randomdf], ignore_index=True)
    features = final_df[['temperature', 'humidity', 'precipitation', 'windspeed', 'age', 'weight', 'height', 'sex', 'fatpercentage', 'bmi', 'cold_resistance', 'scoring_difference', 'adjusted_cold_resistance','preference_factor']]
              
    # output = final_df[clothesmap.keys()]
    output = final_df[list(clothesmap.keys()) + ['user_feedback']]
    
    if mode == 'ML':
        return features, output
    else:
        return final_df

# In[ ]:


#df = generatefinaldf(10**5, "das", )


# In[ ]:


#df.head()


# In[ ]:


#df.tail()


# In[ ]:


#features, output = generatefinaldf(10**5, "ML", 95)


# In[ ]:


#features.tail()


# In[ ]:


#output.tail()


# In[ ]: