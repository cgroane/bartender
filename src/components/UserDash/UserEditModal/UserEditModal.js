import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Modal, Dialog, Header, Title, Body, Footer} from 'react-bootstrap';

import {getSteps, getIngredients, requestUser, updateComment, getComments, hideEditRecipeModal, showUserModal, hideUserModal, updateEditUsername, updateEditUserImage, getFavorites, getAllRecipes, getMyRecipes, getUserTastes, getRecommended, handleUserEditSave, loadEditData} from './../../../ducks/reducer';
import './UserEditModal.css';


class UserEditModal extends Component {
    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.props.loadEditData(this.props.user);
        
        
        // console.log(this.props.recipeSteps)
    }
    handleSave() {
        this.props.handleUserEditSave(this.props.user.user_id, this.props.editUser);
        this.props.hideUserModal();
       
    }

    render() {
        const {user_id, username, image_url} = this.props.user;
        
        return (
            <Modal.Dialog id="contained-modal-title-lg">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-lg">Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Username:</h4>
                    
                    <textarea defaultValue={username} onChange={(e) => this.props.updateEditUsername(e.target.value) } ></textarea>
                    <hr/>
                    <h4>Profile Image URL:</h4>
                    
                    <textarea defaultValue={image_url}  onChange={(e) => {this.props.updateEditUserImage(e.target.value)}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSave} >
                        Save
                    </Button>
                    <Button onClick={() => this.props.hideUserModal()} >
                        Close
                    </Button>

                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {getSteps, getIngredients, requestUser, updateComment, getComments, hideEditRecipeModal, showUserModal, hideUserModal, updateEditUsername, updateEditUserImage, getFavorites, getAllRecipes, getMyRecipes, getUserTastes, getRecommended, handleUserEditSave, loadEditData})(UserEditModal);