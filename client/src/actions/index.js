import axios from "axios";
import { GET_RECIPES,
    SEARCH_NAME,
    DIET_TYPE_FILTER,
    ALPHABETICAL_SORT,
    SCORE_SORT,
    GET_RECIPE_DETAILS,
    GET_DIET_TYPES

} from "./constantes";

export function getRecipes() {
    return async function (dispatch) {
      let pedidoApi = await axios.get('http://localhost:3001/recipes')
         return dispatch({
               type: GET_RECIPES,
               payload: pedidoApi.data
            });
        };
    };



    export function searchBa(name) {
        return async function (dispatch) {
          try {
            var json = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
              type: SEARCH_NAME,
              payload: json.data,
            });
          } catch {
            return alert("No se encontró la receta");
          }
        };
      }

       export function getDietTypes() {
        return async function(dispatch) {
            try{
                var response = await axios.get('http://localhost:3001/types');
                return dispatch({
                  type: GET_DIET_TYPES,
                  payload: response.data.map(d => d.name)
                });
            } catch (error) {
                console.log(error)
            }
        }
    }

      export function addRecipe(payload) {
        return async function() {
                const response = await axios.post('http://localhost:3001/recipe', payload);
                console.log(response)
                return response;

        }
    }


     export function getRecipeDetails (id) {
        return async function (dispatch) {
            try {
                var json = await axios.get('http://localhost:3001/recipes/' + id);
               // console.log(json.data)
                return dispatch({
                  type: GET_RECIPE_DETAILS,
                  payload: json.data
                })
            } catch (error) {
                console.log(error)
            }
        }
    }; 
 


  export function dietTypeFilter(payload) {
        return {
            type: DIET_TYPE_FILTER,
            payload
        }
    };

    export function aplhabeticalSort(payload) {
        return {
            type: ALPHABETICAL_SORT,
            payload
        }
    };

    export function scoreSort(payload) {
        return {
            type: SCORE_SORT,
            payload
        }
    }