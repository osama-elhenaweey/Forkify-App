import * as model from "./model.mjs";

import recipeView from "./views/recipeView.mjs";
import searchView from "./views/searchView.mjs";
import resultView from "./views/resultView.mjs";
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
const controlSearchResults = async function () {
    try {
        resultView.renderSpinner();
        // Get search query
        const query = searchView.getQuery();
        if (!query) return;
        // load search results
        await model.loadSearchResults(`${query}`);
        resultView.render(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
};
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
