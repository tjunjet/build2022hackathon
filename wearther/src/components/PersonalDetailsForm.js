import React from 'react';
import ReactDOM from 'react-dom';

export class PersonalDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ageValue: "",
            heightValue: "",
            weightValue: "",
        };
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
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

    render() {
        return(
            <div className="newGarmentForm container pt-2 pb-3 border">
                <h2>Personal Info</h2>
                <form onSubmit={this.handleSubmit}>
                    {/*First row of form fields*/}
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <select 
                                    id="sex" 
                                    name="sex"
                                    className="form-control"
                                    defaultValue="default"
                                >
                                    <option value="default" disabled>Sex</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="age" 
                                    name="age" 
                                    value={this.state.ageValue} 
                                    onChange={this.handleChangeAge}
                                    className="form-control"
                                    placeholder="Age"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="height" 
                                    name="height" 
                                    value={this.state.heightValue} 
                                    onChange={this.handleChangeHeight}
                                    className="form-control"
                                    placeholder="Height"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="weight" 
                                    name="weight" 
                                    value={this.state.weightValue} 
                                    onChange={this.handleChangeWeight}
                                    className="form-control"
                                    placeholder="Weight"
                                />
                            </div>
                        </div>  
                    </div>
                    {/*Second row of form fields*/}
                    <div className="row">
                        
                        {/*TO DO*/}
                        <div className="col">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="weight" 
                                    name="weight" 
                                    value={this.state.weightValue} 
                                    onChange={this.handleChangeWeight}
                                    className="form-control"
                                    placeholder="Weight"
                                />
                            </div>
                        </div>


                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary mt-3">Add</button>
                        <button type="reset" className="btn btn-default mt-3">Reset</button>
                    </div>
                </form>
            </div>
        );
    }
}