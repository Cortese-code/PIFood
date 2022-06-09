const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { YOUR_API_KEY } = process.env;

//Funcion controladora: 
const getApiInfo = async () => {
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            creado: e.creado,
            dietTypes: e.diets,
            summary: e.summary,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getApiById = async (id) => {
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?${YOUR_API_KEY}`)
}


  const getDbById = async (id) => {
      return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
      });
   }

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    
    return totalInfo;
}


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getDbById,
    getApiById
} 

