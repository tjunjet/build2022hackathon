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
            <div className="weatherReport container border">
                <h2>
                    Weather Report
                </h2>
                <p>
                    <b>Your location: </b>{this.props.location.city} ({this.props.location.latitude}, {this.props.location.longitude})
                </p>
                <p>
                    <b>Temperature: </b>{this.props.weather.temp} deg C
                </p>
                <p>
                    <b>Precipitation: </b>{this.props.weather.precipitationProb}% chance of rain
                </p>
                <p>
                    <b>Wind speed: </b>{this.props.weather.windSpeed}
                </p>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">Refresh</button>
                </form>
            </div>
        );
    }
}