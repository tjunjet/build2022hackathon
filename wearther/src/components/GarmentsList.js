import React from 'react';
import ReactDOM from 'react-dom';

export class GarmentsList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleRemove(id) {
        this.props.onRemoveGarment(id);
    }
    render() {
        const garmentsList = this.props.currentGarments.map((item) => {
            return(
                <li key={item.id}>
                    <p>id: {item.id}</p>
                    <p>{item.customName}</p>
                    <p>{item.garmentType}</p>
                    <button onClick={() => this.handleRemove(item.id)}>Remove</button>
                </li>
            );
        });
        console.log(this.props.currentGarments);
        return (
            <div className="garmentsList">
                <h2>Current Garments</h2>
                <ul>{garmentsList}</ul>
            </div>
        );
        
    }
}