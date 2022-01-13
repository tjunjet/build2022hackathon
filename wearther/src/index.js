import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './bootstrap-5.1.3-dist/css/bootstrap.min.css';
import './index.css';
import { NewGarmentForm } from './components/NewGarmentForm'
import { Introduction } from './components/Introduction'
import { WeatherReport } from './components/WeatherReport'
import { GarmentsList } from './components/GarmentsList'

const garmentTypes = Array(
    {name: "T Shirt",               value: "tshirt"},
    {name: "Thermals",              value: "thermals"},
    {name: "Fleece Jacket",         value: "fleeceJacket"},
    {name: "Down Jacket",           value: "downJacket"},
    {name: "Windbreaker Shell",     value: "windbreakerShell"},
);

const urls = {
    // ...?lat={lat}&lon={lon}&appid={API key}
    openWeatherMapAPI: "http://api.openweathermap.org/data/2.5/weather",
};

const apiKeys = {
    openWeatherMapAPI: "779894551edc39fd557720eea876ce84",
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
                city: null,
            },
            weatherRawData: {
                openWeatherMapAPI: null,
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
            },
        };
    }
    
    // Adding to & removing from list of available clothes
    /*
    Send JSON data to backend via fetch(): 
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    (refer to Uploading JSON data section)
    */
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
    removeGarment(id) {
        console.log("removeGarment called on " + id)
        const clothes = this.state.clothes.filter((item) => {return item.id !== id;});
        this.setState({
            clothes: clothes,
        });
    }

    //Testing HTTP request with Axios
    getTestData() {
        const url = 'https://api.weather.gov/points/39.7456,-97.0892';
        axios.get(url).then((response) => {console.log(response)}); 
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
            });
        } else {
            console.log("Geolocation is not available (check browser permissions?)")
        }
        return "hello";
    }

    //Get weather data
    getWeather() {
        if ((this.state.location.longitude) && (this.state.location.latitude)) {
            //1. Try openWeatherMap
            const url = this.state.urls.openWeatherMapAPI;
            axios.get(url, {
                params: {
                    lat: this.state.location.latitude,
                    lon: this.state.location.longitude,
                    appid: this.state.apiKeys.openWeatherMapAPI,
                    units: "metric",
                },
            })
            .then((response) => {
                //Save raw data (JSON) into state, then call parser function
                this.state.weatherRawData.openWeatherMapAPI = response;
                this.parseOpenWeatherMapData();
                return;
            })
            .catch((error) => {
                console.log(error);
            });
            //2. Try weather.gov
            //TO DO
        }
    }

    //Parse data from openWeatherMap
    parseOpenWeatherMapData() {
        const response = this.state.weatherRawData.openWeatherMapAPI;
        const temp = response.data.main.temp;
        const tempMin = response.data.main.temp_min;
        const tempMax = response.data.main.temp_max;
        const tempFeelsLike = response.data.main.feels_like;
        const humidity = response.data.main.humidity;
        const windSpeed = response.data.wind.speed;
        const conditionID = response.data.weather[0].id;
        const conditionMain = response.data.weather[0].main;
        const conditionDesc = response.data.weather[0].description;
        const city = response.data.name;
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
        };
        const location = Object.assign({}, this.state.location);
        location.city = city;
        this.setState({
            weather: weather,
            location: location,
        });


        console.log(this.state.location.city); // TO DO
    }

    refreshLocationAndWeather() {
        this.getLocation();
        this.getWeather();
    }

    render() {
        //Test
        //this.getTestData();

        //Test
        this.getLocation();

        //Test
        //this.getWeather();

        return (
            <div className="app ">
                <div className="container">
                    <h1 className="page-header">The Winter Wear-ther Guide</h1>
                </div>
                <Introduction />
                <WeatherReport 
                    weather={this.state.weather}
                    location={this.state.location}
                    onSubmit={() => this.refreshLocationAndWeather()}
                />
                <NewGarmentForm 
                    onSubmit={(customName, garmentType) => this.addGarment(customName, garmentType)}
                    garmentTypes={this.state.garmentTypes}
                />
                <GarmentsList currentGarments={this.state.clothes} onRemoveGarment={(id) => this.removeGarment(id)}/>

                
            </div>
        );
    }
}

// --------------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
);