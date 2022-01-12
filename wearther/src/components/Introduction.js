import React from 'react';
import ReactDOM from 'react-dom';

export class Introduction extends React.Component {
    render() {
        return (
            <div className="introduction">
                <h1>
                    The Winter Wear-ther Guide
                </h1>
                <p>
                    This app suggests clothes to wear based on your available wardrobe and local weather.
                    Add to the list of clothes in your possession below, and a "to-wear" list will be generated.
                </p>
            </div>
            
        );
    }
}