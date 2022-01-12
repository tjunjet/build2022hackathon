import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const components = require('./components');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: Array(), //Save clothes as an array of objects
        }
    }
    addGarment(customName, garmentType) {
        this.state.clothes.push({
            customName: customName,
            garmentType: garmentType,
        });
        console.log(this.state.clothes);
    }
    render() {
        return (
            <div className="app">
                <h1>Hello!</h1>
                <components.Form onSubmit={(customName, garmentType) => this.addGarment(customName, garmentType)}/>
            </div>
        );
    }
}



// --------------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
);