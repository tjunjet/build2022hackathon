import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import './bootstrap-5.1.3-dist/css/bootstrap.min.css';
import './index.css';
import { NewGarmentForm } from './components/NewGarmentForm'
import { Introduction } from './components/Introduction'
import { WeatherReport } from './components/WeatherReport'
import { GarmentsList } from './components/GarmentsList'
import { MenuBar } from './components/MenuBar'
import { PersonalDetailsForm } from './components/PersonalDetailsForm'
import { WhatToWear } from './components/WhatToWear'

/*
const garmentTypes = Array(
    {name: "T Shirt",               value: "tshirt"},
    {name: "Thermals",              value: "thermals"},
    {name: "Fleece Jacket",         value: "fleeceJacket"},
    {name: "Down Jacket",           value: "downJacket"},
    {name: "Windbreaker Shell",     value: "windbreakerShell"},
);
*/

const garmentTypes = Array(
    {name: "Thermal Underwear",     value: "thermal"},
    {name: "Hoodie",                value: "hoodie"},
    {name: "Fleece Jacket",         value: "fleece"},
    {name: "Wool Sweater",          value: "wool"},
    {name: "Light Down Jacket",     value: "light_down"},
    {name: "Thick Down Jacket",     value: "thick_down"},
    {name: "Windbreaker Shell",     value: "wind_breaker"},
    {name: "Umbrella",              value: "umbrella"},
    {name: "Winter Boots",          value: "winter_boots"},
);

const urls = {
    // ...?lat={lat}&lon={lon}&appid={API key}
    openWeatherMap1: "http://api.openweathermap.org/data/2.5/onecall", //One Call API, for getting all data except...
    openWeatherMap2: "http://api.openweathermap.org/data/2.5/weather", //Regular API, for getting city name
};

const apiKeys = {
    openWeatherMap: "779894551edc39fd557720eea876ce84",
};

const backendEndpoints = {
    postPersonalDetails: "http://locahost:8000/create-particulars",
    postWeatherData: "http://locahost:8000/create-weather-data",
    postAddGarment: "http://locahost:8000/create-clothing",
    postRemoveGarment: "http://locahost:8000/delete-clothing-by-id",
    postFeedback: "http://locahost:8000/save-user-feedback",
    getRecommendations: "http://locahost:8000/predict-clothing-set",
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: Array(), //Save clothes as an array of objects
            recommendedClothes: Array(),
            nextGarmentID: 1,
            garmentTypes: garmentTypes,
            urls: urls,
            apiKeys: apiKeys,
            backendEndpoints: backendEndpoints,
            location: {
                latitude: null,
                longitude: null,
                city: "Unknown",
            },
            weatherRawData: {
                openWeatherMap1: null,
                openWeatherMap2: null,
            },
            weather: {
                temp: null,
                tempMin: null,
                tempMax: null,
                tempFeelsLike: null,
                humidity: null,
                windSpeed: null,
                conditionID: null,
                conditionMain: null,
                conditionDesc: null,
                precipitationProb: null,
            },
            userDetails: {
                sex: "default",
                age: "",
                height: "",
                weight: "",
                bmi: "",
                bodyFatPercentage: "",
                coldTolerance: "default",
            },
            defaultUserDetails: {
                sex: 1,
                age: 25,
                height: 175,
                weight: 75,
                bmi: 24.5,
                bodyFatPercentage: 20,
            },
            initialStartedUp: false,
        };
    }
    
// --------------------
// UPDATE STATE FROM USER INPUT
// --------------------

    // Add to list of available clothes
    addGarment(customName, garmentType) {
        const clothes = this.state.clothes;
        clothes.push({
            customName: customName,
            garmentType: garmentType,
            id: this.state.nextGarmentID,
        });
        const addedID = this.state.nextGarmentID;
        this.setState({
            clothes: clothes,
            nextGarmentID: (this.state.nextGarmentID + 1),
        });
        this.postAddGarment(addedID, customName, garmentType);
    }
    
    // Remove from list of available clothes
    removeGarment(id) {
        console.log("removeGarment called on " + id)
        const clothes = this.state.clothes.filter((item) => {return item.id !== id;});
        this.setState({
            clothes: clothes,
        });
        this.postRemoveGarment(id);
    }

    // Update personal details upon Personal Details form submission
    submitPersonalDetails(sex, age, height, weight, bodyFatPercentage, coldTolerance) {
        const bmi = weight / ((height/100) ** 2);
        const userDetails = {
            sex: sex,
            age: age,
            height: height,
            weight: weight,
            bmi: bmi,
            bodyFatPercentage: bodyFatPercentage,
            coldTolerance: coldTolerance,
        }
        this.setState(
            {
                userDetails: userDetails,
            }, 
            // BUG FIXED (One-press delay): .setState is asynchronous
            // SOLUTION: Put function to be called after .setState is done as the optional 2nd parameter in .setState
            this.postPersonalDetails
        );
        // TO DO: Validate responses; convert to correct data types; set default values if necessary
    }

// --------------------
// UPDATE STATE FROM BACKEND DATA
// --------------------

    // Update this.state.recommendedClothes (an array) based on backend-provided recommendations
    // For each clothing type recommended by backend, recommended a clothing piece, prioritizing those with custom names
    updateRecommendedClothes(response) {
        /*
        response is in the format:
        Object {
            "thermal": true/false,
            "fleece": true/false,
            ...
        }
        this.state.clothes is in the format:
        Array {
            {
                customName: ...
                garmentType: ...
                id: ...
            }
            ...
        }
        this.state.recommendedClothes should also be in the format:
        Array {
            {
                customName: ...
                garmentType: ...
            }
            ...
        }
        */
        const recommendedClothes = Array();
        // Loop through all possible garment types
        var type = false;
        for (var i in this.state.garmentTypes) {
            type = this.state.garmentTypes[i].value;
            // If the garment type is recommended to wear
            if (response[type] === true) {
                var customName = "";
                var garmentType = type;
                var id = "";
                var found = false;
                // Loop through wardrobe to find a clothing with the given type
                for (var j in this.state.clothes) {
                    // Clothing is of the given type
                    if (this.state.clothes[j].garmentType === type) {
                        found = true;
                        // Clothing has a custom name
                        if (this.state.clothes[j].customName !== "") {
                            customName = this.state.clothes[j].customName;
                            id = this.state.clothes[j].id;
                        // Clothing has no custom name, and garmentToWear does not have a custom name yet
                        } else if (customName === "") {
                            id = this.state.clothes[j].id;
                        }

                    }
                }
                if (found === true) {
                    recommendedClothes.push({
                        customName: customName,
                        garmentType: garmentType,
                        id: id,
                    });
                }
            }
        }
        console.log("recommended:")
        console.log(recommendedClothes);
        // TO DO: Set state with recommended clothes
    }

// --------------------
// GET LOCATION & WEATHER DATA
// --------------------

    //Wrapper function to get new location and weather data
    //(.getLocation() calls .getWeather() upon successful data received)
    refreshLocationAndWeather() {
        this.getLocation();
    }

    //Get geolocation data
    getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                //position.coords.latitude, position.coords.longitude
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                });
                console.log("Coordinates of user obtained with Geolocation");
                this.getWeather();
            });
        } else {
            console.log("Geolocation is not available (check browser permissions?)")
        }
        return "hello";
    }

    //Get weather data
    getWeather() {
        if ((this.state.location.longitude) && (this.state.location.latitude)) {
            //1. Get data from openWeatherMap One Call API
            const url1 = this.state.urls.openWeatherMap1;
            axios.get(url1, {
                params: {
                    lat: this.state.location.latitude,
                    lon: this.state.location.longitude,
                    appid: this.state.apiKeys.openWeatherMap,
                    units: "metric",
                },
            })
            .then((response) => {
                //Save raw data (JSON) into state, then call parser function
                this.state.weatherRawData.openWeatherMap1 = response;
                this.parseOpenWeatherMapData1();
                console.log("Received data from 1st weather API - openWeatherMap One Call API");
            })
            .catch((error) => {
                console.log(error);
            });
            //2. Get data (city name) from openWeatherMap regular API
            const url2 = this.state.urls.openWeatherMap2;
            axios.get(url2, {
                params: {
                    lat: this.state.location.latitude,
                    lon: this.state.location.longitude,
                    appid: this.state.apiKeys.openWeatherMap,
                    units: "metric",
                },
            })
            .then((response) => {
                //Save raw data (JSON) into state, then call parser function
                this.state.weatherRawData.openWeatherMap2 = response;
                this.parseOpenWeatherMapData2();
                console.log("Received data from 2nd weather API - openWeatherMap regular API");
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    //Parse data from first API call (openWeatherMap One Call API)
    parseOpenWeatherMapData1() {
        //Data from first API call (openWeatherMap One Call API)
        const response1 = this.state.weatherRawData.openWeatherMap1;
        const temp = Math.round(response1.data.current.temp);
        const tempMin = Math.round(response1.data.daily[0].temp.min);
        const tempMax = Math.round(response1.data.daily[0].temp.max);
        const tempFeelsLike = response1.data.current.feels_like;
        const humidity = response1.data.current.humidity;
        const windSpeed = Math.round(2.23694 * response1.data.current.wind_speed);
        const conditionID = response1.data.daily[0].weather[0].id;
        const conditionMain = response1.data.daily[0].weather[0].main;
        const conditionDesc = response1.data.daily[0].weather[0].description;
        const precipitationProb = response1.data.daily[0].pop;
        //Store data into temporary "weather" object
        const weather = {
            temp: temp,
            tempMin: tempMin,
            tempMax: tempMax,
            tempFeelsLike: tempFeelsLike,
            humidity: humidity,
            windSpeed: windSpeed,
            conditionID: conditionID,
            conditionMain: conditionMain,
            conditionDesc: conditionDesc,
            precipitationProb: precipitationProb,
        };
        //Update state
        this.setState(
            {
                weather: weather,
            },
            this.postWeatherData
        );
    }

    //Parse data from second API call (openWeatherMap regular API)
    parseOpenWeatherMapData2() {
        //Data from second API call (openWeatherMap regular API)
        const response2 = this.state.weatherRawData.openWeatherMap2;
        const city = response2.data.name;
        //Store data into temporary "location" object
        const location = Object.assign({}, this.state.location);
        location.city = city;
        //Update state
        this.setState({
            location: location,
        });
    }

// --------------------
// BACKEND API REQUESTS
// --------------------

    // Make POST request to backend API for submitting weather data
    postWeatherData() {
        // Generate date in format yyyy-mm-dd-hh-mm-ss
        const currentDateAndTime = new Date();
        const year      = String(currentDateAndTime.getFullYear());
        const month     = String(currentDateAndTime.getMonth() + 1);
        const day       = String(currentDateAndTime.getDate());
        const hour      = String(currentDateAndTime.getHours());
        const minute    = String(currentDateAndTime.getMinutes());
        const second    = String(currentDateAndTime.getSeconds());
        const date = year + "-" + month + "-" + day + "-" + hour + "-" + minute + "-" + second;
        const temperature = parseFloat(this.state.weather.temp);
        const humidity = parseInt(this.state.weather.humidity);
        const precipitation = parseInt(this.state.weather.precipitationProb);
        const windspeed = parseInt(this.state.weather.windSpeed);
        const data = {
            "date": date,
            "temperature": temperature,
            "humidity": humidity,
            "precipitation": precipitation,
            "windspeed": windspeed,
        };
        console.log("Posting Weather data:");
        console.log(data);
        axios.post(
            this.state.backendEndpoints.postWeatherData, 
            data
        )
        .then((response) => {
            console.log("Weather data posted");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Make POST request to backend API for submitting personal details
    postPersonalDetails() {
        // Convert to backend-ready formats (TO DO: place code somewhere else)
        // 1. Age
        var age = this.state.defaultUserDetails.age;
        if (this.state.userDetails.age !== "") {
            age = parseInt(this.state.userDetails.age);
        }
        // 2. Weight
        var weight = this.state.defaultUserDetails.weight;
        if (this.state.userDetails.weight !== "") {
            weight = parseFloat(this.state.userDetails.weight);
        }
        // 3. Height
        var height = this.state.defaultUserDetails.height;
        if (this.state.userDetails.height !== "") {
             height = parseFloat(this.state.userDetails.height);
        }
        // 4. Sex
        var sex = this.state.defaultUserDetails.sex;
        if (this.state.userDetails.sex !== "default") {
            if (this.state.userDetails.sex === "m") {
                const sex = 1;
            } else {
                const sex = 0
            }
        }
        // 5. BMI (calculated)
        var bmi = this.state.defaultUserDetails.bmi;
        if (this.state.userDetails.bmi !== NaN) {
            bmi = parseFloat(weight / ((height/100) ** 2));
        }
        // 6. Fat Percentage (calculated)
        var fatpercentage = 0;
        if (sex === 1) {
            fatpercentage = parseInt((1.2 * bmi) + (0.23 * age) - 5.4);
        } else {
            fatpercentage = parseInt((1.2 * bmi) + (0.23 * age) - 16.2);
        }
        if (fatpercentage < 0) {
            fatpercentage = 1;
        }
        // JSON data prepared for posting
        const data = {
            "age": age,
            "weight": weight,
            "height": height,
            "sex": sex,
            "bmi": bmi,
            "fatpercentage": fatpercentage,
        };
        console.log("Posting Personal Details data:");
        console.log(data);
        axios.post(
            this.state.backendEndpoints.postPersonalDetails, 
            data
        )
        .then((response) => {
            console.log("Personal Details data posted");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Make POST request to backend API for adding a garment
    postAddGarment(addedID, customName, garmentType) {
        const data = {
            "clothing_id": addedID,
            "name": customName,
            "category": garmentType,
        };
        console.log("Posting Add Garment data:");
        console.log(data);
        axios.post(
            this.state.backendEndpoints.postAddGarment, 
            data
        )
        .then((response) => {
            console.log("Add Garment data posted");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Make POST request to backend API for adding a garment
    postRemoveGarment(id) {
        const data = {
            "clothing-id": id,
        };
        console.log("Posting Remove Garment data:");
        console.log(data);
        axios.post(
            this.state.backendEndpoints.postRemoveGarment, 
            data
        )
        .then((response) => {
            console.log("Remove Garment data posted");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Make GET request to backend API for getting clothing recommendations
    getRecommendations() {
        const temperature = parseFloat(this.state.weather.temp);
        const humidity = parseInt(this.state.weather.humidity);
        const precipitation = parseInt(this.state.weather.precipitationProb);
        const windspeed = parseInt(this.state.weather.windSpeed);
        // 1. Age
        var age = this.state.defaultUserDetails.age;
        if (this.state.userDetails.age !== "") {
            age = parseInt(this.state.userDetails.age);
        }
        // 2. Weight
        var weight = this.state.defaultUserDetails.weight;
        if (this.state.userDetails.weight !== "") {
            weight = parseFloat(this.state.userDetails.weight);
        }
        // 3. Height
        var height = this.state.defaultUserDetails.height;
        if (this.state.userDetails.height !== "") {
             height = parseFloat(this.state.userDetails.height);
        }
        // 4. Sex
        var sex = this.state.defaultUserDetails.sex;
        if (this.state.userDetails.sex !== "default") {
            if (this.state.userDetails.sex === "m") {
                const sex = 1;
            } else {
                const sex = 0
            }
        }
        // 5. BMI (calculated)
        var bmi = this.state.defaultUserDetails.bmi;
        console.log(this.state.userDetails.bmi);
        if (this.state.userDetails.bmi !== "") {
            bmi = parseFloat(weight / ((height/100) ** 2));
        }
        // 6. Fat Percentage (calculated)
        var fatpercentage = 0;
        if (sex === 1) {
            fatpercentage = parseInt((1.2 * bmi) + (0.23 * age) - 5.4);
        } else {
            fatpercentage = parseInt((1.2 * bmi) + (0.23 * age) - 16.2);
        }
        if (fatpercentage < 0) {
            fatpercentage = 1;
        }
        // Clothes
        const clothes = new Object();
        for (var i in this.state.garmentTypes) {
            clothes[this.state.garmentTypes[i].value] = false;
        }
        for (var j in this.state.clothes) {
            clothes[this.state.clothes[j].garmentType] = true;
        }
        const params = {
            "temperature": temperature,
            "humidity": humidity,
            "precipitation": precipitation,
            "windspeed": windspeed,
            "age": age,
            "weight": weight,
            "height": height,
            "sex": sex,
            "fatpercentage": fatpercentage,
            "bmi": bmi,
            "clothes": clothes,
        };
        console.log("Sending GET request for recommendations; parameters:");
        console.log(params);
        axios.get(
            this.state.backendEndpoints.getRecommendations,
            {
                params: params,
            }
        )
        .then((response) => {
            console.log("Recommendations received:")
            console.log(response);
            // this.updateRecommendedClothes(response);
        })
        .catch((error) => {
            console.log(error);
        });

        // TESTING WITH PLACEHOLDER RESPONSE
        const placeholderResponse = {
            "thermal": true,
            "hoodie": true,
            "fleece": false,
            "wool": false,
            "light_down": false,
            "thick_down": false,
            "wind_breaker": true,
            "umbrella": false,
            "winter_boots": false,
        }
        this.updateRecommendedClothes(placeholderResponse);
    }

// --------------------
// RENDER
// --------------------

    render() {
        //Run code on initial load of app
        if (! this.state.initialStartedUp) {
            console.log("App initial load up. Getting location and weather data");
            this.refreshLocationAndWeather();
            this.state.initialStartedUp = true;
        }

        return (
            <div className="app ">
                <MenuBar />
                <div className="row justify-content-center">
                    <div className="col-8">
                        {/*Page content inside here*/}
                        <Introduction />
                        <div className="row">
                            <div className="col-md-6">
                                {/*Left column*/}
                                <WhatToWear 
                                    onSubmit={() => this.getRecommendations()}
                                />
                                <GarmentsList 
                                    currentGarments={this.state.clothes} 
                                    onRemoveGarment={(id) => this.removeGarment(id)}
                                    garmentTypes={this.state.garmentTypes}
                                />
                            </div>
                            <div className="col-md-6">
                                {/*Right column*/}
                                <WeatherReport 
                                    weather={this.state.weather}
                                    location={this.state.location}
                                    onSubmit={() => this.refreshLocationAndWeather()}
                                />
                                <PersonalDetailsForm 
                                    onSubmit={(sex, age, height, weight, bodyFatPercentage, coldTolerance) => 
                                        this.submitPersonalDetails(sex, age, height, weight, bodyFatPercentage, coldTolerance)
                                    }
                                />
                                <NewGarmentForm 
                                    onSubmit={(customName, garmentType) => this.addGarment(customName, garmentType)}
                                    garmentTypes={this.state.garmentTypes}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// --------------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
);