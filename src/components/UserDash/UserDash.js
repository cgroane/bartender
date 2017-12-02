import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites, getMyRecipes, getUserTastes, getRecommended, getAllRecipes, showUserModal, hideUserModal} from '../../ducks/reducer';
import Favorites from './../Favorites/Favorites';
import MyRecipes from './../MyRecipes/MyRecipes';
import UserTastes from './../UserTastes/UserTastes';
import Recommended from './../Recommended/Recommended';
import UserEditModal from './UserEditModal/UserEditModal';
import {Button, PageHeader} from 'react-bootstrap';
import './UserDash.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);

    }
    
    componentDidMount() {
       
        this.props.requestUser().then(id => {
        return (
                this.props.getFavorites(id.value.user_id) && this.props.getAllRecipes() && this.props.getMyRecipes(id.value.user_id) && this.props.getUserTastes(id.value.user_id).then(tasteData => {
                    return tasteData.value.map(x => {
                            return this.props.getRecommended(x.title)
                        }
                    )
                })
            )
        })
        // console.log(id)
        // console.log(this.props.user)
    }
    
        render() {
            // console.log(this.props);
            if(this.props.showUserEditModal) {
                var userModal = <UserEditModal onScroll={() => console.log('scrolling')} />
            }  
            else {
                var userModal = null;
            }
            
            return (
                <div className="userDashContainer"  onScroll={() => console.log('scrolling')} >
                    <div className="userInfoAndHeader" >
                        <div className="userDashInfoContainer" >
                        Hello World
                        {this.props.user.username && (
                                <div>
                                    {this.props.user.username} & {this.props.user.user_id}
                                    
                                </div>
                            )}
                        </div>
                    
                   
                            <div className="pageHeaderContainer" ><UserTastes/></div>
                        </div>
                        <div className="dashContentContainer">
                            <div className="page" >
                                <div className="pageHeaderContainer" ><PageHeader>Your Go-To's:</PageHeader></div>
                                <div className="fullPageCarousel" >
                                    <div className="dashContentChild"><Favorites/></div>
                                </div>
                            </div>

                            <div className="page" >
                                <div className="pageHeaderContainer" ><PageHeader>Your Creations:</PageHeader></div>
                                <div className="dashContentChild"><MyRecipes/></div>
                            </div>
                            <div className="page" >
                                <div className="pageHeaderContainer" ><PageHeader>You might like:</PageHeader></div>
                                <div className="dashContentChild"><Recommended/></div>
                            </div>
                        </div>
                        <div className="editProfile page" >
                            <Link to="/new_recipe" >
                                <button className="userDashButton" >
                                    Add new Recipe
                                </button>
                            </Link>
                            <button className="userDashButton" onClick={() => this.props.showUserModal()} >Edit profile</button>
                            {userModal}
                        </div>
                </div>
        )
    }

}

function mapStateToProps(state){
    return {
    user: state.user,
    favorites: state.favorites,
    myRecipes: state.myRecipes,
    userTastes: state.userTastes,
    recommended: state.recommended,
    showUserEditModal: state.showUserEditModal
    }
}

export default connect(mapStateToProps, {requestUser, getFavorites, getMyRecipes, getUserTastes, getRecommended, getAllRecipes, showUserModal, hideUserModal})(LandingPage)

// when running the reducer functions that use axios and take in a parameter in the url, pass in the value when invoking the action creator.