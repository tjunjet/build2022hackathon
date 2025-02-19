import React from 'react';
import ReactDOM from 'react-dom';

export class Introduction extends React.Component {
    render() {
        return (
            <div className="introduction container border pt-3">
                <h1 className="page-header">The Winter Wear-ther Guide</h1>
                <p>
                    This app suggests clothes to wear based on your available wardrobe and local weather.
                    Add to the list of clothes in your possession below, and a "to-wear" list will be generated.
                    For better accuracy, enter your personal details to receive recommendations tailored
                    to your specific body type.
                </p>
            </div>
            
        );
    }
}