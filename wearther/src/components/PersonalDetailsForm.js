import React from 'react';
import ReactDOM from 'react-dom';

export class PersonalDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ageValue: "",
            heightValue: "",
            weightValue: "",
            bodyFatPercentageValue: "",
        };
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleChangeBodyFatPercentage = this.handleChangeBodyFatPercentage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleChangeAge(event) {
        this.setState({
            ageValue: event.target.value,
        });
    }
    handleChangeHeight(event) {
        this.setState({
            heightValue: event.target.value,
        });
    }
    handleChangeWeight(event) {
        this.setState({
            weightValue: event.target.value,
        });
    }
    handleChangeBodyFatPercentage(event) {
        this.setState({
            bodyFatPercentageValue: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        // If none of the fields are filled, ignore
        if (
            (event.target.sex.value === "default") &&
            (event.target.age.value === "") &&
            (event.target.height.value === "") &&
            (event.target.weight.value === "") &&
            (event.target.bodyFatPercentage.value === "") &&
            (event.target.coldTolerance.value === "default")
        ) {
            return;
        } else {
            this.props.onSubmit(
                event.target.sex.value,
                event.target.age.value,
                event.target.height.value,
                event.target.weight.value,
                event.target.bodyFatPercentage.value,
                event.target.coldTolerance.value,
            );
        }
    }
    handleReset(event) {
        this.setState({
            ageValue: "",
            heightValue: "",
            weightValue: "",
            bodyFatPercentageValue: "",
        });
    }

    render() {
        return(
            <div className="newGarmentForm container pt-2 pb-3 border">
                <h2>Personal Info</h2>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    {/*First row of form fields*/}
                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Sex</label>
                                <select 
                                    id="sex" 
                                    name="sex"
                                    className="form-control"
                                    defaultValue="default"
                                >
                                    <option value="default" disabled>Select</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Age</label>
                                <input 
                                    type="text" 
                                    id="age" 
                                    name="age" 
                                    value={this.state.ageValue} 
                                    onChange={this.handleChangeAge}
                                    className="form-control"
                                    placeholder="Years"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Height</label>
                                <input 
                                    type="text" 
                                    id="height" 
                                    name="height" 
                                    value={this.state.heightValue} 
                                    onChange={this.handleChangeHeight}
                                    className="form-control"
                                    placeholder="cm"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Weight</label>
                                <input 
                                    type="text" 
                                    id="weight" 
                                    name="weight" 
                                    value={this.state.weightValue} 
                                    onChange={this.handleChangeWeight}
                                    className="form-control"
                                    placeholder="kg"
                                />
                            </div>
                        </div>  
                    </div>
                    {/*Second row of form fields*/}
                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Body Fat (optional)</label>
                                <input 
                                    type="text" 
                                    id="bodyFatPercentage" 
                                    name="bodyFatPercentage" 
                                    value={this.state.bodyFatPercentageValue} 
                                    onChange={this.handleChangeBodyFatPercentage}
                                    className="form-control"
                                    placeholder="%"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="mb-2">Cold Tolerance (1-5)</label>
                                <select 
                                    id="coldTolerance" 
                                    name="coldTolerance"
                                    className="form-control"
                                    defaultValue="default"
                                >
                                    <option value="default" disabled>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary mt-3">Submit</button>
                        <button type="reset" className="btn btn-default mt-3">Reset</button>
                    </div>
                </form>
            </div>
        );
    }
}