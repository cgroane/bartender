import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestUser, getFavorites, updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage} from '../../ducks/reducer';
import {Form, inline, horizontal, FormControl, ControlLabel, Col, FormGroup, Label, Button} from 'react-bootstrap';
import './AddRecipe.css';
import { loadavg } from 'os';


class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            ingredientCount: 1,
            inputStepsArray: [{step_number: 0, step_description: '',}],
            stepCount: 1,
            disableStepsIngredients: true,
            steps: [],
            ingredients: [],
            showModal: false,
            recSaved: false,
            recipeAdded: {},
            inputIngredientsArray: [
                {
                    quantity: '', unit: '', title: '', recipe_id: null
                }
            ]
        }

        this.handleRecipeSave = this.handleRecipeSave.bind(this);
        this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
        this.handleStepAdd = this.handleStepAdd.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
    }

    componentDidMount() {
        this.setState({recSaved:false})
    }
    
    handleRecipeSave() {
        console.log(this.props)
        
        const {recipeAddTitle, recipeAddDescription, recipeAddImage, recipeAddServes} = this.props;
        var recipe = {
            recipe_title: recipeAddTitle,
            recipe_description: recipeAddDescription,
            image_url: recipeAddImage,
            serves: recipeAddServes
        }
        axios.post(`/api/recipes/${this.props.user.user_id}`, recipe).then(response => {
            let tempArr = this.state.inputIngredientsArray.slice()
            let tempArr1 = this.state.inputStepsArray.slice()
            tempArr[0].recipe_id = response.data[0].recipe_id;
            tempArr1[0].recipe_id = response.data[0].recipe_id;
            return this.setState({recipeAdded: response.data[0], inputIngredientsArray: tempArr, inputStepsArray:tempArr1})
        } )
        this.setState({recSaved: true})
    }

    handleIngredientAdd() {
        this.setState({inputIngredientsArray: this.state.inputIngredientsArray.concat({quantity: '', unit: '', title: '', recipe_id: this.state.recipeAdded.recipe_id})});
    }

    handleStepAdd() {
        this.setState({inputStepsArray: this.state.inputStepsArray.concat({step_number: 0, step_description: '', recipe_id: this.state.recipeAdded.recipe_id}), stepCount: this.state.stepCount++});
    }

    handleRemoveIngredient(index) {
        this.setState({inputIngredientsArray: this.state.inputIngredientsArray.splice(index, 1)})
    }

    handleIngredientChange(value, index, property) {
        // let ingredient = Object.assign({}, this.state.inputIngredientsArray[index])
        // ingredient.property = value
        var tempArr = this.state.inputIngredientsArray.slice()
        tempArr[index][property] = value;
        this.setState({inputIngredientsArray: tempArr}, console.log(this.state.inputIngredientsArray));

    }
    handleStepsChange(value, index, property) {
        // let ingredient = Object.assign({}, this.state.inputIngredientsArray[index])
        // ingredient.property = value
        var tempArr = this.state.inputStepsArray.slice()
        tempArr[index][property] = value;
        this.setState({inputStepsArray: tempArr});

    }
   

    render() {
        function FieldGroup({id, label, ...props}) {
           return (
           <FormGroup controlId={id}>
                <ControlLabel>{Label}</ControlLabel>
                <FormControl {...props} />
            </FormGroup>
        )
    }
        if (this.state.recSaved){
        var ingredientsAddDisply = this.state.inputIngredientsArray.map((cur,ind) => {
            return (
                
                    <FormGroup controlId="formIngredientsQty" key={ind}>
                        <ControlLabel>Quantity</ControlLabel>
                        <FormControl placeholder="eg. 1/2, .5, 1, 1 and 3/4" onChange={(e) => this.handleIngredientChange(e.target.value, ind, "quantity")} />

                        <ControlLabel>Unit</ControlLabel>
                        <FormControl placeholder="eg. shot, tsp, ounce" onChange={(e) => this.handleIngredientChange(e.target.value, ind, "unit")} />

                        <ControlLabel>Title:</ControlLabel>
                        <FormControl placeholder="eg. shot, tsp, ounce" onChange={(e) => this.handleIngredientChange(e.target.value, ind, "title")} />
                        {/* <div onClick={this.handleRemoveIngredient(ind)}>-</div> */}
                    </FormGroup>
                    
                
                
            )
        })
    }
    else {
        var ingredientsAddDisplay =  <div>Save your recipe before adding ingredients</div>
        
    }

    if (this.state.recSaved){
    var stepsAddDisplay = this.state.inputStepsArray.map((cur, ind) => {
            return (
                
                    <FormGroup controlId="formStepsNumber" key={ind} >
                        <ControlLabel>Step Number:</ControlLabel>
                        <FormControl placeholder="use a number" onChange={(e) => this.handleStepsChange(e.target.value, ind, "step_number")} />

                        <ControlLabel>Description</ControlLabel>
                        <FormControl placeholder="describe this process in detail" onChange={(e) => this.handleStepsChange(e.target.value, ind, "step_description")} />
                    </FormGroup>
                
            )
        })
} else {
    var stepsAddDisplay = <div>Save your recipe before adding steps</div>
}


        return (
            <div>
                <form>
            <FormGroup controlId="formControlsText">
                <ControlLabel>Title</ControlLabel>
                <FormControl placeholder="Give your recipe a name!" onChange={(e) => this.props.updateRecipeTitle(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <ControlLabel>Description</ControlLabel>
                <FormControl placeholder="What's it all about" onChange={(e) => this.props.updateRecipeDescription(e.target.value)} />
            </FormGroup>

            <FormGroup controlId="formControlsText">
                <ControlLabel>Image URL</ControlLabel>
                <FormControl placeholder="Find a picture and paste the URL here" onChange={(e) => this.props.updateRecipeImage(e.target.value)} />
            </FormGroup>

            <FormGroup controlId="formControlsText">
                <ControlLabel>Serves</ControlLabel>
                <FormControl placeholder="How many people is this for" onChange={(e) => this.props.updateRecipeServes(e.target.value)} />
            </FormGroup>
           <div className="formButtonContainer" >
                <Button onClick={this.handleRecipeSave} >
                    Save
                </Button>
                <Button>
                    Cancel
                </Button>
            </div>
            <hr/>
            

        </form>
        <div>
        <Form inline >
            {ingredientsAddDisply}
        </Form>
            <div className="addIngredientButtonContainer" >
                <Button onClick={this.handleIngredientAdd} >+</Button>
                <Button onClick={this.handleIngredientsSave} >Save Ingredients List</Button>
            </div>
            {/* loop through the ingredientsAddDisplay */}
        </div>
        <hr/>
        <div>
            <Form inline>
                <div>{stepsAddDisplay}</div>
                <div><Button onClick={this.handleStepAdd} >Add another Step</Button></div>
                {/* loop through steps add display, access the value  */}
            </Form>
        </div>
                

            </div>
            
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getFavorites,updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage}) (AddRecipe);

// each ingredient text area is created with an index as the key
// create array on state -- every time a input area is created (quantity, unit, title) assign it as an object with properties - quantity, unit, title
// concatenate this onto state
// onchange event for each property
// the onchange has to know which is being changed and which object and property in the array needs to be updated
// onchange parameters (index, property)