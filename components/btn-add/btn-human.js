import Popup from "../../class/class-popup.js";

export default function addBtn() {
    const addBtnHuman = document.createElement('button');
    addBtnHuman.classList.add('panel__button-add-human');
    addBtnHuman.textContent = 'Добавить клиента';
    

    let popup = new Popup()
    popup.lastName = 'sdfsdfdsfsdf';
    let popupDOM = popup.createDOMElement().pop;
   
    addBtnHuman.addEventListener('click',  () => document.body.append(popupDOM))
    return addBtnHuman
}

