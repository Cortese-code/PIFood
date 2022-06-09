import React from "react";
import { Link } from 'react-router-dom';
import  Footer from './Footer';
import './LandingPage.css';


export default function LandingPage() {
    return (
        <div className="landing">
<Footer/>
          
            <h1 className="welcomeMsg">Estás buscando una Receta? Este es el lugar indicado!</h1>
 
            <Link to='/home' id="click">
                <button className="homeButton">Ingresa</button>
            </Link>
          

        </div>
    )
}
