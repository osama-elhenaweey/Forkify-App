import * as model from "./model.mjs";

import recipeView from "./views/recipeView.mjs";
import searchView from "./views/searchView.mjs";
import resultView from "./views/resultView.mjs";
import paginationView from "./views/paginationView.mjs";
import bookmarksView from "./views/bookmarksView.mjs";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        recipeView.renderSpinner();
        // 0) update search view to mark selected recipe
        resultView.update(model.getSearchResultsPage());
        // 1) Loading Recipes
        await model.loadRecipe(id);

        // 2) Rendering Recipes
        recipeView.render(model.state.recipe);
        // bookmark update
        bookmarksView.update(model.state.bookmarks);
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
        // 4 render initial pagination buttons
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
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
    // add remove bookmarks
    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }
    // update recipe view
    recipeView.update(model.state.recipe);
    // render bookmarks
    bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};
const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerUpdateBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
