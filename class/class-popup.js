import User from "./class-user.js";
import { arrBase } from "../arrBase.js";
import { Users } from "../../js/index.js";

export default class Popup {

    constructor() {
        this.name = {
            lastNames: 'Дмитриевский',
            firstNames: 'Олег',
            midleNames: 'Алексеевич',
        }
    }

    get name() {
        return this.startName
    }
    set name(name) {
        this.startName = {
            lastNames: name.lastNames,
            firstNames: name.firstNames,
            midleNames: name.midleNames
        }
    }
    get typeBtn() {
        return this.btn;
    }
    set typeBtn(typeBtn) {
        this.btn = typeBtn;
    }
    get currentUser() {
        return this.user;
    }
    set currentUser(currentUser) {
        this.user = currentUser
    }
    createDOMElement() {
        let create = (e) => document.createElement(e);
        let addText = (elem, text) => elem.textContent = text;
        let addAttr = (elem, key, value = null) => elem.setAttribute(key, value);
        let addClass = (elem, classes) => elem.classList.add(...classes);
        let appendDOM = (elem, child) => elem.append(...child);
        let getDOM = e => document.querySelector(e);
        let getDOMs = e => document.querySelectorAll(e);
        let del = this.delPop;

        const pop = create('div');
        const popBg = create('div');
        const popID = create('div');
        const popForm = create('div');
        const popTitle = create('div');
        const popAddBtn = create('button');
        const popSaveBtn = create('button');
        const popListAdd = create('div');
        const popcloseBtn = create('button');
        const popDeleteBtn = create('button');
        const popContainer = create('div');
        const inputLastName = create('input');
        const labelLastName = create('label');
        const labelMidleName = create('label');
        const inputFirstName = create('input');
        const inputMidleName = create('input');
        const labelFirstName = create('label');
        const popListContainer = create('div');

        addClass(pop, ['pop']);
        addClass(popBg, ['pop__bg']);
        addClass(popID, ['pop__ID']);
        addClass(popForm, ['pop__form']);
        addClass(popTitle, ['pop__title']);
        addClass(popAddBtn, ['pop__add-btn']);
        addClass(popSaveBtn, ['pop__save-btn']);
        addClass(popListAdd, ['pop__add-list']);
        addClass(popcloseBtn, ['pop__close-btn']);
        addClass(popContainer, ['pop__container']);
        addClass(popDeleteBtn, ['pop__delete-btn']);
        addClass(labelLastName, ['pop__surname-label', 'pop__label']);
        addClass(inputLastName, ['pop__surname', 'pop__input']);
        addClass(inputFirstName, ['pop__name', 'pop__input']);
        addClass(inputMidleName, ['pop__patronymic', 'pop__input']);
        addClass(labelFirstName, ['pop__name-label', 'pop__label']);
        addClass(labelMidleName, ['pop__patronymic-label', 'pop__label']);
        addClass(popListContainer, ['pop__list-container']);

        addAttr(inputLastName, 'type', 'text');
        addAttr(inputFirstName, 'type', 'text');
        addAttr(inputMidleName, 'type', 'text');
        addAttr(inputLastName, 'required', '');
        addAttr(inputFirstName, 'required', '');
        addAttr(inputMidleName, 'required', '');

        addText(popTitle, 'Изменить данные');
        addText(popAddBtn, 'Добавить контакт');
        addText(popSaveBtn, 'Сохранить');
        addText(popDeleteBtn, 'Удалить клиента');
        addText(labelLastName, 'Фамилия*');
        addText(labelFirstName, 'Имя*');
        addText(labelMidleName, 'Отчество');

        let inputs = [inputLastName, inputFirstName, inputMidleName];
        let statictsDate = [this.startName.lastNames, this.startName.firstNames, this.startName.midleNames];
        let user = new User(Users.length + 1, statictsDate.join(' '));

        inputs.forEach((input, key) => {
            input.setAttribute('value', statictsDate[key]);
        })

        appendDOM(popTitle, [popID]);
        appendDOM(labelLastName, [inputLastName])
        appendDOM(labelFirstName, [inputFirstName])
        appendDOM(labelMidleName, [inputMidleName])
        appendDOM(popListContainer, [popListAdd, popAddBtn]);
        appendDOM(popForm, [labelLastName, labelFirstName, labelMidleName, popListContainer, popSaveBtn, popDeleteBtn])
        appendDOM(popContainer, [popTitle, popForm, popcloseBtn])
        appendDOM(pop, [popContainer, popBg]);

        popSaveBtn.addEventListener('click', () => {
          
            function setSocial(userLocal) {
                userLocal.social = [];
                getDOMs('.pop__add-list .pop__elem-contact').forEach(element => {
                    let key = element.querySelector('.select__current').dataset['key']
                    let value = element.querySelector('.pop__input').value;
                    
                    
                    userLocal.social.push({
                        key,
                        value
                    });
                });
                
                return userLocal
            }

            if (this.typeBtn == 'edit') {
                console.log('dsfdsfsdf')
                this.user.name = {
                    fullName: `${inputLastName.value} ${inputLastName.value} ${inputMidleName.value}`
                }
                let list = getDOM('.panel__list')
                list.innerHTML = '';
               setSocial(this.user) ;
                let EditUsers = Users.map(n => n.id == this.user.id ? this.user : n)

                EditUsers.forEach(e => {
                    list.append(e.createDOMElement())
                })

            } else {
                user.id = Users.length + 1;
                user.name = {
                    fullName: `${inputLastName.value} ${inputLastName.value} ${inputMidleName.value}`
                }
                setSocial(user);

                getDOM('.panel__list').append(user.createDOMElement())
                Users.push(user)
            }

            popListAdd.innerHTML = '';
            del()
        })
        popBg.addEventListener('click', () => this.delPop());
        popcloseBtn.addEventListener('click', () => this.delPop());
        popDeleteBtn.addEventListener('click', () => {
            this.delPop()
            document.body.append(this.createPopupDOMDeleted())
        });

        popAddBtn.addEventListener('click', () => {
            let item = this.createSocialItem();
            if (popListAdd.children.length < 10) {
                popListAdd.append(item.elem);
            }
            if (popListAdd.children.length == 10) popAddBtn.remove()

        })
        return {
            pop,
            popListAdd,
            popAddBtn,
            inputLastName,
            inputFirstName,
            inputMidleName
        }
    }
    createSocialItem(key, value) {
        let create = (e) => document.createElement(e);
        let addClass = (elem, classes) => elem.classList.add(...classes);

        let selectArr = {
            vk: 'Вконтакте',
            facebook: "FaceBook",
            tel: 'Телефон',
            email: 'E-mail',
            extraTel: 'Другая связь'
        }

        let currentArr = {};
        const elem = create('li');
        const input = create('input');
        const select = create('div');
        const dropDown = create('div');
        const deleteBtn = create('button');
        const selectIcon = create('div');
        const headerSelect = create('div');
        const selectCurrentVal = create('div');

        addClass(elem, ['pop__elem-contact']);
        addClass(input, ['pop__input']);
        addClass(select, ['pop__select-contact', 'select']);
        addClass(dropDown, ['select__body']);
        addClass(deleteBtn, ['pop__delete-btn-contact']);
        addClass(selectIcon, ['select__icon']);
        addClass(headerSelect, ['select__header']);
        addClass(selectCurrentVal, ['select__current']);

        input.placeholder = 'Введите данные контакта';
        selectCurrentVal.textContent = 'Выберите связь';

        selectCurrentVal.setAttribute(`data-key`, key)
        for (const selectKey in selectArr) {
            const dropSocial = selectArr[selectKey];
            const selectItem = create('div');
            selectItem.setAttribute(`data-key`, selectKey)
            selectItem.textContent = dropSocial;
            dropDown.append(selectItem)
            if (selectKey == selectCurrentVal.getAttribute(`data-key`)) {
                selectCurrentVal.textContent = dropSocial;
            }
            selectItem.addEventListener('click', function (e) {
                selectCurrentVal.setAttribute('data-key', e.target.dataset.key)
                selectCurrentVal.textContent = e.target.textContent;
                select.classList.remove('is-active')
                currentArr.key = selectCurrentVal.getAttribute('data-key')
            })
        }

        input.setAttribute('value', value)
        select.append(headerSelect, dropDown);
        headerSelect.append(selectCurrentVal, selectIcon);

        headerSelect.addEventListener('click', selectToggle)

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
        }

        elem.append(select, input, deleteBtn);
        input.addEventListener('input', e => currentArr.value = e.target.value);


        deleteBtn.addEventListener('click', () => {
            this.delPop('pop__elem-contact')
        });
        currentArr = {
            key,
            value
        }
        return {
            currentArr,
            elem,
            input,
            select,
            deleteBtn
        }
    }
    createPopupDOMDeleted(btn) {
        let getDOM = e => document.querySelector(e);
        let create = (e) => document.createElement(e);

        const pop = create('div');
        const popBg = create('div');
        const popTitle = create('div');
        const popDescr = create('p');
        const btnDelete = create('button');
        const btnCancel = create('button');
        const popcloseBtn = create('button');
        const popContainer = create('div');

        pop.classList.add('pop', 'pop__concent');
        popBg.classList.add('pop__bg');
        popTitle.classList.add('pop__title');
        popDescr.classList.add('pop__descr');
        btnDelete.classList.add('pop__save-btn');
        btnCancel.classList.add('pop__delete-btn');
        popcloseBtn.classList.add('pop__close-btn');
        popContainer.classList.add('pop__container');

        popTitle.textContent = 'Удалить клиента';
        popDescr.textContent = 'Вы действительно хотите удалить данного клиента?';
        btnDelete.textContent = 'Удалить';
        btnCancel.textContent = 'Отмена';

        popContainer.append(popTitle, popDescr, btnDelete, btnCancel, popcloseBtn)
        pop.append(popContainer, popBg)

        popBg.addEventListener('click', () => this.delPop());
        btnDelete.addEventListener('click', (e) => {
            this.delPop()
            let itemDOM,
                itemID,
                list = getDOM('.panel__list');;
            if (this.typeBtn == 'edit') {

            } else {
                itemDOM = btn.target.parentElement.parentElement;
                itemID = itemDOM.children[0].textContent;

            }

            list.innerHTML = '';
            Users.forEach((e, key) => {
                if (e.ids == itemID) {
                    Users.splice(key, 1)
                }
                if (this.typeBtn == 'edit' && e.ids == this.user.id) {
                    Users.splice(key, 1)
                }
            })
            Users.forEach((e, key) => {
                e.id = key + 1;
                setTimeout(() => {
                    let item = e.createDOMElement();
                    item.classList.add('animate')
                    list.append(item)
                }, 5000)


            })

        });
        btnCancel.addEventListener('click', () => this.delPop());
        popcloseBtn.addEventListener('click', () => this.delPop());

        return pop
    }
    delPop(e = 'pop') {
        let DOM = document.querySelector(`.${e}`)

        DOM.remove();
    }
}



