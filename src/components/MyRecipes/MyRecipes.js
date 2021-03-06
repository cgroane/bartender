import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites, getMyRecipes} from '../../ducks/reducer';
import { ListGroupItem, ListGroup, Button, PageHeader, Carousel } from 'react-bootstrap';

import './MyRecipes.css';



class MyRecipes extends Component {
    constructor(props) {
        super(props);

        
    }

    componentWillMount() {
        
        this.props.requestUser()
    }
    
    render() {
        
        if (this.props.myRecipes.length > 0) {
            var myRecipesDisplay = this.props.myRecipes.map((cur, ind) => (
                <Carousel.Item key={ind}>
                    <img  alt="900x500" src={cur.image_url}/>
                    <Link to={`/${cur.recipe_id}/recipe_details`} key={ind} >
                    <Carousel.Caption>
                        <h3>{cur.recipe_title}</h3>
                        <p>{cur.recipe_description}</p>
                    </Carousel.Caption>
                    </Link>
                    {/* add edit button -- redirect or popup edit modal, get recipe_id, ingredients, steps for recipe */}
                </Carousel.Item>
            ) 
        ) 
        // var carouselDisplay = <Carousel>{myRecipesDisplay}</Carousel>  
    } else {
            var myRecipesDisplay = (
                <div  className="nullRecipesDisplay" >
                    <h1>You haven't created any recipes yet</h1>
                    <Link to="/new_recipe" >
                        <button className="userDashButton" >Get Started</button>
                    </Link>
                </div>
                
                
                
            )
        }
       

        return (
            <div className="dashContentChildContainer" >
                <Carousel>{myRecipesDisplay}</Carousel>
            </div>
        )
    }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getFavorites, getMyRecipes})(MyRecipes);