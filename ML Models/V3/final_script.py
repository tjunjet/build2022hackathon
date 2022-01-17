#!/usr/bin/env python
# coding: utf-8

# In[2]:


import train_test_generation
import pandas as pd
import random
import tensorflow as tf
import numpy as np


# In[3]:


#user data
mydict = {
    'temperature' : 12,
    'humidity' : 20,
    'precipitation' : 60,
    'windSpeed' : 30,
    'age' : 25,
    'weight' : 50.0,
    'height' : 170,
    'sex' : 1,
    'fatpercentage' : 10.0,
    'bmi' : 10.0,
    'clothes' : {
        'thermal' : True, #(both top and bottom)
        'hoodie' : True,
        'fleece' : True,
        'wool' : True,
        'light_down' : True,
        'thick_down' : True,
        'wind_breaker' : False,
        'umbrella' : False,
        'winter_boots': False
    }
}


# In[4]:


clothesmap = {
    'thermal' : 0, #(both top and bottom)
    'hoodie' : 1,
    'fleece' : 2,
    'wool' : 3,
    'light_down' : 4,
    'thick_down' : 5,
}


# In[5]:


def possibleCombinations(mydict, N):
    #array containing all possible N bit strings
    result = []
    for i in range(0, 2**N):
        ans = "{0:0>6b}".format(i)
        result.append(ans)
        
    #key is clothes (9 values) value is True/False
    current_clothes = mydict['clothes']
    
    #conversion
    adapted_clothesList = []
    for article in current_clothes:
        if article in clothesmap:
            if current_clothes[article] == True:
                adapted_clothesList.append(1)
            else:
                adapted_clothesList.append(0)
                
    check = 0
    #filtering
    final_result = []
    for i in range(len(result)):
        check = 0
        #this is a 6 bit string
        possible_combination = result[i]
        
        
        #checks if the possble combination is valid
        for index in range(N):
            #if you dont have and the predicton
            if adapted_clothesList[index] == 0 and int(possible_combination[index]) == 1:
                check = 1
                break
        if check == 1:
            continue
        else:
            data = {}
            for article in clothesmap:
                data[article] = possible_combination[clothesmap[article]]

            final_result.append(data)
        
    
    
    return pd.DataFrame(final_result)
            


# In[ ]:





# In[6]:


#possibleCombinations = possibleCombinations(mydict, 6)
#possibleCombinations


# In[7]:


heatmap = {
    'thermal' : 30, #(both top and bottom)
    'hoodie' : 10,
    'fleece' : 20,
    'wool' : 40,
    'light_down' : 50,
    'thick_down' : 60
}


# In[8]:


def getscoringdifference(temperature, cold_resistance, thermal, hoodie, fleece, wool, light_down, thick_down):
    insulation_calculation = -1 * (300/45) * temperature + (-1) * (300/45)* (-25)
    insulation_required = insulation_calculation - cold_resistance
    heat_provided = 0
    
    if thermal == 1:
        #print('yay')
        heat_provided += heatmap['thermal']
    
    if hoodie == 1:
        heat_provided += heatmap['hoodie']
        
    if fleece == 1:
        heat_provided += heatmap['fleece']
        
    if wool == 1:
        heat_provided += heatmap['wool']
        
    if light_down == 1:
        heat_provided += heatmap['light_down']
        
    if thick_down == 1:
        heat_provided += heatmap['thick_down']
    
    scoring_difference = heat_provided - insulation_required
    
    return scoring_difference


# In[9]:


possible = possibleCombinations(mydict, 6)


# In[10]:


#possible.shape


# In[11]:


def getUserFeedback(scoring_difference):
    if scoring_difference < -5:
        return 0 # too hot
    elif scoring_difference > 5:
        return 2 # too hot
    else:
        return 1 # ok


# In[12]:


def generatefinaldataframe(mydict):
    newdict = {}
    for key in mydict:
        if key != 'clothes':
            newdict[key] = mydict[key]
            
    #print(newdict)
    
    userdataframe = pd.DataFrame(newdict, index = [0])
    #print(userdataframe)
    userdataframe['cold_resistance'] = userdataframe.apply(lambda row : train_test_generation.coldresistance(row['sex'], row['age'], row['fatpercentage'], row['bmi']), axis = 1)
    preference_factor = random.randint(95, 105)
    userdataframe['preference_factor'] = preference_factor
    userdataframe['adjusted_cold_resistance'] = userdataframe['cold_resistance'] * preference_factor/100
    
    duplicated_df = pd.concat([userdataframe] * possible.shape[0], ignore_index = True)
    #print(duplicated_df)
    ans = pd.concat([duplicated_df, possible], axis = 1)
    for _ in heatmap:
        ans[_] = ans[_].astype(int)
    
    ans['scoring_difference_recalibrated'] = ans.apply(lambda row : getscoringdifference(row['temperature'], row['adjusted_cold_resistance'], row['thermal'], row['hoodie'], row['fleece'], row['wool'], row['light_down'], row['thick_down']), axis = 1)
    ans['userfeedback'] = ans.apply(lambda row: getUserFeedback(row['scoring_difference_recalibrated']), axis = 1)
    return ans


# In[13]:


def generatePrediction(mydict):
    ans = generatefinaldataframe(mydict)
    encoder_model = tf.keras.models.load_model("encoder-V2.h5", compile = True)        
    user_params = ['age', 'weight', 'height', 'sex', 'fatpercentage', 'bmi']
    user_data = []
    for param in user_params:
        user_data.append(mydict[param])

    #user_data
    user_data_np = np.array([user_data])
    user_data_np
    encoded_test_data = encoder_model.predict(user_data_np)
    ans["R1"] = encoded_test_data[0][0]
    ans["R2"] = encoded_test_data[0][1]
    ans["R3"] = encoded_test_data[0][2]
    ans["R4"] = encoded_test_data[0][3]
    ann_model = tf.keras.models.load_model("ANN_V6.h5")
    features = ans[['temperature', 'humidity', 'precipitation', 'windSpeed', 'thermal', 'hoodie','fleece', 'wool', 'light_down', 'thick_down', 'R1', 'R2', 'R3','R4']]
    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    X = sc.fit_transform(features)

    suggested_clothing = ann_model.predict(X)
    best_index = -1
    best_score = 10000
    for i in range(len(suggested_clothing)):
        difference = abs(suggested_clothing[i][0])
        if difference < best_score:
            best_score = difference
            best_index = i
            
    prediction = features.iloc[[best_index]]
    result = prediction[['thermal','hoodie', 'fleece', 'wool', 'light_down', 'thick_down']]
    if features['windSpeed'][0] >= 25:
        result['windbreaker'] = 1
    else:
        result['windbreaker'] = 0

    if features['precipitation'][0] >= 50:
        result['umbrella'] = 1
    else:
        result['umbrella'] = 0

    if features['precipitation'][0] >= 50 and features['temperature'][0] <= 5:
        result['winter_boots'] = 1
    else:
        result['winter_boots'] = 0
    intermediate_ans = result.to_dict('list')
    final_prediction = {}
    for _ in intermediate_ans:
        final_prediction[_] = bool(intermediate_ans[_][0])
    return final_prediction


# In[14]:


#generatePrediction(mydict)

