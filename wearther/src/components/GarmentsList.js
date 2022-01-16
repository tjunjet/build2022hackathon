import React from 'react';
import ReactDOM from 'react-dom';

class TableContents extends React.Component {
    handleRemove(id) {
        this.props.onRemoveGarment(id);
    }
    render() {
        if (this.props.currentGarments.length === 0) {
            return(
                <p><span className="text-muted">Add to your wardrobe to get started.</span></p>
            );
        } else {
            const garmentsList = this.props.currentGarments.map((item) => {
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
                            <td>
                                <button 
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => this.handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    );
                // User has given a Custom Name (display Garment Type in parentheses)
                } else {
                    return(
                        <tr key={item.id}>
                            <td className="align-middle">{item.customName} <span className="text-muted">({garmentTypeReadable})</span></td>
                            <td>
                                <button 
                                    className="btn btn-secondary btn-sm" 
                                    onClick={() => this.handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </td>
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

export class GarmentsList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleRemove(id) {
        this.props.onRemoveGarment(id);
    }
    render() {
        
        /*
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
        */

        return (
            <div className="garmentsList container border pt-2">
                <h2>
                    My Wardrobe
                </h2>
                <TableContents 
                    currentGarments={this.props.currentGarments} 
                    onRemoveGarment={(id) => this.handleRemove(id)}
                    garmentTypes={this.props.garmentTypes}
                />
            </div>
        );
    }
}