import Popup from "./class-popup.js";

export default class User {
    static id = 0;

    constructor(id, name, date, currentDate, social = []) {

        if (typeof name == 'string') {
            let splitName = name.split(' ');
            name = {
                firstName: splitName[1],
                midleName: splitName[2],
                lastName: splitName[0],
                fullName: name,
            }

        } else if (typeof name == 'object') {
            let splitName = name.fullName.split(' ');
            name = {
                firstName: splitName[1],
                midleName: splitName[2],
                lastName: splitName[0],
                fullName: name.fullName,
            }
        }

        let data = new Date();

        this.id = id;
        this.name = name;
        this.currentDate = currentDate || {
            day: data.getDay(),
            month: data.getMonth(),
            years: data.getFullYear(),
            hour: data.getHours(),
            min: data.getMinutes(),
            fullDate: `${data.getDay()}.${data.getMonth()}.${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`,
        }
        this.date = date || {
            day: data.getDay(),
            month: data.getMonth(),
            years: data.getFullYear(),
            hour: data.getHours(),
            min: data.getMinutes(),
            fullDate: `${data.getDay()}.${data.getMonth()}.${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`,
        }
        this.social = social;
        this.cilyleSocilal = true;
    }
    get id() {
        return this.ids;
    }
    set id(id) {
        this.ids = id;
    }
    get name() {
        return this.names;
    }

    set name(name) {
        let splitName = name.fullName.split(' ');
        this.names = {
            firstName: splitName[1],
            midleName: splitName[2],
            lastName: splitName[0],
            fullName: name.fullName,
        }
    }
    get socials() {
        return this.social
    }
    set socials(social) {
        this.social = social
    }
    createDOMElement() {
        let popup = new Popup();


        let create = (e) => document.createElement(e);
        let addText = (elem, text) => elem.textContent = text;
        let addClass = (elem, classes) => elem.classList.add(...classes);

        let popupDOM = popup.createDOMElement();

        let item = create('div'),
            itemId = create('div'),
            itemFNO = create('div'),
            itemDate = create('div'),
            btnModify = create('div'),
            btnDelete = create('div'),
            itemContact = create('div'),
            groupBtnActions = create('div'),
            itemCurrentDate = create('div');

        // добавление классов.
        addClass(item, ['panel__item']);
        addClass(itemId, ['panel__item-id']);
        addClass(itemFNO, ['panel__item-FNO']);
        addClass(itemDate, ['panel__item-date']);
        addClass(groupBtnActions, ['panel__item-group-button']);
        addClass(itemCurrentDate, ['panel__item-current-date']);
        addClass(itemContact, ['panel__item-contacts', 'contacts']);
        addClass(btnModify, ['btn-actions__item', 'btn-actions__modify']);
        addClass(btnDelete, ['btn-actions__item', 'btn-actions__delete']);

        addText(btnDelete, 'Удалить');
        addText(btnModify, 'Изменить');
        addText(itemId, this.id)
        addText(itemFNO, this.name.fullName);
        addText(itemDate, this.currentDate.fullDate);
        addText(itemCurrentDate, this.currentDate.fullDate);

        for (let i = 0; i < this.social.length; i++) {
            let socialitem = this.social[i];

            let socialitemDOM = this.createSocialItem(socialitem.key, socialitem.value);
            itemContact.append(socialitemDOM);
        }

        groupBtnActions.append(btnModify, btnDelete);
        item.append(itemId, itemFNO, itemDate, itemCurrentDate, itemContact, groupBtnActions);

        popup.startName.lastNames = this.name.lastName;
        popup.startName.firstNames = this.name.firstName;
        popup.startName.midleNames = this.name.midleName;

        btnModify.addEventListener('click', () => {
            popupDOM.popListAdd.innerHTML = '';
            popupDOM.inputLastName.value = this.name.lastName
            popupDOM.inputFirstName.value = this.name.firstName
            popupDOM.inputMidleName.value = this.name.midleName

            for (let i = 0; i < this.social.length; i++) {
                const defaultSocialElem = this.social[i];
                const item = popup.createSocialItem(defaultSocialElem.key, defaultSocialElem.value);
                        
                popupDOM.popListAdd.append(item.elem)
                
            }

            popup.btn = 'edit';
            popup.user = this;

            document.body.append(popupDOM.pop)

        })
        btnDelete.addEventListener('click', (e) => document.body.append(popup.createPopupDOMDeleted(e)))
        return item
    }

    createSocialItem(key, value) {
        let create = (e) => document.createElement(e);
        let addClass = (elem, classes) => elem.classList.add(...classes);
        let addText = (elem, text) => elem.textContent = text;

        let text = create('a');
        let arrow = create('div');
        let tooltip = create('div');
        let itemSocial = create('div');

        addClass(text, ['tooltip__textToltip']);
        addClass(arrow, ['tooltip__arrow']);
        addClass(tooltip, ['contacts__tooltip', 'tooltip']);
        addClass(itemSocial, ['contacts__item']);
        addClass(itemSocial, [`contacts__item--${key}`]);
        addText(text, value);
        arrow.setAttribute('data-popper-arrow', '');

        tooltip.append(text, arrow);
        itemSocial.append(tooltip);

        function toggleATR(e) {
            let tool = document.querySelectorAll('.tooltip')

            tool.forEach(e => e.removeAttribute('data-show'))
            tooltip.toggleAttribute('data-show');
            popperInstance.update();

        }

        document.addEventListener('click', function (e) {
            if (!e.target.classList.contains('contact__item') &&
                !e.target.classList.contains('tooltip') &&
                !e.target.classList.contains('tooltip__textToltip')
            ) {
                tooltip.removeAttribute('data-show');
            }
        })

        itemSocial.addEventListener('click', toggleATR);

        return itemSocial;
    }
}


