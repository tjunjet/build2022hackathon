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

const garmentTypes = Array(
    {name: "T Shirt",               value: "tshirt"},
    {name: "Thermals",              value: "thermals"},
    {name: "Fleece Jacket",         value: "fleeceJacket"},
    {name: "Down Jacket",           value: "downJacket"},
    {name: "Windbreaker Shell",     value: "windbreakerShell"},
);

const urls = {
    // ...?lat={lat}&lon={lon}&appid={API key}
    openWeatherMap1: "http://api.openweathermap.org/data/2.5/onecall", //One Call API, for getting all data except...
    openWeatherMap2: "http://api.openweathermap.org/data/2.5/weather", //Regular API, for getting city name
};

const apiKeys = {
    openWeatherMap: "779894551edc39fd557720eea876ce84",
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: Array(), //Save clothes as an array of objects
            nextGarmentID: 1,
            garmentTypes: garmentTypes,
            urls: urls,
            apiKeys: apiKeys,
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
                sex: null,
                age: null,
                height: null,
                weight: null,
                bmi: null,
                bodyFatPercentage: null,
                coldTolerance: null,
            },
            initialStartedUp: false,
        };
    }
    
    // Add to list of available clothes
    addGarment(customName, garmentType) {
        const clothes = this.state.clothes;
        clothes.push({
            customName: customName,
            garmentType: garmentType,
            id: this.state.nextGarmentID,
        });
        this.setState({
            clothes: clothes,
            nextGarmentID: (this.state.nextGarmentID + 1),
        });
    }
    
    // Remove from list of available clothes
    removeGarment(id) {
        console.log("removeGarment called on " + id)
        const clothes = this.state.clothes.filter((item) => {return item.id !== id;});
        this.setState({
            clothes: clothes,
        });
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
        this.setState({
            userDetails: userDetails,
        });
        console.log(this.state.userDetails);
        // TO DO: Validate responses; convert to correct data types; set default values if necessary
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
                console.log("1st call to openWeatherMap One Call API");
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
                console.log("2nd call to openWeatherMap regular API");
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
        this.setState({
            weather: weather,
        });
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

    //Wrapper function to get new location and weather data
    //(.getLocation() calls .getWeather() upon successful data received)
    refreshLocationAndWeather() {
        this.getLocation();
    }

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
                                <WhatToWear />
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