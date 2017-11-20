import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Navbar, FormControl, FormGroup, Button} from 'react-bootstrap';
import {requestUser, getAllRecipes, updateSearchTerms} from './../../ducks/reducer';




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
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>

          <Link to="/" >
            B.Y.O.B.
          </Link>

        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search Recipes" />
          </FormGroup>
          
          {' '}
          <Button type="submit">Submit</Button>
          
          
        </Navbar.Form>
        <Link to="/">
                  <Navbar.Brand onClick={this.handleLogin} >Login</Navbar.Brand>
          </Link>
        
      </Navbar.Collapse>
    </Navbar>
    )
  }
  else {
    var navbarInstance = (
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" >
            B.Y.O.B.
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>
            <Link to="/browse"  onClick={this.handleClick}>
              Browse
            </Link>
          </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search Recipes" onChange={(e) => this.props.updateSearchTerms(e.target.value)} />
          </FormGroup>
          
          {' '}
          <Button type="submit">Submit</Button>
          
         

        </Navbar.Form>
        <Link to="/">
                  <Navbar.Brand onClick={this.handleLogin} >Logout</Navbar.Brand>
          </Link>
        <Link to="/dashboard">
          <Navbar.Brand>{this.props.user.username}</Navbar.Brand>
        </Link>
      </Navbar.Collapse>
    </Navbar>
    )
  }
        return (
           <div> {navbarInstance} </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getAllRecipes, updateSearchTerms})(Nav);

//redux not connecting to nav