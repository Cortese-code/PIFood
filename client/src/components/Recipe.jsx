import React from "react";
import './Recipe.css';


let prevId = 1;

export default function Recipe(recipes) {
    const { image, name, dietTypes, creado } = recipes

    return (
        <div className="recipe">

            <div>
                <h2 className="recipeName">{name}</h2>
                <h3>Hola</h3>
            </div>
            <div>
                <h2  className="recipeName">{creado}</h2>
            </div>

            <div>
                <img className="recipeImg" src={image} alt="Not"/>
            </div>

            <div className="dietcointainer">
                {dietTypes?.map(e => {
                    return (
                        <h5 className="diets" key={prevId++}>{e}</h5>
                    )
                })}
            </div>
        </div>
    )
};