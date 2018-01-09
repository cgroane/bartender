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
        
        BrowseAnimation.show(this.browseCards, cb)
    }
    componentDidAppear() {
        
    }
    componentDidEnter(){
        
    }


    componentDidMount() {
        this.props.getAllRecipes();

    }
    render() {

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