import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from '../actions/index'
import './addRecipe.css';



function validate(input) {
    const errors = {};
    if (!input.name) errors.name = 'Complete con un nombre de receta';
    if (!input.summary) errors.summary = 'Agregar algun comentario sobre su receta';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'La puntuación debe ser un número entre	1 y 100';
    if (!input.steps.length) errors.steps = 'Por favor detalle los pasos para su receta';
    if (!input.dietTypes.length) errors.dietTypes = 'Debe seleccionar al menos un tipo de dieta';
    return errors;
};


export default function AddRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector((state) => state.dietTypes);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: '',
        creed: 'Hola',
        summary: '',
        healthScore: '',
        step: '',
        steps: [],
        dietTypes: []
    })
    
   
    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {   //// de esta manera el componente muestra los cambios (componentdidupdate?) para poder ir validando
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
            return newInput
        });

    };

     useEffect(() => {
        dispatch(getDietTypes());
    }, [dispatch]);
    
    function handleCheckBox(e) {
       
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            dietTypes: newArray 
        }); 
        const validations = validate(input);
        setErrors(validations)
        
    } 
    
    function handleSubmit(e) {
         e.preventDefault();
         console.log(input)
         if (Object.values(errors).length > 0) {
             alert("Por favor complete la información requerida");
         } else if (
            input.name === '' && 
            input.summary === '' &&
            input.healthScore === '' &&
            input.step === '' &&
            input.steps === '' &&
            !input.dietTypes.length) {
            alert("Por favor complete el formulario");}
        else {
            dispatch(addRecipe(input));
            alert('Nueva receta añadida con éxito!')
            setInput({
                name: "",
                creed: 'Hola',
                summary: '',
                healthScore: '',
                step: '',
                steps: [],
                dietTypes: []
            });
            history.push('/home')
        }
    };


    return (
        <div className="addRecipe">
            <h1 className="msg">Aqui puedes crear tus propias recetas!!!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form">
                    <div className="prettierForm">
                        <div className="nameInput">
                            <label className="msgs">Nombre:</label>
                            <input className="inputs" id="name" name="name" type="text" value={input.name} onChange={e => handleChange(e)}/>
                            {errors.name && (
                                <span className="errors">{errors.name}</span>
                            )}
                        </div>
                        <div>
                            <label className="msgs">Creado: Hola</label>
                           {/*  <input className="inputs" id="name" name="name" type="text" value={input.creed} onChange={e => handleChange(e)} /> */}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Resumen del plato:</label>
                            <textarea name="summary" type="text" rows="6" cols="60" value={input.summary} onChange={e => handleChange(e)}/>
                            {errors.summary && (
                                <span className="errors">{errors.summary}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Puntuación de salud:</label>
                            <input name="healthScore" type="number" value={input.healthScore} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <span className="errors">{errors.healthScore}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Pasos a paso:</label>
                            <textarea name="steps" type="text" rows="6" cols="60" value={input.steps} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <span className="errors">{errors.steps}</span>
                            )}
                        </div>
                    </div>
                    <div className="checkSelect">
                        <label className="msgs">Tipos de dietas:</label>
                        {dietTypes.map(d =>{
                            return (
                                <div key={d} className="checks">
                                    <label className="dietTypes">{d}</label>
                                    <input className="checks" type="checkbox" name={d} value={d} selected={input.dietTypes.includes(d)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        {errors.dietTypes && (
                            <span className="errors">{errors.dietTypes}</span>
                        )}
                    </div>  
                </div>
               
                <button className="submitButton" type="submit">Enviar Receta</button>
                <Link to="/home"><button className="goBackButton">Regresa</button></Link>
            </form>
        </div>



    )

};