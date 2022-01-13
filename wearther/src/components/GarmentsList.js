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
                <tr key={item.id}>
                    <td>{item.customName}</td>
                    <td>{item.garmentType}</td>
                    <td>
                        <button 
                            onClick={() => this.handleRemove(item.id)}
                            className="btn btn-secondary"
                        >
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="garmentsList container">
                <h2>Current Garments</h2>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Custom Name</th>
                            <th>Clothing Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garmentsList}
                    </tbody>
                </table>
            </div>
        );
    }
}