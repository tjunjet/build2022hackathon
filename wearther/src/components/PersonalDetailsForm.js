import React from 'react';
import ReactDOM from 'react-dom';

export class PersonalDetailsForm extends React.Component {
    
    
    render() {
        return(
            <div className="newGarmentForm container pt-2 pb-3 border">
                <h2>Personal Info</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            
                        </div>
                        <div className="col">
                            
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