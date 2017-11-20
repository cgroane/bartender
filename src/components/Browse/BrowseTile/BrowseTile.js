import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {getAllRecipes} from './../../../ducks/reducer';

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
            <div>
                <Link to={`/${this.props.rec_id}/recipe_details`} >
                <div className="browseTile" >
                    {this.props.title}
                </div>
                </Link>
            </div>
        )
    }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {getAllRecipes})(BrowseTile)