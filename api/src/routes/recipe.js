const { Router } = require('express');
const { Recipe, Diet } = require('../db')

const router = Router();



 router.post('/', async (req, res) =>{
    let {
          name,
          creed,
          summary,
          healthScore,
          steps,
          dietTypes,
          createdInDb
    } = req.body

    let recipeCreated= await Recipe.create({
        name,
        creed,
        summary,
        healthScore,
        steps,
        createdInDb
    })

    let dietTypesRecipeDb = await Diet.findAll({
        where:{ name:dietTypes }
    })
    recipeCreated.addDiet(dietTypesRecipeDb)
    res.send("Receta creada exitosamente")
});
  

module.exports = router;