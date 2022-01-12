import React from 'react';
import ReactDOM from 'react-dom';

export class WeatherReport extends React.Component {
    render() {
        return (
            <div className="weatherReport">
                <h2>
                    Weather Report
                </h2>
                <p>
                    <b>Your location: </b>Somewhere
                </p>
                <p>
                    <b>Temperature: </b>35-42 F
                </p>
                <p>
                    <b>Precipitation: </b>None
                </p>
                <p>
                    <b>Wind speed: </b>8 mph
                </p>
            </div>
        );
    }
}