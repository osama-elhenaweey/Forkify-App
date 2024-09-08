import View from "./View.mjs";
class SearchView extends View {
    _parentElement = document.querySelector(".search");
    getQuery() {
        const query = this._parentElement.querySelector(".search__field").value;
        this._clearInput();
        return query;
    }
    _clearInput() {
        this._parentElement.querySelector(".search__field").value = " ";
    }
    addHandlerSearch(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            // document.querySelector(".recipe").innerHTML = " ";
            // document.querySelector(".recipe").innerHTML = `
            // <div class="message">
            //         <div>
            //             <svg>
            //                 <use href="src/img/icons.svg#icon-smile"></use>
            //             </svg>
            //         </div>
            //         <p>
            //             Select a recipe or an ingredient. Have
            //             fun!
            //         </p>
            //     </div>
            // `;
            handler();
        });
    }
}
export default new SearchView();
