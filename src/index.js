import "./style.css";
import MainMenu from "./dom/mainmenu";
import Setup from "./dom/setup";
import gameEventEmitter from "./eventEmitter";
import Dialog from "./dom/dialog";
import Game, {ComputerBoardManager, playComputerMove} from "./dom/game";

import {Computer, shipList} from "./game-setup";
import { getGameReport } from "./report";

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

const showDialog = result => {
    const {dialog} = Dialog;
    dialog.close();

    body.appendChild(dialog);

    Dialog.setResult(result);
    Dialog.setRestartFunction(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    });

    dialog.showModal();
}

gameEventEmitter.addEventListener('update', () => {
    const report = getGameReport();

    if (report.allComputerShipsHaveSunk) {
        showDialog('win');
        return;
    } 

    if (report.allHumanShipsHaveSunk) {
        showDialog('loss');
        return;
    } 

    if (report.currentTurn === 'Computer') {
        ComputerBoardManager.disable();
        playComputerMove();

    } else {
        ComputerBoardManager.enable();
    }
});



initializeMainMenu();
