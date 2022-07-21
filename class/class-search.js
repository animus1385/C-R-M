import { Users } from "../js/index.js";

export default class Serach  {

    constructor() {
        this.users = Users;
        
    }

    createDOMElement() { 
        let getDOM = e => document.querySelector(e);
        let create = (e) => document.createElement(e);
        let addClass = (elem, classes) => elem.classList.add(...classes);
    
        let searchBlock = create('div'),
            imgBlock = create('div'),
            logo = create('img'),
            form = create('form'),
            input = create('input');
    
            addClass(searchBlock , ['panel__search-block']);
            addClass(imgBlock , ['panel__img-block']);
            addClass(logo , ['panel__logo']);
            addClass(form , ['panel__form']);
            addClass(input , ['panel__search']);
    
            logo.src = './img/logo.svg';
            logo.alt = 'Лого';
            input.placeholder = 'Введите запрос';

            input.addEventListener('input', (e) =>{
            let list =  getDOM('.panel__list');
            list.innerHTML = '';
            
            this.users.forEach(element => {
                if(element.names.fullName.toLowerCase().includes(e.target.value)) {
                    list.append(element.createDOMElement())
                }    
            });
              
            })
            form.append(input);
            imgBlock.append(logo);
            searchBlock.append(imgBlock, form);

            return searchBlock
     }

}