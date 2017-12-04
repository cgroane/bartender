import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SearchResult from './SearchResult/SearchResult';
import {requestUser, getFavorites, updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage, searchRecipes} from '../../ducks/reducer';

import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.searchResults.length > 0) {
            var searchDisplay = (
                this.props.searchResults.map((cur, ind) => {
                    return (
                       <SearchResult key={ind} title={cur.recipe_title} descript={cur.recipe_description} rec_id={cur.recipe_id} pic={cur.image_url} servesAmt={cur.serves} />
                    )
                })
            )
        } else {
            var searchDisplay = (
                <h1>No Recipes found with that ingredient. Sorry, fam.</h1>
            )
        }
        return(
            <div className="browseGrid" >
                {searchDisplay}
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {requestUser, getFavorites, updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage, searchRecipes})(Search)