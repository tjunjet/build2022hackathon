## Elevator Pitch
Having trouble deciding how many layers to wear on a cold day? Using deep learning, "The Winter Wear-ther Guide" recommends what to wear by formulating relationships between the weather and you!

## Inspiration
Pittsburgh's weather is really erratic in the winter and deciding what to wear is really tough! As students living in Pittsburgh we really wanted to find out what to wear based on current weather conditions in winter and we came up with this app to do so!

## What it does
Our app the "Winter wear-ther guide" takes in user information such as their age, gender, height, weight and combines it with current weather data to give recommendations on what the user should wear! Our algorithms are based on supervised and unsupervised machine learning techniques such as Artificial Neural Networks and AutoEncoding.

## How we built it
There are 3 steps to our model for our application.

1. We obtain user information from the front end of our application and send them to the backend. The backend will process the information and apply it to our AutoEncoder. Our AutoEncoder will give us a lower-dimensional representation of our data allowing us to obtain the most important parts of our data.

2. We feed the encoded data from our AutoEncoder as well as our weather data into our Artificial Neural Network which will output a recommendation of what to wear based on current weather conditions.

3. The backend will return this recommendation to the frontend which will then be displayed to the user.

## Challenges we ran into

Initially, we wanted to figure out an algorithm that can draw relationships between the user body characteristics, weather data, and user feedback. However, we eventually decided to be enterprising and train a deep learning model to come up with accurate predictions to recommend how many layers to wear for a user. 

The first problem that we faced was obtaining a dataset. As we decided to utilize both unsupervised and supervised deep learning to train our application's model, a large dataset was of utmost importance. This is to ensure that any new user to the app will still have relatively accurate recommendations given, even if it were not personalized. Given the specificity of our project, we were unable to find a dataset online that catered to our needs. Hence, through researching the relationships between human body types, weather, and what people would wear in a specific kind of weather, we wrote an algorithm that could generate the dataset in a smart and reliable manner. We then utilized this dataset to train the neural network as a placeholder before more accurate, real-life data could be obtained should this app eventually be implemented.

Furthermore, it was challenging to figure out what deep learning approach to use. After much debate, research, and thorough analysis of machine learning frameworks, we decided to split our machine learning model into three parts: Firstly, an unsupervised AutoEncoder that would encode the user's data into an embedding. Secondly, integrating the embedding of user data with weather parameters and what users would potentially wear to predict user feedback on the recommendation. Lastly, utilizing Reinforcement Learning to extract real-time data from the user to personalize recommendations toward a particular user.


## Accomplishments that we're proud of
Our first major achievement was coming up with the deep learning framework. It was definitely difficult to think about it from scratch, but after a few trials and errors, thorough research, and (no pun intended) deep learning of different frameworks, we were eventually able to formulate an efficient model that was well-trained.

Our next major achievement was utilizing full-stack development to launch an entire, working application. As neither of us had major experience in app development, it was really heartwarming to see our application still being able to come to life even only with 1 week of learning and implementation. This shows the immense hard work and dedication that the members of this group had been willing to put in to learn things they have never tried before, which portrays the most important factor of joining any hackathon - the joy of learning.

## What we learned
Even though the application may not have turned out the way we expected, many of us were exposed to new things during this hackathon. 

For example, most of us have had experience with full-stack development and machine learning before this hackathon. Instead of choosing a project of our area of expertise, we decided to try out something new in order to gain the most out of this hackathon - this is because at the end of the day, the biggest prize one can takeaway from any hackathon is a new skill. 

Some of the things that we learned during this hackathon: 
- New programming languages: HTML, CSS, Javascript, Python
- Front-End Development using React.js
- Back-End Development using FastAPI
- Database analysis using MongoDB
- Deep Learning Frameworks: AutoEncoder for unsupervised learning, Artificial Neural Network for supervised learning, Deep Q-Learning framework for Reinforcement learning.

## What's next for "The Winter Wear-ther Guide"

The hackathon may be over, but "The Winter Wear-ther Guide" is far from giving up. We intend to carry on this project even after the hackathon is over. Here are a few things to develop:

1. A more well-designed and interactive user interface. 
2. Learning how to implement the application for mobile. 
3. Adding real-time user data to train our Deep Reinforcement Learning framework to personalize recommendations. 





























