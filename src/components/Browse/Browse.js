import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Grid, Row} from 'react-bootstrap';
import BrowseTile from './BrowseTile/BrowseTile';
import {getAllRecipes, requestUser} from './../../ducks/reducer';


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
            return (<BrowseTile key={ind} title={cur.recipe_title} descript={cur.recipe_description} rec_id={cur.recipe_id} pic={cur.image_url} servesAmt={cur.serves} />)
    })
        return (
            <Grid className="browseGrid" >
            <Row>
                {browseTileList}
            </Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{getAllRecipes, requestUser})(Browse);