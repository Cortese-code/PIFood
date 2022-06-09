import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path = "/" component={LandingPage}/>
      <Route exact path = "/home" component={Home}/>
      <Route exact path= "/recipe" component={AddRecipe}/>
      <Route exact path = "/home/:id" component={RecipeDetails}/>
    
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
