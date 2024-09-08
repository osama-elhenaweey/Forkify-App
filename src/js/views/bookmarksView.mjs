import View from "./View.mjs";
// import previewView from "./previewView.mjs";
import previewView from "./previewView.mjs";
class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _messageError = `No Bookmarks yet , Find a nice recipe to bookmark it :)`;
    _message = "";
    _generateMarkup() {
        return this._data
            .map((bookmark) => previewView.render(bookmark, false))
            .join("");
    }
}
export default new BookmarksView();
