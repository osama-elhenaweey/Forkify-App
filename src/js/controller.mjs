import * as model from "./model.mjs";

import recipeView from "./views/recipeView.mjs";
const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        recipeView.renderSpinner();

        // 1) Loading Recipes
        await model.loadRecipe(id);

        // 2) Rendering Recipes
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
};
init();
