import "./style.css";
import MainMenu from "./dom/mainmenu";
import Setup from "./dom/setup";
import gameEventEmitter from "./eventEmitter";
import Game, {ComputerBoardManager, playComputerMove} from "./dom/game";

import {Computer, shipList} from "./game-setup";
import { getGameReport } from "./report";

const body = document.querySelector('body');

gameEventEmitter.addEventListener('update', () => {
    const report = getGameReport();

    if (report.currentTurn === 'Computer') {
        ComputerBoardManager.disable();
        playComputerMove();

    } else {
        ComputerBoardManager.enable();
    }
});

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