import "./style.css";
import MainMenu from "./dom/mainmenu";
import Setup from "./dom/setup";
import Game, {ComputerBoardManager} from "./dom/game";

import {Computer, shipList} from "./game-setup";

const body = document.querySelector('body');

const initalizeGame = () => {
    body.appendChild(Game);
    Game.renderHumanBoard();

    Computer.setupBoard(shipList); 
    Game.renderComputerBoard();

    ComputerBoardManager.enable();
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