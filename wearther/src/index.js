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
        const clothes = this.state.clothes.slice();
        clothes.push({
            customName: customName,
            garmentType: garmentType,
        });
        this.setState({
            clothes: clothes,
        });
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const userInput = event.target;
        this.props.onSubmit(userInput.customName.value, userInput.garmentType.value);
    }
    render() {
        return(
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="customName">Custom Name (Optional)</label>
                        <input type="text" id="customName" name="customName" />
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