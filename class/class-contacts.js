export default class Contacts {
    static className = 'Contacts';
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    eventsContacts(arr, contactlist) {
        for (let i = 0; i < arr.panel.contacts.items.length; i++) {
            const element = arr.panel.contacts.items[i];
            let contact = contacts({
                tooltip: {
                    textTooltip: {
                        text: element.value,
                        href: element.value,
                    }
                }
            });
    
            contact.classList.add(`contacts__item--${element.key}`);
            contactlist.append(contact)
            if (arr.panel.contacts.items.length > 5 && i == 4) {
                let count = arr.panel.contacts.items.length - 4;
                contact.insertAdjacentHTML("beforebegin", `<li class="contacts__btn-more contacts__item">+${count}</li>`)
    
                window.addEventListener("DOMContentLoaded", function () {
                    let moreBtn = document.querySelectorAll('.contacs__btn-more');
                    moreBtn.forEach(e => {
                        e.addEventListener('click', function () {
                            this.parentNode.classList.add('contacts-open');
                            this.remove()
                        })
                    })
                })
    
            }
        }
    }
    
    createDOMElement() {
        let create = (e) => document.createElement(e);

        let text = create('a');
        let arrow = create('div');
        let tooltip = create('div');
        let itemSocial = create('li');

        arrow.classList.add(['tooltip__arrow']);
        text.classList.add(['tooltip__textToltip']);
        itemSocial.classList.add(['contacts__item']);
        tooltip.classList.add(['contacts__tooltip', 'tooltip']);

        text.href = this.link;
        text.textContent = this.name;
        arrow.setAttribute(['data-popper-arrow'], '')

        itemSocial.append(tooltip)
        tooltip.append(text, arrow)

        return itemSocial
    }
}
