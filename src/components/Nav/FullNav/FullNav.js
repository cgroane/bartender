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
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
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
        window.location.href = '/api/login';
    }
    handleLogout() {
        window.location.href = "/logout"
        
    }
    handleItemClick(event) {
   
        this.props.hideNav();
    }
    handleSearchClick() {
        this.props.searchRecipes(this.props.searchTerms);
        this.props.hideNav()
    }
    render() {
        return (
            <div className="fullNavContainer FullNavOverlay" ref={ref => this.appNav = ref} onClick={this.props.handleItemClick} >
                <div className="fullNavBrand" >
                    <Link to="/"  ><span >B.Y.O.B.</span></Link>
                </div>
                <div className="closeNav" >
                    <span onClick={() => this.props.hideNav()} >X</span>
                </div>
                <div className="fullNavItemsListContainer" >
                    <div className="fullNavSearch" >
                        <input type="text" placeholder="Search recipes" onChange={(e) => this.props.updateSearchTerms(e.target.value)} />
                        <Link to="/search_results" >
                        <button className="searchBtn" onClick={this.handleSearchClick} >SEARCH</button>
                        </Link>
                    </div>
                    <div className="fullNavItemsList" >
                        <div className="fullNavItem" >
                            <Link to="/browse"  >
                                BROWSE
                            </Link>
                        </div>
                        {this.props.username &&
                        <div className="fullNavItem" >
                            <Link to={`/dashboard`} >
                                {this.props.username}
                            </Link>
                        </div>}
                        <div className="fullNavItem" >
                            <Link to="/new_recipe" >
                                Add New Recipe
                            </Link>
                        </div>
                        
                        {!this.props.username &&
                        <div className="fullNavItem" onClick={this.handleLogin} >
                            
                                LOGIN
                            
                        </div>}
                        {this.props.username &&
                        <div className="fullNavItem" onClick={this.handleLogout} >
                            
                                LOGOUT
                            
                        </div>}
                    </div>
                    
                </div>
            </div>  
        )
    }

}

const mapStateToProps = state => state;
export default FullNav;