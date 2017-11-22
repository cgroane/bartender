import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Modal, Dialog, Header, Title, Body, Footer} from 'react-bootstrap';

import {getSteps, getIngredients, requestUser, updateComment, getComments, hideEditRecipeModal} from './../../../ducks/reducer';
import './EditModal.css';

class EditModal extends Component {
    constructor(props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.props.requestUser();
        this.props.getIngredients(this.props.rec_id);
        this.props.getSteps(this.props.rec_id);
        console.log(this.props.recipeSteps)
        
        // this.props.
    }
    handleButtonClick() {
        console.log(this.props);
    }
    close() {
        this.props.hideEditRecipeModal();
    }

    render(){
        var recToDisplay = this.props.allRecipes.find(rec => rec.recipe_id == this.props.rec_id)
        
        var editRecDisplay =  (
        
            <div className="editRecTextContainer" >
                <textarea className="titleEdit" placeholder={recToDisplay.recipe_title} />
                <textarea className="descriptionEdit" placeholder={recToDisplay.recipe_description}/>
                <textarea className="image_urlEdit" placeholder={recToDisplay.image_url}/>
                <textarea className="servesEdit" placeholder={recToDisplay.serves}/>
            </div>
            
        
            
        )
        var stepsDisplay = this.props.recipeSteps.map((cur, ind)=> {
            return (<div className="editStep" key={ind} >
                <textarea placeholder={cur.step_number} />
                <textarea placeholder={cur.step_description} />
            </div>)
            
        })

        var ingredientDisplay = this.props.recipeIngredients.map((cur, ind) => {
            return (
                
                <div key={ind} >
                    <textarea placeholder={cur.quantity} />
                    <textarea placeholder={cur.unit} />
                    <textarea placeholder={cur.title} />
                </div>

            )
        })

        return (
            
            <Modal.Dialog  >

                <Button onClick={this.handleButtonClick} >this is the edit EditModal</Button>
                <div> {editRecDisplay} </div>
                <hr/>
                <div> {stepsDisplay} </div>
                <hr/>
                {/* <div>{ingredientDisplay}</div> */}
                <Button onClick={this.close} >Close</Button>
                
            </Modal.Dialog>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {getSteps, getIngredients, requestUser, updateComment, getComments, hideEditRecipeModal})(EditModal);