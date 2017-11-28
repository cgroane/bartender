import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Col, Thumbnail} from 'react-bootstrap';
import {getAllRecipes} from './../../../ducks/reducer';
import './BrowseTile.css';

class BrowseTile extends Component {
    constructor(props)   {
        super(props)
    }
    componentDidMount() {
        this.props.getAllRecipes();

    }
    render() {

        // console.log(this.props)
        // if statement to check recipe.user_id against this.props.user_id --> show edit/delete buttons on recipes if so.
        

        return(
            <div className="browseCard" >
                <Link to={`/${this.props.rec_id}/recipe_details`} >
                    <img src={`${this.props.pic}`} alt="242x200" className="browseCardImage" />
                    <div className="browseCardText" >
                        <h3 className="browseTile" >
                            {this.props.title}
                        </h3>
                    </div>
                </Link>   
            </div>

        )
    }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {getAllRecipes})(BrowseTile)