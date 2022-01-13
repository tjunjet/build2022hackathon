# build 2022 hackathon

## hey guys I created an easy way to extract the train and test data for whatever ML model you want to construct

Just run:


import train_test_generation
## This returns the whole dataframe
data = train_test_generation.generateDataset(insert number of rows here, 'raw')


## This returns the X and Y for your model
X , Y = train_test_generation.generateDataset(insert number of rows here, 'ML')
