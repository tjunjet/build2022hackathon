import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: Array(),
        }
    }
    addGarment(customName, garmentType) {
        this.state.clothes.push({
            customName: customName,
            garmentType: garmentType,
        });
        /*
        // NOT SURE WHY, but the below seems to cause the "1 submit delay" bug
        // (Clicking the submit button only logs the data of the previous submit)
        const clothes = this.state.clothes.slice();
        clothes.push({
            customName: customName,
            garmentType: garmentType,
        });
        this.setState({
            clothes: clothes,
        });
        */
        console.log(this.state.clothes);
    }
    render() {
        return (
            <div className="app">
                <h1>Hello!</h1>
                <Form onSubmit={(customName, garmentType) => this.addGarment(customName, garmentType)}/>
            </div>
        );
    }
}

class Form extends React.Component {
    /*
    Consider changing form to a controlled component (use React to update what
        is displayed within the text box as the user types):
        https://reactjs.org/docs/forms.html
    */
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