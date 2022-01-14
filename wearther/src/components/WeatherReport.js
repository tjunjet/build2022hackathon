import React from 'react';
import ReactDOM from 'react-dom';

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
                        <span>{this.props.location.city} </span>
                        <span className="text-muted">({this.props.location.latitude}, {this.props.location.longitude})</span>
                    </li>
                    <li>
                        <b>Temperature: </b>
                        <span>{this.props.weather.temp} &deg;C </span>
                        <span className="text-muted">({this.props.weather.tempMin} - {this.props.weather.tempMax})</span>
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