

import getColors from "./modules/quiz.js";
import initAdmin from "./modules/admin.js";

let myState = "game"
getColors()

let adminButton = document.getElementById('admin')

adminButton.addEventListener('click', () => {
    if (myState == "game") {
        initAdmin()
        myState = 'admin'
        adminButton.innerText = 'done'
    } else {
        myState = 'game'
        adminButton.innerText = 'admin'
        getColors()

    }

})

