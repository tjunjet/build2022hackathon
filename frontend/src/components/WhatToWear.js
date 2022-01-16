import React from 'react';
import ReactDOM from 'react-dom';

class TableContents extends React.Component {
    render() {
        if (this.props.recommendedClothes.length === 0) {
            return(
                <p><span className="text-muted">Add to your wardrobe to get started.</span></p>
            );
        } else {
            const garmentsList = this.props.recommendedClothes.map((item) => {
                var garmentTypeReadable = "Unknown type";
                // Get readable Garment Type
                for (var i in this.props.garmentTypes) {
                    if (this.props.garmentTypes[i].value === item.garmentType) {
                        garmentTypeReadable = this.props.garmentTypes[i].name;
                    }
                }
                // No Custom Name given by user (just display Garment Type)
                if (item.customName == "") {
                    return(
                        <tr key={item.id}>
                            <td className="align-middle">{garmentTypeReadable}</td>
                        </tr>
                    );
                // User has given a Custom Name (display Garment Type in parentheses)
                } else {
                    return(
                        <tr key={item.id}>
                            <td className="align-middle">{item.customName} <span className="text-muted">({garmentTypeReadable})</span></td>
                        </tr>
                    );
                }
            });
            return(
                <table className="table table-striped table-hover mt-4">
                        <tbody>
                            {garmentsList}
                        </tbody>
                </table>
            );
        }
    }
}

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

        console.log("WHAT TO WEAR");
        console.log(this.props.recommendedClothes);
        console.log(this.props.garmentTypes);
        return(
            <div className="whatToWear container border pt-2 pb-3">
                <h2>
                    What To Wear
                </h2>
                <TableContents
                    recommendedClothes={this.props.recommendedClothes}
                    garmentTypes={this.props.garmentTypes}
                />
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-secondary">Get Recommendations</button>
                </form>
            </div> 
        );
    }
}