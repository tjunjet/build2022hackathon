## Inspiration
Pittsburgh's weather is really erratic in the winter and deciding what to wear is relly tough! As students living in Pittsburgh we really wanted to find out what to wear based on current weather conditions in winter and we came up with this app to do so!

## What it does
Our app the "Winter wear-ther guide" takes in user information such as their age, gender, height, weight and combines it with current weather data to give recommendations on what the user should wear! Our algorithms are based on supervised and unsupervised machine learning techniques such as Artificial Neural Networks and AutoEncoding.

## How we built it
There are 3 steps to our model for our application.

1. We obtain user information from the front end of our application and send them to the backend. The backend will process the information and apply it to our AutoEncoder. Our AutoEncoder will give us a lower-dimensional representation of our data allowing us to obtain the most important parts of our data.

2. We feed the encoded data from our AutoEncoder as well as our weather data into our Artificial Neural Network which will output a recommendation of what to wear based on current weather conditions.

3. The backend will return this recommendation to the frontend which will then be displayed to the user.

## Challenges we ran into


## Accomplishments that we're proud of

## What we learned

## What's next for Untitled































# build 2022 hackathon

## hey guys I created an easy way to extract the train and test data for whatever ML model you want to construct

Just run:


import train_test_generation
## This returns the whole dataframe
data = train_test_generation.generatefinaldf(insert number of rows here, 'raw', proportion of data u want to be smart generated as an int (percentage))


## This returns the X and Y for your model
X , Y = train_test_generation.generatefinaldf(insert number of rows here, 'ML', proportion of data u want to be smart generated as an int (percentage))

Note: 

Columns in X: ['temperature', 'humidity', 'precipitation', 'windspeed', 'age', 'weight', 'height', 'sex', 'fatpercentage', 'bmi', 'cold_resistance' ]

Columns in Y:     
    'thermal' 
    'hoodie'
    'fleece'
    'wool'
    'light_down' 
    'thick_down'
    'wind_breaker'
    'umbrella'
    'winter_boots'

Be sure to check the dataframe u get and index what u want or dont want accordingly
