import { loginUser } from "./model.js"
import initAdmin from "./admin.js";
import initGame from "../site.js";
import { setLogin, setState } from "../site.js";

export default async function createLoginForm() {

    const app = document.getElementById('app');
    if (!app) {
        console.error('Element with id "app" not found.');
        return;
    }

    const formTemplate = `
        <form id="loginForm">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div>
                <button id="loginButton">Login</button>
            </div>
        </form>
    `;

    app.innerHTML = formTemplate;

    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username && password) {
            loginUser(username, password)

                .then((data) => {
                    console.log(data)
                    if (data.user) {
                        console.log('Login successful');
                        setLogin(true);
                        setState('admin');
                        document.getElementById('admin').innerText = 'done'
                        initAdmin();

                    } else {
                        console.log('Login failed');
                        setLogin(false);
                        initGame()
                    }
                })
        }
    })
}

// Call the function to create the login form
//createLoginForm();



