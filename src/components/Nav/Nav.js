import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import AppBar from 'material-ui/AppBar';


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
        return (
           <div className="navContainer" > 
           
           <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-shrink" id="mainNav" >
            <div className="navContainer">
              <div className="brandContainer" >
                <Link to="/" className="navbar-brand js-scroll-trigger nav-item" >
                    B.Y.O.B
                </Link>
                <input type="text" className="navSearchBar" placeholder="Search Recipes" onChange={(e) => this.props.updateSearchTerms(e.target.value)} />
                  <Link to="/" className="nav-link js-scroll-trigger" >
                      <button className="navSearchButton" >SEARCH</button>
                  </Link>
              </div>
            <button className="navbar-toggler navbar-toggler-right collapsed" type="button" >
                Menu
                
            </button>

            <FontAwesome className="menuIcon" name="bars" size="2x" style={{textShadow: '0 1px 0 rgba(0,0,0,0.1)' }} onClick={this.props.showNav} />  
            
           
              <div className="collapse navbar-collapse" >
              
                  <ul className="navbar-nav text-uppercase ml-auto" >
                    <li className="nav-item">
                      <Link to={`/dashboard`} className="nav-item" >
                        {this.props.user.username}
                      </Link>
                    </li>
                    <li className="nav-item" >
                      <Link onClick={this.handleLogin} to="/" className="nav-item" >
                        Logout
                      </Link>
                    </li>
                    <li className="nav-item" >
                    <Link to="/browse"  onClick={this.handleClick} className="nav-item" >
                      Browse
                    </Link>
                    </li>
                  </ul>
                  
              </div>
            
        </div>
        </nav>
           </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getAllRecipes, updateSearchTerms})(Nav);

//redux not connecting to nav