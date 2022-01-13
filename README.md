# build 2022 hackathon

## hey guys I created an easy way to extract the train and test data for whatever ML model you want to construct

Just run:


import train_test_generation
## This returns the whole dataframe
data = train_test_generation.generateDataset(insert number of rows here, 'raw')


## This returns the X and Y for your model
X , Y = train_test_generation.generateDataset(insert number of rows here, 'ML')

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
