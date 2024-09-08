import View from "./View.mjs";
import previewView from "./previewView.mjs";
class ResultView extends View {
    _parentElement = document.querySelector(".results");
    _messageError = `No recipes found for your search ,Try another recipe`;
    _message = "";
    _generateMarkup() {
        return this._data
            .map((result) => previewView.render(result, false))
            .join("");
    }
}
export default new ResultView();
