import React from 'react';
import ReactDOM from 'react-dom';

export class WhatToWear extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }
    render() {
        return(
            <div className="whatToWear container border pt-2 pb-3">
                <h2>
                    What To Wear
                </h2>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-secondary mt-2">Get Recommendations</button>
                </form>
            </div> 
        );
    }
}