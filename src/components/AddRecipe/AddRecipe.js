import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Collapsible from 'react-collapsible';
import {requestUser, getFavorites, updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage} from '../../ducks/reducer';
import {Form, inline, horizontal, FormControl, ControlLabel, Col, FormGroup, Label, Button, Collapse} from 'react-bootstrap';
import './AddRecipe.css';



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
        this.handleIngredientsSave = this.handleIngredientsSave.bind(this);
        this.handleStepsSave = this.handleStepsSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.setState({recSaved:false})
    }
    handleStepsSave() {
        for (var i =0; i<this.state.inputStepsArray.length; i++) {
            if (!this.state.inputStepsArray[i].step_number || !this.state.inputStepsArray[i].step_description || !this.state.inputStepsArray[i].recipe_id) {
             return alert("No blanks please")
         }
     }
        this.state.inputStepsArray.forEach((cur, ind) => {
            return axios.post(`/api/recipes/steps/${this.state.recipeAdded.recipe_id}`, cur).then(response => response.data)
        })
    }
    handleIngredientsSave() {
       for (var i =0; i<this.state.inputIngredientsArray.length; i++) {
           if (!this.state.inputIngredientsArray[i].quantity || !this.state.inputIngredientsArray[i].unit || !this.state.inputIngredientsArray[i].title || !this.state.inputIngredientsArray[i].recipe_id) {
            return alert("No blanks please")
        }
    }
        this.state.inputIngredientsArray.forEach((cur, ind) => {
                return axios.post(`/api/recipes/ingredients/${this.state.recipeAdded.recipe_id}`, cur).then(response => response.data)  
        })
    }
    
    handleRecipeSave(e) {
        
        e.preventDefault();
        
        const {recipeAddTitle, recipeAddDescription, recipeAddImage, recipeAddServes} = this.props;
        var recipe = {
            recipe_title: recipeAddTitle,
            recipe_description: recipeAddDescription,
            image_url: recipeAddImage,
            serves: recipeAddServes
        }
        for (var prop in recipe) {
            if(!recipe[prop]) {
                return alert("Fill in all recipe fields")
            }
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
        this.setState({inputIngredientsArray: tempArr});

    }
    handleStepsChange(value, index, property) {
        // let ingredient = Object.assign({}, this.state.inputIngredientsArray[index])
        // ingredient.property = value
        var tempArr = this.state.inputStepsArray.slice()
        tempArr[index][property] = value;
        this.setState({inputStepsArray: tempArr});

    }
    handleCancel() {
        
        if(this.state.recipeAdded.recipe_id) {
        axios.delete(`/api/recipes/${this.state.recipeAdded.recipe_id}`).then(response => response.data)
    } else {
        
    }
}
   

    render() {
     
        if (this.state.recSaved){
        var ingredientsAddDisply = this.state.inputIngredientsArray.map((cur,ind) => {
            return (
                
                    <form className="ingredientsForm" key={ind}>
                        <div className="ingredientInputContainer col-4" >
                            <input className="ingredientFormInput" type="text" placeholder="eg. 1/2, .5, 1, 1 and 3/4" onChange={(e) => this.handleIngredientChange(e.target.value, ind, "quantity")} />
                            <div className="ingredientFormLabelContainer" >
                                <span>Quantity</span>
                            </div>
                            
                        </div>
                        <div className="ingredientInputContainer col-4" >
                            <input className="ingredientFormInput" type="text" placeholder="eg. shot, tsp, ounce" onChange={(e) => this.handleIngredientChange(e.target.value, ind, "unit")} />
                            <div className="ingredientFormLabelContainer" >
                                <span>Unit</span>
                            </div>
                            
                        </div>
                        <div className="ingredientInputContainer col-4" >
                            <input className="ingredientFormInput" type="text" placeholder="eg. shot, tsp, ounce" onChange={(e) => this.handleIngredientChange(e.target.value, ind, "title")} />
                            <div className="ingredientFormLabelContainer" >
                                <span>Title:</span>
                            </div>
                            
                        </div>
                        {/* <div onClick={this.handleRemoveIngredient(ind)}>-</div> */}
                    </form>
                    
                
                
            )
        })
    }
    else {
        var ingredientsAddDisplay =  <div>Save your recipe before adding ingredients</div>
        
    }

    if (this.state.recSaved){
    var stepsAddDisplay = this.state.inputStepsArray.map((cur, ind) => {
            return (
                
                    <form className="stepsForm" key={ind} >
                        <div className="ingredientInputContainer col-6" >
                            <input type="text" className="ingredientFormInput" placeholder="use a number" onChange={(e) => this.handleStepsChange   (e.target.value, ind, "step_number")} />
                            <div className="ingredientFormLabelContainer" >
                                <span>Step Number:</span>
                            </div>
                        </div>
                        <div className="ingredientInputContainer col-6" >
                            <input type="text" className="ingredientFormInput" placeholder="describe this process in detail" onChange={(e) => this.handleStepsChange(e.target.value, ind, "step_description")} />
                            <div className="ingredientFormLabelContainer" >
                                <span>Description</span>
                            </div>
                        </div>
                    </form>
                
            )
        })
} else {
    var stepsAddDisplay = <div>Save your recipe before adding steps</div>
}
const recipeAddTrigger = (
    <div className="collapsibleCard" >
        <h2>Add Recipe</h2>
    </div>
)
const ingredientAddTrigger = (
    <div className="collapsibleCard" >
    <h2>Add Ingredients</h2>
</div>
)
const stepAddTrigger = (
    <div className="collapsibleCard" >
    <h2>Add Steps</h2>
</div>
)
if (this.state.recSaved)
    {var ingredientFormCollapsible = (
        <Collapsible trigger={ingredientAddTrigger} >  
        <div className="ingredientsContainer" >
            {ingredientsAddDisply}
        </div>
            <div className="formButtonContainer" >
                <button className="col-4" onClick={this.handleIngredientAdd} >ADD</button>
                <button className="col-4" onClick={this.handleIngredientsSave} >Save Ingredients List</button>
            </div>
            {/* loop through the ingredientsAddDisplay */}
        </Collapsible>
    )} else {
        var ingredientFormCollapsible = (
            <Collapsible trigger={ingredientAddTrigger} triggerDisabled={true} >  
            <div className="ingredientsContainer" >
                {ingredientsAddDisply}
            </div>
                <div className="formButtonContainer" >
                    <button className="col-4" onClick={this.handleIngredientAdd} >ADD</button>
                    <button className="col-4" onClick={this.handleIngredientsSave} >Save Ingredients List</button>
                </div>
                {/* loop through the ingredientsAddDisplay */}
            </Collapsible>
        )
    }
    if (this.state.recSaved) {
        var stepsFormCollapsible = (
            <Collapsible trigger={stepAddTrigger} > 
            <div className="stepsContainer" >
                {stepsAddDisplay}
            </div>
            
            <div  className="formButtonContainer" >
                <button onClick={this.handleStepAdd} >ADD</button>
                <button onClick={this.handleStepsSave} >Save Steps List</button>
            </div>
            {/* loop through steps add display, access the value  */}
        </Collapsible>
        )
    } else {
        var stepsFormCollapsible = (
            <Collapsible trigger={stepAddTrigger} triggerDisabled={true} > 
            <div className="stepsContainer" >
                {stepsAddDisplay}
            </div>
            
            <div  className="formButtonContainer" >
                <button onClick={this.handleStepAdd} >ADD</button>
                <button onClick={this.handleStepsSave} >Save Steps List</button>
            </div>
            {/* loop through steps add display, access the value  */}
        </Collapsible>
        )
    }

        return (
            
            <div className="addRecipe" id="recipeForm" >
               <Collapsible trigger={recipeAddTrigger} > 
                <form>
                    <div className="addRecipeForm" >
                        <div className="addRecipeFormLabelContainer" >
                            <span>Title:</span>
                        </div>
                        <input type="text" className="addRecipeFormTextbox" placeholder="Give your recipe a name!" onChange={(e) => this.props.updateRecipeTitle(e.target.value)} required />
                    </div>
                    <div className="addRecipeForm" >
                        <div className="addRecipeFormLabelContainer" >
                            <span>Description:</span>
                        </div>
                        <input type="text" className="addRecipeFormTextbox" placeholder="What's it all about?" onChange={(e) => this.props.updateRecipeDescription(e.target.value)} required />
                    </div>

                    <div className="addRecipeForm" >
                        <div className="addRecipeFormLabelContainer" >
                            <span>Image URL:</span>
                        </div>
                        <input type="text" className="addRecipeFormTextbox" placeholder="PASTE AN IMAGE URL HERE" onChange={(e) => this.props.updateRecipeImage(e.target.value)} required />
                    </div>

                    <div className="addRecipeForm" >
                        <div className="addRecipeFormLabelContainer" >
                            <span>SERVES:</span>
                        </div>
                        <input type="text" className="addRecipeFormTextbox" placeholder="How many people is this for" onChange={(e) => this.props.updateRecipeServes(e.target.value)} required />
                    </div>
           <div className="formButtonContainerRecipe" >
                <button onClick={this.handleRecipeSave}>
                    Save
                </button>
            </div>
    
            

        </form>
        </Collapsible>
        
        
        {ingredientFormCollapsible}
        {stepsFormCollapsible}
        
                <div className="cancelContainer" > 
                    <button onClick={this.handleCancel} >Cancel</button>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, getFavorites,updateRecipeDescription, updateRecipeServes, updateRecipeTitle, updateRecipeImage}) (AddRecipe);
