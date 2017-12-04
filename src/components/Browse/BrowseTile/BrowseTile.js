import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Col, Thumbnail} from 'react-bootstrap';

import BrowseAnimation from './BrowseAnimation';
import ReactTransitionGroup from 'react-addons-transition-group';
import './BrowseTile.css';

class BrowseTile extends Component {
    constructor(props)   {
        super(props)
    }
    componentWillAppear(cb) {
        console.log('cb')
        BrowseAnimation.show(this.browseCards, cb)
    }
    componentDidAppear() {
        console.log('cb')
    }
    componentDidEnter(){
        console.log('cb')
    }


    componentDidMount() {
        this.props.getAllRecipes();

    }
    render() {

        // console.log(this.props)
        // if statement to check recipe.user_id against this.props.user_id --> show edit/delete buttons on recipes if so.
        

        return(
            <div className="browseCard" ref={ref => this.browseCards = ref} >
                
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

export default connect(mapStateToProps)(BrowseTile)