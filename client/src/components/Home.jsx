import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietTypeFilter, aplhabeticalSort, scoreSort } from '../actions';
import Recipe from './Recipe';
import { Link } from 'react-router-dom';
import Paged from './Paged';
import SearchBar from './SearchBar';
import "./Home.css";
//https://docs.google.com/spreadsheets/d/1DIJv-XCkN96Fwjsww8yQ2bntGw-pU2lWbK6pLUNTqss/edit#gid=0
//8df14781f39448e9b2ddb27b1de11022
//38b5ef3e7cd87b073347e9f404f739
//d8852f85727b409f910bcff02541ef7a
//89bbde8814b04233bf2889999d3befc3
//9139b06fbefb401b9f6cffe0d08c30ac
//d0ef260d578844baa461c709a901c0ec
//3306a9936ee6433e8d0ec413ddd6eee7
//8edd8f334ea84d91ac65367c90f951b5
//4a4548f5fd0a4b908e18beff840ffa9c
//2789b0af6cdc450481b9c4682bb87af2
//3b37e9647af74cbea0e5c7953103e4ee&number=100&addRecipeInformation=true

export default function Home(){


    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    const [Order, setOrder] = useState('')


    const [page, setPage] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    const quantityRecipesPage = page * recipesPage;
    const firstRecipePage = quantityRecipesPage - recipesPage;
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);

    const paged = function(pageNumber) {
        setPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    //Volver a actualizar las recetas
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setPage(1);
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietTypeFilter(e.target.value))
        setPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();
        dispatch(aplhabeticalSort(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    function handleScoreSort(e) {
        e.preventDefault();
        dispatch(scoreSort(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }



    return(

       <div className="home">
        <h2 className="initialMsg">  __Adelante tú puedes!</h2>

        <div>
            <button className="refreshButton" onClick={handleClick}>Actualizar Receta</button>
            <Link to="/recipe">
                <button className="addButton">Añadir nueva Receta</button>
            </Link>
        </div>
        <div className="select">
            <label className="filters">Clasificar:</label>
            <select className="select" name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                <option disabled selected>Alfabético</option>
                <option value="atoz">A a Z</option>
                <option value="ztoa">Z a A</option>
            </select>
            <select className="select" name="numerical" onChange={e => handleScoreSort(e)}>
                <option disabled selected>Puntaje</option>
                <option value="asc">Min a Max</option>
                <option value="desc">Max a Min</option>
            </select>
            <label className="filters">Tipos/Dietas:</label>
            <select className="select" name="diets" onChange={e => handleDietTypeFilter(e)}>
                <option disabled selected>Select...</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Keto</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto vegetarian">Lacto-Vegetarian</option>
                <option value="ovo vegetarian">Ovo-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="paleolithic">Paleo</option>
                <option value="primal">Primal</option>
                <option value="low fodmap">Low FODMAP</option>
                <option value="whole 30">Whole30</option>
            </select>
        </div>

        <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

        <SearchBar/>
        <Link to="/"><button className="backButton">Vover Inicio</button></Link>
        {/* <Link to="/home"><button className="backButton">Volver </button></Link>  */}

        <div className="allrecipes">
        {
            showRecipesPage?.map(e => {
                return (
                    <div className="eachRecipe" key={prevId++}>

                           <Link className="linkRecetas" to={`home/${e.id}`}>
                            <Recipe
                                image={e.image ?
                                    e.image :
                                    'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'}
                                name={e.name}
                                dietTypes={e.dietTypes}
                                />
                            </Link>
                    </div>
                )
            })
        }
        </div>

    </div>

    )
}
let prevId = 1;