import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites} from '../../ducks/reducer';
import { ListGroupItem, ListGroup, Button, PageHeader, Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';





class Favorites extends Component {
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
        // if statement to check recipe.user_id against this.props.user_id --> show edit/delete buttons on recipes if so.
        
       if (this.props.favorites.length > 0) { 
           
        var favoritesDisplay = this.props.favorites.map((cur, ind) => (
            <Carousel.Item key={ind}>
                        <img width={900} height={500} alt="900x500" src={cur.image_url}/>
                    <Link to={`/${cur.recipe_id}/recipe_details`} key={ind} >
                        <Carousel.Caption>
                            <h3>{cur.recipe_title}</h3>
                            <p>{cur.recipe_description}</p>
                        </Carousel.Caption>
                    </Link>
                    {/* add edit button -- redirect or popup edit modal, get recipe_id, ingredients, steps for recipe */}
                    </Carousel.Item>
        ))
    } else {
        var favoritesDisplay = "You have no favorites to display";
    }
        

        return (
            <div className="dashContentChildContainer" >
                
                <Carousel> {favoritesDisplay}</Carousel>
            </div>
        )
    }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getFavorites})(Favorites);