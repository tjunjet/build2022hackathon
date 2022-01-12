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
            <div className="form">
                <h2>Add to Wardrobe</h2>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="customName">Custom Name (Optional)</label>
                        <input 
                            type="text" 
                            id="customName" 
                            name="customName" 
                            value={this.state.customNameValue} 
                            onChange={this.handleChange}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="garmentType">Type of Garment</label>
                        <select id="garmentType" name="garmentType">
                            {garmentOptions}
                        </select>
                    </fieldset>
                    <button type="submit">Add</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
        );
    }
}