import "./style.css";
import MainMenu from "./dom/mainmenu";
import Setup from "./dom/setup";

const body = document.querySelector('body');

const initializeSetup = () => {
    body.appendChild(Setup);
}

const initializeMainMenu = () => {
    body.appendChild(MainMenu);
    const button = MainMenu.querySelector('button');

    button.addEventListener('click', () => {
        body.removeChild(MainMenu);
        initializeSetup();
    })

}

initializeMainMenu();