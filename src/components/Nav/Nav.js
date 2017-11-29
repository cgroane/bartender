import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import AppBar from 'material-ui/AppBar';

import FullNav from './FullNav/FullNav';
import {Navbar, FormControl, FormGroup, Button} from 'react-bootstrap';
import {requestUser, getAllRecipes, updateSearchTerms, showNav, hideNav} from './../../ducks/reducer';
import './Nav.css';




class Nav extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    handleLogin() {
        window.location.href = 'http://localhost:3001/api/login';
    }

    handleLogout() {
      // window.location.href = 'http://localhost:3001/api/logout'
    }
    handleClick() {
      this.props.getAllRecipes()
    }
   

    componentDidMount() {
      this.props.requestUser();
      console.log(this.props)
    }

    render() {
if (this.props.user == {} ) {
    var navbarInstance = (
      <div>
        <a className="closebtn" onClick="closeNav" href="#" > &times; </a>

        <div className="overlayContent" >
          <a href="#">About</a>
          <a href="#">About</a>
          <a href="#">About</a>
          <a href="#">About</a>

        </div>
      <FontAwesome className="super-crazy-colors" name="bars" size="2x" style={{textShadow: '0 1px 0 rgba(0,0,0,0.1)' }} />


      </div>
    )
  }
  else {
    var navbarInstance = (
      <AppBar title={<Link to="/" > <span >B.Y.O.B</span> </Link>}  iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
  if (this.props.showNavOverlay) {
    var showNavInstance = <FullNav/>
  }
  else {
    var showNavInstance = null;
  }
        return (
           <div className="navContainer" > 
           
           <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-shrink" id="mainNav" >
            <div className="navContainer">
              <div className="brandContainer" >
                <Link to="/" className="navbar-brand js-scroll-trigger nav-item" >
                    B.Y.O.B
                </Link>
              </div>
              <div className="menuIconContainer" >
                <FontAwesome className="menuIcon" name="bars" size="2x" style={{textShadow: '0 1px 0 rgba(0,0,0,0.1)', color: '#FFC15E'}} onClick={() =>   this.props.showNav()} />  
              </div>
            </div>
          </nav>
            {showNavInstance}
        </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getAllRecipes, updateSearchTerms, showNav, hideNav})(Nav);

//redux not connecting to nav