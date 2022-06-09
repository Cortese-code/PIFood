const { Router } = require('express');
const { getAllRecipes } = require('../controllers/recipes');
const { Recipe, Diet } = require('../db');


const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes()
        if (name) {
            let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        image: e.image,
                        name: e.name,
                        healthScore: e.healthScore,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        id: e.id
                    }
                })
                return res.status(200).send(recipes); 
            }  
            return res.status(404).send('Lo siento, receta no encontrada')
        } else {
            let recipes = allRecipes.map(e => {
                return {
                    image: e.image,
                    name: e.name,
                    healthScore: e.healthScore,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    id: e.id
                }
            })
            return res.status(200).send(recipes);
        }
    } catch {
       return res.status(400).send('entrada inválida');
    }
});


router.get("/:id", async (req, res, next) => { 
    try {
      const id = req.params.id;
      const recipeTotal = await getAllRecipes();
      if (id) { 
        let recipeId = recipeTotal.filter((el) => el.id == id); 
        recipeId.length
          ? res.status(200).json(recipeId)
          : res.status(404).send("No se encontró la receta");
      }
    } catch (error) {
      next(error);
    }
  }); 
  



module.exports = router;