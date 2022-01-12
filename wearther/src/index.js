import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './bootstrap-5.1.3-dist/css/bootstrap.min.css';
import './index.css';
import { NewGarmentForm } from './components/NewGarmentForm'
import { Introduction } from './components/Introduction'
import { WeatherReport } from './components/WeatherReport'
import { GarmentsList } from './components/GarmentsList'

// To encapsulate in a class (probably)
const garmentTypes = Array(
    {name: "T Shirt",               value: "tshirt"},
    {name: "Thermals",              value: "thermals"},
    {name: "Fleece Jacket",         value: "fleeceJacket"},
    {name: "Down Jacket",           value: "downJacket"},
    {name: "Windbreaker Shell",     value: "windbreakerShell"},
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: Array(), //Save clothes as an array of objects
            nextGarmentID: 1,
            garmentTypes: garmentTypes,
        };
    }
    
    // Adding to & removing from list of available clothes
    /*
    Send JSON data to backend via fetch(): 
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    (refer to Uploading JSON data section)
    */
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

    //Testing HTTP request with Axios
    getTestData() {
        const url = 'https://api.weather.gov/points/39.7456,-97.0892';
        axios.get(url).then((response) => {console.log(response)}); 
    }

    render() {
        //Test
        this.getTestData();

        return (
            <div className="container">
                <Introduction />
                <WeatherReport />
                <NewGarmentForm 
                    onSubmit={(customName, garmentType) => this.addGarment(customName, garmentType)}
                    garmentTypes={this.state.garmentTypes}
                />
                <GarmentsList currentGarments={this.state.clothes} onRemoveGarment={(id) => this.removeGarment(id)}/>
            </div>
        );
    }
}

// --------------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
);