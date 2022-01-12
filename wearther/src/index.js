import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: Array(), //Save clothes as an array of objects
            nextGarmentID: 1,
        };
    }
    addGarment(customName, garmentType) {
        const clothes = this.state.clothes;
        clothes.push({
            customName: customName,
            garmentType: garmentType,
            id: this.state.nextGarmentID,
        });
        this.setState({
            clothes: clothes,
            nextGarmentID: (this.state.nextGarmentID + 1),
        });
    }
    removeGarment(id) {
        console.log("removeGarment called on " + id)
        const clothes = this.state.clothes.filter((item) => {return item.id !== id;});
        this.setState({
            clothes: clothes,
        });
    }
    render() {
        return (
            <div className="app">
                <h1>Hello!</h1>
                <Form onSubmit={(customName, garmentType) => this.addGarment(customName, garmentType)}/>
                <GarmentsList currentGarments={this.state.clothes} onRemoveGarment={(id) => this.removeGarment(id)}/>
            </div>
        );
    }
}

class GarmentsList extends React.Component {
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

class Form extends React.Component {
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
        return(
            <div className="form">
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
                            <option value="tshirt">T Shirt</option>
                            <option value="downjacket">Down Jacket</option>
                            <option value="insulatedparka">Insulated Parka</option>
                        </select>
                    </fieldset>
                    <button type="submit">Add</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
        );
    }
}

// --------------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
);