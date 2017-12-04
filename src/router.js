import React from 'react';
import {Switch, Route} from 'react-router-dom';
import UserDash from './components/UserDash/UserDash';
import {Provider} from 'react-redux';
import store from './store';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import HomePage from './components/HomePage/HomePage';
import Browse from './components/Browse/Browse';
import Search from './components/Search/Search';


export default (
    
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path="/dashboard" component={UserDash}/>
            <Route path="/login" component={Nav}/>
            <Route path="/new_recipe" component={AddRecipe}/>
            <Route path="/:recipe_id/recipe_details" component={RecipeDetails}/>
            <Route path="/browse" component={Browse}/>
            <Route path="/search_results" component={Search} />
            <Route component={Nav}/>
        </Switch>
    
)