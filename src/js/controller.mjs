import * as model from "./model.mjs";

import recipeView from "./views/recipeView.mjs";
import searchView from "./views/searchView.mjs";
import resultView from "./views/resultView.mjs";
import paginationView from "./views/paginationView.mjs";
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
        // 1 Get search query
        const query = searchView.getQuery();
        if (!query) return;
        // 2 load search results
        await model.loadSearchResults(`${query}`);
        // 3 render results
        resultView.render(model.getSearchResultsPage());
        // 4 render inital pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};
const controlPagination = function (goToPage) {
    // 1 render New results
    resultView.render(model.getSearchResultsPage(goToPage));
    // 4 render NEW pagination buttons
    paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
    // update the recipe servings
    model.updateServings(newServings);
    // update the recipe view
    recipeView.render(model.state.recipe);
};
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
