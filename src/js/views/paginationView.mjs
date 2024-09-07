import View from "./View.mjs";
class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");
    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
    _generateMarkup() {
        const numberPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        const curPage = this._data.page;
        // page 1 ,there are other pages
        if (curPage === 1 && numberPages > 1) {
            return `
            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
            </button>
            `;
        }
        // last page
        if (curPage === numberPages && numberPages > 1) {
            return `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>
            `;
        }
        //Other pages
        if (curPage < numberPages) {
            return `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>
            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
            </button>
            
            `;
        }
        // page 1 ,there are NO  other pages
        return " ";
    }
}
export default new PaginationView();

`
<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
</button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
`;
