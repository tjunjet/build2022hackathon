import React from 'react';
import ReactDOM from 'react-dom';

class TableContents extends React.Component {
    render() {
        if (this.props.currentGarments.length === 0) {
            return(
                <p><span className="text-muted">Add to your wardrobe to get started.</span></p>
            );
        } else {
            const garmentsList = this.props.currentGarments.map((item) => {
                if (item.customName == "") {
                    return(
                        <tr key={item.id}>
                            <td className="align-middle">{item.garmentType}</td>
                            <td><button className="btn btn-secondary btn-sm">Remove</button></td>
                        </tr>
                    );
                } else {
                    return(
                        <tr key={item.id}>
                            <td className="align-middle">{item.customName} <span className="text-muted">({item.garmentType})</span></td>
                            <td><button className="btn btn-secondary btn-sm">Remove</button></td>
                        </tr>
                    );
                }
            });
            return(
                <table className="table table-striped table-hover">
                    <tbody>
                        {garmentsList}
                    </tbody>
                </table>

            );
        }
    }
}

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
                            className="btn btn-secondary btn-sm"
                        >
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="garmentsList container border pt-2">
                <h2>My Wardrobe</h2>
                <TableContents currentGarments={this.props.currentGarments}/>
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