import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites, updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage, searchRecipes} from '../../../ducks/reducer';
import './SearchResult.css';


class SearchResult extends Component {
    constructor (props) {
        super(props);

    }
    render(){
        return (
            <div className="browseCard" >
                
                    <div className="browseCardImageContainer" >
                        <img src={`${this.props.pic}`} alt="242x200" className="browseCardImage" />
                    </div>
                    <Link to={`/${this.props.rec_id}/recipe_details`} >
                    <div className="browseCardText" >
                        <h3 className="browseTile" >
                            {this.props.title}
                        </h3>
                        <p>{this.props.descript}</p>
                    </div>
                </Link>   
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {requestUser, getFavorites, updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage, searchRecipes})(SearchResult)