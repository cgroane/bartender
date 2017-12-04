import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Grid, Row} from 'react-bootstrap';
import BrowseTile from './BrowseTile/BrowseTile';
import {getAllRecipes, requestUser} from './../../ducks/reducer';

import connectWithTransitionGroup from 'connect-with-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group';
import './Browse.css';


class Browse extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getAllRecipes()
        this.props.requestUser();
    }
    render() {
        // console.log(this.props);
        
        const browseTileList = this.props.allRecipes.map((cur, ind) => {
            return (
            <ReactTransitionGroup component="div">
                <BrowseTile key={ind} title={cur.recipe_title} descript={cur.recipe_description} rec_id={cur.recipe_id} pic={cur.image_url} servesAmt={cur.serves} getAllRecipes={this.props.getAllRecipes} />
            </ReactTransitionGroup>
        )
    })
        return (
            
            <div className="browseGrid" >
                {browseTileList}
            </div>
            
        )
    }
}

const mapStateToProps = state => state;

export default connectWithTransitionGroup(connect(mapStateToProps,{getAllRecipes, requestUser}, null, {withRef: true})(Browse));