import { arrBase } from "../arrBase.js";
import PanelSort from "../class/class-panel-sort.js";
import Serach from "../class/class-search.js";
import addBtn from "../components/btn-add/btn-human.js";
import List from '../components/list/list.js';
export let Users = [];


let list = List(arrBase);
let btn = addBtn();
let search = new Serach().createDOMElement();
let panelSort =new PanelSort().createDOMElement();

console.log(search)
function startProgram(...args) {
    let getDOM = e => document.querySelector(e);

    getDOM('.panel').prepend(search);

    args.forEach(element => {
        getDOM('.panel__app').append(element);
    });
}

startProgram(panelSort, list, btn );