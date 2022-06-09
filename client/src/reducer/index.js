import { GET_RECIPES, ADD_RECIPE, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_NAME, GET_DIET_TYPES, GET_RECIPE_DETAILS } from '../actions/constantes'

const initialState = {
    recipes: [],
    allRecipes: [],
    dietTypes: [],
    recipeDetails: [],
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
          return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
          };

         case DIET_TYPE_FILTER:
          const allRecipes = state.allRecipes;
          const filteredByDietType = allRecipes.filter(r => r.dietTypes?.some(d => d === action.payload)) 
          return {
            ...state,
            recipes: filteredByDietType
          }; 

        case ALPHABETICAL_SORT:
          let sortedRecipes = [...state.recipes]
          sortedRecipes = action.payload === 'atoz' ?
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          });
          return {
            ...state,
            recipes: sortedRecipes
          };

        case SCORE_SORT:
          let sortedRecipesByScore = [...state.recipes]
          sortedRecipesByScore = action.payload === 'asc' ?
          state.recipes.sort(function(a, b) {
            if(a.healthScore > b.healthScore){
              return 1
          }
           if(b.healthScore > a.healthScore){
              return -1;
          }
              return 0
      }) :
      state.recipes.sort(function (a,b){
      if(a.healthScore > b.healthScore){
          return -1
      }
      if(b.healthScore > a.healthScore){
          return 1
      }
          return 0
      })
          return {
            ...state,
            recipes: sortedRecipesByScore
          };


        case SEARCH_NAME:
          return {
            ...state,
            recipes: action.payload
          };

        case GET_RECIPE_DETAILS:
          return {
            ...state,
            recipeDetails: action.payload
          };


        case ADD_RECIPE:
          return {
            ...state,
          }

        case GET_DIET_TYPES:
          return {
            ...state,
            dietTypes: action.payload
          }

        default:
          return state;
    }
  }