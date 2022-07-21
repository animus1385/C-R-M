
import User from "../../class/class-user.js";
import { Users } from "../../js/index.js";

export default function List(args) {
   
    const list = document.createElement('ul');
    
    list.classList.add('panel__list');

    args.forEach((elem, key) => {
        let name =  elem.name.fullName;

        let user = new User( ++key, name, elem.date, elem.currentDate, elem.contacts);
        
        for (let i = 0; i < elem.contacts.length ; i++) {
            user.createSocialItem()
        }
        let DOM =  user.createDOMElement();
        Users.push(user)
        list.append(DOM);
    });
    return list

}