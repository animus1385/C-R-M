import { Users } from "../js/index.js";

export default class PanelSort {
    constructor() {
        this.users = Users;
    }
    createDOMElement() {
        let create = (e) => document.createElement(e);

        const contact = create('div');
        const actions = create('div');
        const buttonID = create('button');
        const buttonName = create('button');
        const buttonDate = create('button');
        const groupButtons = create('div');
        const buttonIDIcon = create('div');
        const buttonNameIcon = create('div');
        const buttonDateIcon = create('div');
        const buttonDateCurrent = create('button');
        const buttonNameLetters = create('button');
        const buttonDateCurrentIcon = create('div');


        contact.classList.add('panel__contact');
        actions.classList.add('panel__actions');
        buttonID.classList.add('panel__ID', 'panel__button')
        buttonDate.classList.add('panel__date', 'panel__button');
        buttonName.classList.add('panel__name', 'panel__button');
        groupButtons.classList.add('panel__group');
        buttonIDIcon.classList.add('panel__id-icon', 'icon-arrow', 'active-arrow');
        buttonDateIcon.classList.add('panel__date-icon', 'icon-arrow');
        buttonNameIcon.classList.add('panel__name-icon', 'icon-arrow');
        buttonNameLetters.classList.add('panel__A-Z', 'panel__button')
        buttonDateCurrent.classList.add('panel__date-current', 'panel__button');
        buttonDateCurrentIcon.classList.add('panel__date-current-icon', 'icon-arrow');

        contact.textContent = 'Контакты',
            actions.textContent = 'Действия',
            buttonID.textContent = 'ID',
            buttonName.textContent = 'Фамилия Имя Отчество',
            buttonDate.textContent = 'Дата и время создания',
            buttonDateCurrent.textContent = 'Последние изменения',
            buttonNameLetters.textContent = 'А-Я',

            buttonID.append(buttonIDIcon)
        buttonName.append(buttonNameIcon, buttonNameLetters)
        buttonDate.append(buttonDateIcon)
        buttonDateCurrent.append(buttonDateCurrentIcon)
        groupButtons.append(buttonID, buttonName, buttonDate, buttonDateCurrent, contact, actions)


        buttonID.addEventListener('click', () => this.revese());
        buttonDate.addEventListener('click', (e) => this.sort(e, 'date'));
        buttonName.addEventListener('click', (e) => this.sort(e, 'name'));
        buttonDateCurrent.addEventListener('click', (e) => this.sort(e, 'currentDate'));
        return groupButtons
    }
    sort(e, type) {
        let arrSort = this.users;
        let getDOMs = e => document.querySelectorAll(e);
       
        if (!e.target.classList.contains('sort')) {
            e.target.classList.add('sort');
            if (type == 'name') {
                sortName(-1, 1);
            } else if (type == 'date') {
                sortDate(-1, 1, type);
            } else if (type == 'currentDate') {
                sortDate(-1, 1, type);
            }
        } else {
            e.target.classList.remove('sort');
            if (type == 'name') {
                sortName(1, -1);
            } else if (type == 'date') {
                sortDate(1, -1, type);
            } else if (type == 'currentDate') {
                sortDate(1, -1, type);
            }
        }

        function sortName(up, down) {
            function sort(a, b) {
                if (a.names.fullName > b.names.fullName) return up;
                else if (a.names.fullName == b.names.fullName) return 0;
                else if (a.names.fullName < b.names.fullName) return down;
            }
            arrSort.sort(sort)
        }

        function sortDate(up, down, type) {


            function sort(a, b) {

                for (const key in a) {
                    if (Object.hasOwnProperty.call(a, key)) {
                        const element = a[key];

                        if (key == type) {
                            a = element.fullDate.split('.');
                        }

                    }
                }             
                for (const key in b) {
                    if (Object.hasOwnProperty.call(b, key)) {
                        const element = b[key];

                        if (key == type) {
                            b = element.fullDate.split('.');
                        }

                    }
                }
                if (a < b) return up;
                if (a > b) return down;
                return 0
            }
            arrSort.sort(sort)
        }

        let getDOM = e => document.querySelector(e);
        let list = getDOM('.panel__list');

        list.innerHTML = '';
        arrSort.forEach(element => {
            list.append(element.createDOMElement())
        });
    }
    revese() {
        let getDOM = e => document.querySelector(e);
        let list = getDOM('.panel__list');
        list.innerHTML = '';
        this.users.reverse();
        this.users.forEach(element => {
            list.append(element.createDOMElement())
        });
    }
}

