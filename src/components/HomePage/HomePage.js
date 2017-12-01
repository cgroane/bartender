import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import BartendTheWorld from './BartendTheWorld/BartendTheWorld';
import {getAllRecipes} from './../../ducks/reducer';
import connectWithTransitionGroup from 'connect-with-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group';

import './HomePage.css';


class HomePage extends Component {
    constructor(props) {
        super(props);

        
    }

    componentDidMount() {
        this.props.getAllRecipes();
    }

    render() {
        return (
            <div>
                <h1>
                    Home Page
                </h1>

                
                    <Link to="/browse" >
                        <Button>
                            See more!
                        </Button>
                    </Link>
                <ReactTransitionGroup component="div" >
                    <BartendTheWorld />
                </ReactTransitionGroup>

            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connectWithTransitionGroup( connect(mapStateToProps, {getAllRecipes}, null, {withRef: true}) (HomePage))