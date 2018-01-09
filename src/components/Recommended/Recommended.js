import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites} from '../../ducks/reducer';
import { ListGroupItem, ListGroup, Button, PageHeader } from 'react-bootstrap';






class Recommended extends Component {
    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        // this.props.getFavorites(this.props.user.user_id)
        this.props.requestUser()
    }
    
    render() {
        
    //    if (this.props.recommended.length > 0) { 
           
    //     var RecommendedDisplay = this.props.recommended.map((cur, ind) => (
            
    //             <ListGroupItem key={ind} header={cur.title} >
    //                 {cur.title}, 
    //             </ListGroupItem>
            
    //     ))
    // } else {
    //     var RecommendedDisplay = "You have no recommnedations to display";
    // }
        

        return (
            <div className="recommendedContainer" >
                    <ListGroup> 
                        <ListGroupItem header={this.props.recommended}>
                            <Link to="/recipe_details" >Give it a try!</Link>
                        </ListGroupItem> 
                    </ListGroup>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
    user: state.user,
    recommended: state.recommended
    }
}

export default connect(mapStateToProps, {requestUser})(Recommended);