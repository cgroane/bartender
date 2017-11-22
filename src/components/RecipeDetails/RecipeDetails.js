import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import CommentsTile from './CommentsTile/CommentsTile';
import EditModal from './EditModal/EditModal';
import {getSteps, getIngredients, requestUser, updateComment, getComments, hideEditRecipeModal, showEditRecipeModal} from './../../ducks/reducer';
import './RecipeDetails.css';


class RecipeDetails extends Component {
    constructor(props, history) {
        super(props);
        this.state = {
            newComment: '',
            // showModal: false
        }

        this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
        this.handleComment = this.handleComment.bind(this);
        // this.handleEdit = this.handleEdit.bind(this);
    }
    componentDidMount() {
    this.props.requestUser();
    this.props.getSteps(this.props.match.params.recipe_id);
    this.props.getIngredients(this.props.match.params.recipe_id);
    this.props.getComments(this.props.match.params.recipe_id);

    // this.setState({showModal: false});
    }
    
    
    // handleEditOpen() {
    //     this.setState({showModal:true})
    // }
    // handleEditClose() {
    //     this.setState({showModal:false})
    // }
    // handleEditSave() {
    //     this.setState({showModal:false})
    // }
        

    handleAddToFavorites() {
        
        var drinkToAdd = {
            recipe_id: this.props.match.params.recipe_id
        }
        axios.post(`/api/favorites/${this.props.user.user_id}`, drinkToAdd).then(response => response.data);
    }

    handleComment() {
        //axios post object --> pass in user id, comment, recipe id
        var commentToAdd = {
            user_id: this.props.user.user_id,
            content: this.state.newComment
        }
        console.log(this.state.newComment)
       if (commentToAdd.content.length == 0) alert('Comment is empty. Cannot add empty comment.');
        axios.post(`/api/comments/${this.props.match.params.recipe_id}`, commentToAdd).then(response => response.data).then(() => this.props.getComments(this.props.match.params.recipe_id));
    }
    commentChange(comment) {
        this.setState({newComment: comment});
    }

    // handleEdit() {
    //     console.log(this.props);
    //     this.props.showEditRecipeModal();
    // }

    
    render() {
        // console.log(this.props);
        
        if (this.props.showRecipeModal === true) {
            var viewModal = <EditModal rec_id={this.props.match.params.recipe_id}/>
        }
        else {
             var viewModal = null;
        }

        if(this.props.allRecipes.length){
            var drink = this.props.allRecipes.find(rec => rec.recipe_id == this.props.match.params.recipe_id);
            var {
                recipe_title,
                recipe_description,
                serves,
                image_url,
                recipe_id,
                username,
                user_id
            } = drink;
        }
        if (drink.user_id == this.props.user.user_id) {
            var addToFavoritesButton = null
        }
        else {
            var addToFavoritesButton = <Button onClick={this.handleAddToFavorites} >Add to favorites</Button>
        }

        if (this.props.comments.length > 0) {
            var commentsDisplay = this.props.comments.map((cur, ind) => {
                return (
                    <div className="commentContainer" key={ind}>
                        <CommentsTile username={cur.username} content={cur.content}  />
                    </div>
                )
            })
        }
        else {
            var commentsDisplay = <div><span>This recipe has no comments yet. Add your thoughts below!</span></div>
        }
        if (this.props.user.user_id == drink.user_id) {
            var editButton = <Button onClick={() => this.props.showEditRecipeModal()} >Edit this recipe</Button>
        }
        else {
            var editButton = null;
        }
        var stepsDisplay = this.props.recipeSteps.map((cur, ind) => {
            return (
                <div key={ind} >
                    <span>{cur.step_number}</span>
                </div>
            )
        })
        var ingredientDisplay = this.props.recipeIngredients.map((cur, ind) => {
            return (
                <div key={ind}>
                    <span>{cur.title}</span>
                </div>
            )
        })


        return (
            <div className="recipeDetailsContainer" >
                
                <div className="recipeInfo">
                    <div className="recipeTitle"><h1>{recipe_title}</h1></div>
                    <div className="recipeDescription" >{recipe_description}</div>
                    <div className="amountServed" >Serves: {serves}</div>
                    <div className="addedBy" >Recipe Added By: {username}</div>
                    <div className="recipeDetailsButtonContainer" >
                        {addToFavoritesButton}
                        {editButton}
                        {stepsDisplay}
                        {ingredientDisplay}
                    </div>

                    <hr/>
                </div>
                <div className="commentsContainer" >
                    <div className="commentsList" >
                        {commentsDisplay}
                    </div>
                    <div className="newComment" >
                        <textarea placeholder="Leave a comment..."  onChange={(e) => this.commentChange(e.target.value)} ></textarea>
                        <Button onClick={this.handleComment} bsStyle="primary"  >Comment</Button>
                    </div>

                <div>{viewModal}</div>

                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getSteps, getIngredients, requestUser, updateComment, getComments, hideEditRecipeModal, showEditRecipeModal})(RecipeDetails);