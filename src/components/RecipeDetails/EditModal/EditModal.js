import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import {getSteps, getIngredients, requestUser, updateComment, getComments} from './../../../ducks/reducer';
import './EditModal.css';

class EditModal extends Component {
    constructor(props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        this.props.requestUser();
        this.props.getIngredients(this.props.rec_id);
        this.props.getSteps(this.props.rec_id);
        // this.props.
    }
    handleButtonClick() {
        console.log(this.props);
    }

    render(){
        var recToDisplay = this.props.allRecipes.find(rec => rec.recipe_id == this.props.rec_id)
        var stepsDisplay = this.props.recipeSteps.map((cur, ind)=> {
            <div className="editStep" key={ind} >
                <textarea placeholder={cur.step_number} />
                <textarea placeholder={cur.step_description} />
            </div>
            
        })
        var editRecDisplay =  (
        
            <div className="editRecTextContainer" >
                <textarea className="titleEdit" placeholder={recToDisplay.recipe_title} />
                <textarea className="descriptionEdit" placeholder={recToDisplay.recipe_description}/>
                <textarea className="image_urlEdit" placeholder={recToDisplay.image_url}/>
                <textarea className="servesEdit" placeholder={recToDisplay.serves}/>
            </div>
            
        
            
        )

        return (
            
            <div>
                <Button onClick={this.handleButtonClick} >this is the edit EditModal</Button>
                <div> {editRecDisplay} </div>
                <div> {stepsDisplay} </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {getSteps, getIngredients, requestUser, updateComment, getComments})(EditModal);