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
    render() {
        return (
            <div className="app">
                <h1>Hello!</h1>
                <Form />
            </div>
        );
    }
}

class Form extends React.Component {
    render() {
        return(
            <div className="form">
                <form>
                    <fieldset>
                        <label for="customName">Custom Name (Optional)</label>
                        <input type="text" id="customName" name="customName" />
                    </fieldset>
                    <fieldset>
                        <label for="garmentType">Type of Garment</label>
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