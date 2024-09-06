import { API_URL } from "./config.mjs";
import { getJSON } from "./helpers.mjs";
export const state = {
    recipe: {},
};
export const loadRecipe = async function (id) {
    try {
        // console.log(data.data.recipe.title);
        const data = await getJSON(`${API_URL}/${id}`);
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
    } catch (err) {
        throw err;
    }
};
