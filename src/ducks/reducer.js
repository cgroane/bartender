import axios from "axios";


// import { O_APPEND } from "constants";



// action constants
const REQ_USER = "REQ_USER";
const GET_RECOMMENDED = "GET_RECOMMENDED";
const GET_FAVORITES = "GET_FAVORITES";
const FAV_TOGGLE = "FAV_TOGGLE";
const UPDATE_SEARCH_TERMS = "UPDATE_SEARCH_TERMS";
const SUBMIT_SEARCH = "SUBMIT_SEARCH";
const MY_RECIPES = "MY_RECIPES";
const USER_TASTES = "USER_TASTES";
const GET_ALL_RECIPES = "GET_ALL_RECIPES";
const GET_STEPS = "GET_STEPS";
const GET_INGREDIENTS = "GET_INGREDIENTS";
const UPDATE_RECIPE_TITLE = "UPDATE_RECIPE_TITLE";
const UPDATE_RECIPE_DESCRIPTION = "UPDATE_RECIPE_DESCRIPTION";
const UPDATE_RECIPE_SERVES = "UPDATE_RECIPE_SERVES";
const UPDATE_IMAGE_URL = "UPDATE_IMAGE_URL";
const ADD_RECIPE_INGREDIENTS = "ADD_RECIPE_INGREDIENTS";
const ADD_RECIPE_STEPS = "ADD_RECIPE_STEPS";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const GET_COMMENTS = "GET_COMMENTS";
const SHOW_EDIT_RECIPE_MODAL= "SHOW_EDIT_RECIPE_MODAL";
const HIDE_EDIT_RECIPE_MODAL= "HIDE_EDIT_RECIPE_MODAL";
const SHOW_USER_EDIT_MODAL = "SHOW_USER_EDIT_MODAL";
const HIDE_USER_EDIT_MODAL = "HIDE_USER_EDIT_MODAL";
const UPDATE_EDIT_USERNAME = "UPDATE_EDIT_USERNAME";
const UPDATE_EDIT_USER_IMAGE = "UPDATE_EDIT_USER_IMAGE";
const UPDATE_USER_SAVE =  "UPDATE_USER_SAVE";
const LOAD_EDIT_DATA = "LOAD_EDIT_DATA";
const SHOW_NAV_OVERLAY = "SHOW_NAV_OVERLAY";
const HIDE_NAV_OVERLAY = "HIDE_NAV_OVERLAY";
const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";


//action creators

// var userInfo = {};
// function getUserData() {
//     axios.get(`/api/me`).then(response => {
//         userInfo.user = response.data;
//         console.log(response.data)
//         return axios.get(`/api/favorites/${userInfo.user.user_id}`).then(response => {
//             userInfo.favorites = response.data;
//             return userInfo
//         })
//     })
// }
export function searchRecipes(search_terms) {
    return {
        type: GET_SEARCH_RESULTS,
        payload: axios.get(`/api/recipes/search/${search_terms.toLowerCase()}`).then(response => response.data)
    }
}
export function showNav() {
    return {
        type: SHOW_NAV_OVERLAY,
        payload: true
    }
}
export function hideNav() {
    return {
        type: HIDE_NAV_OVERLAY,
        payload: false
    }
}
export function loadEditData(userObj) {
    return {
        type: LOAD_EDIT_DATA,
        payload: userObj
    }
}
export function handleUserEditSave(id, userObj) {
    return {
        type: UPDATE_USER_SAVE,
        payload: axios.put(`/api/users/${id}/edit`, userObj).then(response => response.data )
    }
}

export function updateEditUsername(username) {
    return {
        type: UPDATE_EDIT_USERNAME,
        payload: username
    }
}
export function updateEditUserImage(imageURL) {
    return {
        type: UPDATE_EDIT_USER_IMAGE,
        payload: imageURL
    }
}
export function showUserModal() {
    return {
        type: SHOW_USER_EDIT_MODAL,
        payload: true
    }
}
export function hideUserModal() {
    return {
        type: HIDE_USER_EDIT_MODAL,
        payload: false
    }
}
export function showEditRecipeModal() {
    return {
        type: SHOW_EDIT_RECIPE_MODAL,
        payload: true
    }
}
export function hideEditRecipeModal() {
    return {
        type: HIDE_EDIT_RECIPE_MODAL,
        payload: false
    }
}
export function getComments(id) {
    return {
        type: GET_COMMENTS,
        payload: axios.get(`/api/comments/${id}`).then(response => response.data)
    }
}
export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}
export function addIngredients(array) {
    return {
        type: ADD_RECIPE_INGREDIENTS,
        payload: array
    }
}
export function addSteps(array) {
    return {
        type: ADD_RECIPE_STEPS,
        payload: array
    }
}
export function updateRecipeImage(url) {
    return {
        type: UPDATE_IMAGE_URL,
        payload: url
    }
}
export function updateRecipeServes(serves) {
    
    return {
        type: UPDATE_RECIPE_SERVES,
        payload: serves
    }
}
export function updateRecipeDescription(descript) {
    return {
        type: UPDATE_RECIPE_DESCRIPTION,
        payload: descript
    }
}
export function updateRecipeTitle(title) {
    return {
        type: UPDATE_RECIPE_TITLE,
        payload: title
    }
}

export function requestUser() {
    
    return {
        type: REQ_USER,
        payload: axios.get(`/api/me`).then(response => {
        //    console.log(response.data)
            return getFavorites(response.data.user_id) && getMyRecipes(response.data.user_id) && getUserTastes(response.data.user_id) && getAllRecipes() && response.data;
        })
    }
}

export function getRecommended(title) {
    return {
        type: GET_RECOMMENDED,
        payload: axios.get(`/api/recipes/${title}/recommended`).then(response => {
            if(response.data.length !== 0){
                // console.log("not a zero length recommended")
            console.log(response.data[0])
            return response.data[0].recipe_title
                    
            }
            // console.log("zero length recommended response")
            return response
        })
    }
}

export function getMyRecipes(user_id) {
    
    return {
        type: MY_RECIPES,
        payload: axios.get(`/api/recipes/${user_id}`).then(response => response.data)
    }
}

export function getFavorites(user_id) {
    // console.log(user_id)
    return {
        type: GET_FAVORITES,
        payload: axios.get(`/api/favorites/${user_id}`).then(response => response.data)
    }
}

export function updateSearchTerms(searchTerms) {
    
    return {
        type: UPDATE_SEARCH_TERMS,
        payload: searchTerms
    }
}
export function getUserTastes(user_id) {
    return {
        type: USER_TASTES,
        payload: axios.get(`/api/users/${user_id}/tastes`).then(response => {
            return getRecommended(response.data.recipe_title) &&    
            response.data
        })
    }
}

export function getAllRecipes() {
    return {
        type: GET_ALL_RECIPES,
        payload: axios.get(`/api/recipes`).then(response => response.data)
    }
}

export function getSteps(id) {
    return {
        type: GET_STEPS,
        payload: axios.get(`/api/steps/${id}`).then(response => response.data)
    }
}

export function getIngredients(id) {
    return {
        type: GET_INGREDIENTS,
        payload: axios.get(`/api/ingredients/${id}`).then(response => response.data)
    }
}


// export function submitSearch(searchTerms) {
//     return {
//         type: SUBMIT_SEARCH,
//         payload: 
//     }
// }



//initial state

const initialState = {
    user: {},
    recommended: [],
    favorites: [],
    getFavClicked: false,
    searchTerms: '',
    myRecipes: [],
    userTastes: [],
    allRecipes: [],
    recipeSteps: [],
    recipeIngredients: [],
    recipeAddDescription: '',
    recipeAddTitle: '',
    recipeAddServes: 0,
    recipeAddImage: '',
    recipeToAdd: {},
    addRecipeIngredients: [],
    addRecipeSteps: [],
    newComment: '',
    comments: [],
    showRecipeModal: false,
    showUserEditModal: false,
    editUser: {
        username: '',
        image_url: ''
    },
    showNavOverlay: false,
    searchResults: []
};

//reducer


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case REQ_USER + '_PENDING':
            return Object.assign({}, state, {isLoading: true})
        case REQ_USER + '_FULFILLED': 
            return Object.assign({}, state, { isLoading: false, user: action.payload })
        case GET_RECOMMENDED +"_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_RECOMMENDED + "_FULFILLED":
            return Object.assign({}, state, {recommended: action.payload, isLoading:false})
        
            // [...state.recommended, ...action.payload]
        case GET_FAVORITES + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_FAVORITES + "_FULFILLED":
            return Object.assign({}, state, {favorites: action.payload, isLoading: false, getFavClicked: true,})
        case MY_RECIPES + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case MY_RECIPES + "_FULFILLED":
            return Object.assign({}, state, {myRecipes: action.payload, isLoading:false})
        case USER_TASTES + "_PENDING": 
            return Object.assign({}, state, {isLoading: true})
        case USER_TASTES + "_FULFILLED":
            return Object.assign({}, state, {userTastes: action.payload, isLoading:false})
        case GET_ALL_RECIPES + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_ALL_RECIPES + "_FULFILLED":
            return Object.assign({}, state, {allRecipes: action.payload, isLoading: false})
        case GET_STEPS + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_STEPS + "_FULFILLED":
            return Object.assign({}, state, {recipeSteps: action.payload, isLoading:false})
        case GET_INGREDIENTS + "_PENDING":
            return Object.assign({},state, {isLoading: true})
        case GET_INGREDIENTS + "_FULFILLED":
            return Object.assign({}, state, {recipeIngredients: action.payload, isLoading: false})
        case UPDATE_SEARCH_TERMS:
            return Object.assign({}, state, {searchTerms: action.payload})
        case UPDATE_RECIPE_DESCRIPTION:
            return Object.assign({}, state, {recipeAddDescription: action.payload})
        case UPDATE_RECIPE_SERVES:
            return Object.assign({}, state, {recipeAddServes: action.payload})
        case UPDATE_RECIPE_TITLE:
            return Object.assign({}, state, {recipeAddTitle: action.payload})
        case UPDATE_SEARCH_TERMS:
            return Object.assign({},state, {searchTerms: action.payload});
        case UPDATE_IMAGE_URL: 
            return Object.assign({}, state, {recipeAddImage: action.payload})
        case ADD_RECIPE_INGREDIENTS:
            return Object.assign({}, state, {addRecipeIngredients: action.payload})
        case ADD_RECIPE_STEPS:
            return Object.assign({}, state, {addRecipeSteps: action.payload})
        case UPDATE_COMMENT:
            return Object.assign({}, state, {newComment: action.payload})
        case GET_COMMENTS + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_COMMENTS + "_FULFILLED":
            return Object.assign({}, state, {comments: action.payload, isLoading: false})
        case SHOW_EDIT_RECIPE_MODAL:
            return Object.assign({}, state, {showRecipeModal: action.payload})
        case HIDE_EDIT_RECIPE_MODAL:
            return Object.assign({}, state, {showRecipeModal: action.payload})
        case SHOW_USER_EDIT_MODAL:
            return Object.assign({}, state, {showUserEditModal: action.payload})
        case HIDE_USER_EDIT_MODAL:
            return Object.assign({}, state, {showUserEditModal: action.payload})
        case UPDATE_EDIT_USER_IMAGE:
            {
                var editUserData = Object.assign({}, state.editUser);
                editUserData.image_url = action.payload
                return Object.assign({},state,{editUser: editUserData})
            }
        case UPDATE_EDIT_USERNAME:
            {
                var editUserData = Object.assign({}, state.editUser);
                editUserData.username = action.payload
                return Object.assign({}, state, {editUser: editUserData})
            }
        case UPDATE_USER_SAVE + "_PENDING":
            return Object.assign({}, state, {isLoading:true})
        case UPDATE_USER_SAVE + "_FULFILLED":
            
            return Object.assign({}, state, {user: action.payload})
        case LOAD_EDIT_DATA:
            {
                var editUserData = Object.assign({}, state.editUser)
                editUserData = action.payload
                return Object.assign({}, state, {editUser:editUserData})
            }
        case SHOW_NAV_OVERLAY:
            return Object.assign({}, state, {showNavOverlay: action.payload})
        case HIDE_NAV_OVERLAY:
            return Object.assign({}, state, {showNavOverlay: action.payload})
        case GET_SEARCH_RESULTS + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_SEARCH_RESULTS + "_FULFILLED":
            return Object.assign({}, state, {searchResults: action.payload, isLoading: false})
         default:
            return state;
    }
    return state;
}