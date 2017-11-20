import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites} from '../../ducks/reducer';
import { ListGroupItem, ListGroup, Button, PageHeader } from 'react-bootstrap';






class UserTastes extends Component {
    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        // this.props.getFavorites(this.props.user.user_id)
        this.props.requestUser()
    }
    
    render() {
        // console.log(this.props)
       if (this.props.userTastes.length > 0) { 
           
        var tastesDisplay = this.props.userTastes.map((cur, ind) => (
            
                <span key={ind} header={cur.title} >
                    {cur.title}, 
                </span>
            
        ))
    } else {
        var tastesDisplay = "You have no flavor preferences to display";
    }
        

        return (
            <div>
                <PageHeader>What you like:</PageHeader>
                <ListGroup> {tastesDisplay}</ListGroup>
            </div>
        )
    }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getFavorites})(UserTastes);