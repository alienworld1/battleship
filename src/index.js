import "./style.css";
import MainMenu from "./dom/mainmenu";
import Setup from "./dom/setup";
import Game from "./dom/game";

const body = document.querySelector('body');

const initalizeGame = () => {
    body.appendChild(Game);
}

const initializeSetup = () => {
    Setup.callback = () => {
        body.removeChild(Setup);
        initalizeGame();
    };
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