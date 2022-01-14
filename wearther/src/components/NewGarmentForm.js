import React from 'react';
import ReactDOM from 'react-dom';

// To encapsulate in a class (probably)
const garmentTypes = Array(
    {name: "T Shirt",               value: "tshirt"},
    {name: "Thermals",              value: "thermals"},
    {name: "Fleece Jacket",         value: "fleeceJacket"},
    {name: "Down Jacket",           value: "downJacket"},
    {name: "Windbreaker Shell",     value: "windbreakerShell"},
);

export class NewGarmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customNameValue: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            customNameValue: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(event.target.customName.value, event.target.garmentType.value);
    }
    render() {
        const garmentOptions = this.props.garmentTypes.map((item) => {
            return (
                <option value={item.value} key={item.value}>
                    {item.name}
                </option>
            );
        });
        
        return(
            <div className="newGarmentForm container mb-3 border">
                <h2>Add to Wardrobe</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Custom Name</label>
                                <input 
                                    type="text" 
                                    id="customName" 
                                    name="customName" 
                                    value={this.state.customNameValue} 
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Add a custom name (optional)"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Type of Clothing</label>
                                <select 
                                    id="garmentType" 
                                    name="garmentType"
                                    className="form-control"
                                    defaultValue="default"
                                >
                                    <option value="default" disabled>Select</option>
                                    {garmentOptions}
                                </select>
                            </div>
                        </div>  
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary mt-2">Add</button>
                        <button type="reset" className="btn btn-default mt-2">Reset</button>
                    </div>
                </form>
            </div>
        );
    }
}