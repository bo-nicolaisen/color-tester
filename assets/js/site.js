

import getColors from "./modules/quiz.js";
import { loginUser, createUser } from "./modules/model.js"
import initAdmin from "./modules/admin.js";
import createLoginForm from "./modules/login.js";

let myState = "game"
let adminButton = document.getElementById('admin')

let loggedin = false

initGame()

export function setLogin(state) {
    console.log('setting login' + state);

    loggedin = state
}

export default function initGame() {
    myState = "game"
    adminButton.innerText = 'admin'
    getColors()

}


adminButton.addEventListener('click', () => {
    if (myState == "game") {
        if (loggedin) {
            myState = 'admin'
            adminButton.innerText = 'done'
            initAdmin()

        } else {
            createLoginForm()
        }



    } else {
        myState = 'game'
        adminButton.innerText = 'admin'
        getColors()

    }

})

