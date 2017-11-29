import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import FullNavAnimation from './FullNavAnimation';
import connectWithTransitionGroup from 'connect-with-transition-group'
import './FullNav.css';
import {requestUser, getAllRecipes, updateSearchTerms, showNav} from './../../../ducks/reducer';


class FullNav extends Component {
    constructor(props) {
        super(props);
        

        this.handleLogin = this.handleLogin.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    
    componentDidMount() {
        console.log(this)
        this.props.requestUser();
       
    }
    componentWillEnter(cb) {
        console.log("com[onent entered")
        FullNavAnimation.show(this.appNav, cb);
    }
    componentWillLeave(cb) {
        FullNavAnimation.hide(this.appNav, cb)
    }
    handleLogin() {
        window.location.href = 'http://localhost:3001/api/login';
    }
    handleItemClick() {
        this.props.hideNav();
    }
    render() {
        return (
            <div className="fullNavContainer FullNavOverlay" ref={ref => this.appNav = ref} >
                <div className="fullNavBrand" >
                    <Link to="/" onClick={this.handleItemClick} ><span >B.Y.O.B.</span></Link>
                </div>
                <div className="closeNav" >
                    <span onClick={() => this.props.hideNav()} >X</span>
                </div>
                <div className="fullNavItemsListContainer" >
                    <div className="fullNavSearch" >
                        <input type="text" placeholder="Search recipes" />
                        <button className="searchBtn" >SEARCH</button>
                    </div>
                    <div className="fullNavItemsList" >
                        <div className="fullNavItem" >
                            <Link to="/browse" onClick={this.handleItemClick} >
                                BROWSE
                            </Link>
                        </div>
                        <div className="fullNavItem" >
                            <Link to={`/dashboard`} onClick={this.handleItemClick} >
                                {this.props.username}
                            </Link>
                        </div>
                        <div className="fullNavItem" onClick={this.handleItemClick} >
                            <Link to="/new_recipe" >
                                Add New Recipe
                            </Link>
                        </div>
                        <div className="fullNavItem" onClick={this.handleItemClick} >
                            <Link to="/" onClick={this.handleLogin} >
                                LOGOUT
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>  
        )
    }

}

const mapStateToProps = state => state;
export default FullNav;