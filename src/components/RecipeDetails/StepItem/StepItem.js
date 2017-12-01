import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './StepItem.css';


class StepItem extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        return (
            <div className="stepContainer" >
                
                <div className="stepNumberContainer" >
                    <span>{this.props.stepNum}:</span>
                    <hr/>
                </div>
                <div className="stepDescContainer" >
                    <p> {this.props.stepDesc} </p>
                </div>
                
            </div>
        )
    }
}
export default StepItem