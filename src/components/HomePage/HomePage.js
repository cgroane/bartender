import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {getAllRecipes} from './../../ducks/reducer';

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
                

            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getAllRecipes}) (HomePage);