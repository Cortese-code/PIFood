import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from '../actions/index';
import { Link } from 'react-router-dom'
import "./recipedetails.css";
//(/<[^>]*>/g, '')


export default function RecipeDetails(props) {
    console.log(props)

    const dispatch = useDispatch();
    const id = props.match.params.id;

    const recipeDetails = useSelector((state) => state.recipeDetails);
    //console.log(recipeDetails)


    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch, id]);



 return(
    <div className="details" key={id}>
    <di>
        {recipeDetails.length > 0 ?
         <div>
         <div className="divimg">
         <div className="divimg">
                <img className="detailImg" 
                src={recipeDetails[0].image ? 
                recipeDetails[0].image : 
                'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found"/>
            </div>

            </div>

             <h2 className="texts">Nombre: {recipeDetails[0].name}</h2>
             <h2 className="texts" >Hola</h2>


            <div className="ddsh">
                <h2 className="texts">tipos de dietas: </h2> 
                {recipeDetails[0].dietTypes ? recipeDetails[0].dietTypes.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e}</h2>
                    )
                }) :
                recipeDetails[0].diets?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e.name}>{e.name}</h2>
                    )
                })}
            </div>

             <div className="ddsh">
                <h3 className="texts">Resumen: </h3>
                <p className="summary">{recipeDetails[0].summary}</p>
            </div>

             <h2 className="scores">Puntuación salud: {recipeDetails[0].healthScore}</h2>

            {recipeDetails[0].dishTypes ?
               <div className="ddsh">
                   <h2 className="texts">Tipos de platos: </h2>
                  {recipeDetails[0].dishTypes?.map(e => {
                      return(
                          <h2 className="dishesanddiets" key={e}>{e}</h2>
                      )
                  })}
                  </div> :
            <br />
            }

             <div className="ddsh">
                <h3 className="texts">Pasos: </h3>
                <ul  className="steps">{Array.isArray(recipeDetails[0].steps) ? recipeDetails[0].steps.map(e => {
                    return(
                        <li>
                        <li  key={e.number}>{e.step}</li>
                        </li>
                        )
                }) :
                <li>{recipeDetails[0].steps}</li>
                }</ul>
            </div>

            <Link to="/home"><button className="backButton">Volver a recetas</button></Link>
         </div>: <p>Loading...</p>

        }
    </di>
</div>


  )
}