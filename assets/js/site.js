

import getColors from "./modules/quiz.js";
import { loginUser, createUser, checkLoginStatus } from "./modules/model.js"
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

export function setState(myIncommingState) {
    myState = myIncommingState
}

export default function initGame() {
    myState = "game"
    adminButton.innerText = 'admin'
    getColors()

}


adminButton.addEventListener('click', () => {
    if (myState == "game") {

        checkLoginStatus()
            .then((data) => {
                console.log(data.user)
                if (data.user) {
                    myState = 'admin'
                    adminButton.innerText = 'done'
                    initAdmin()

                } else {

                    createLoginForm()
                }
            })

    } else {
        myState = 'game'
        adminButton.innerText = 'admin'
        getColors()
    }

})

