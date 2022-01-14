import React from 'react';
import ReactDOM from 'react-dom';

class LocationValue extends React.Component {
    render() {
        if (this.props.latitude !== null && this.props.longitude !== null) {
            return(
                <span>
                    {this.props.city} <span className="text-muted">({this.props.latitude}, {this.props.longitude})</span>
                </span>
            );
        } else {
            return(
                <span>
                    {this.props.city}
                </span>
            );
        }
    }
}
class TemperatureValue extends React.Component {
    render() {
        if (this.props.temp !== null && this.props.tempMin !== null && this.props.tempMax !== null) {
            return(
                <span>
                    {this.props.temp} &deg;C <span className="text-muted">({this.props.tempMin} - {this.props.tempMax})</span>
                </span>
            );
        } else if (this.props.temp !== null) {
            return(
                <span>
                    {this.props.temp} &deg;C
                </span>
            );
        } else {
            return(
                null
            );
        }
    }
}

export class WeatherReport extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }
    render() {
        return (
            <div className="weatherReport container border pt-2 pb-3">
                <h2>
                    Local Weather
                </h2>
                <ul className="list-unstyled">
                    <li>
                        <b>Location: </b>
                        <LocationValue 
                            city={this.props.location.city} 
                            latitude={this.props.location.latitude} 
                            longitude={this.props.location.longitude} 
                        />
                    </li>
                    <li>
                        <b>Temperature: </b>
                        <TemperatureValue
                            temp={this.props.weather.temp}
                            tempMin={this.props.weather.tempMin}
                            tempMax={this.props.weather.tempMax}
                        />
                    </li>
                    <li>
                        <b>Rain/Snow: </b>{this.props.weather.precipitationProb}% chance
                    </li>
                    <li>
                        <b>Wind speed: </b>{this.props.weather.windSpeed} mph
                    </li>
                    <li>
                        <b>Humidity: </b>{this.props.weather.humidity}%
                    </li>
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-secondary">Refresh</button>
                </form>
            </div>
        );
    }
}