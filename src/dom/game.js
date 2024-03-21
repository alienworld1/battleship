import './styles/game.css';
import Board from './board';

import {Human, Computer} from '../game-setup';

const Game = document.createElement('main');
Game.id = 'game-screen';

const BoardComponent = (board, label) => {
    const boardComponent = document.createElement('div');
    boardComponent.classList.add('board-component');

    boardComponent.appendChild(board);

    const labelElement = document.createElement('h3');
    labelElement.textContent = label;
    boardComponent.appendChild(labelElement);

    return boardComponent;
};

const HumanBoard = new Board('human-board');
const ComputerBoard = new Board('computer-board');

Game.appendChild(BoardComponent(HumanBoard.board, 'You'));
Game.appendChild(BoardComponent(ComputerBoard.board, 'Computer'));

const message = document.createElement('p');
message.className = 'message';
message.textContent = 'Click on an enemy square to attack it.';

Game.appendChild(message);

ComputerBoard.triggerMethodOnClick((x, y) => {
    const attackResult = Computer.gameboard.receiveAttack({x, y})
    if (!attackResult) {
        message.textContent = 'You didn\'t hit any ship!';
        message.classList.add('red');
    }
    Game.renderComputerBoard();
});

Game.renderHumanBoard = () => {
    HumanBoard.render(Human.gameboard, {
        shipPresent: 'green',
    });    
};

Game.renderComputerBoard = () => {
    ComputerBoard.render(Computer.gameboard, {
        shipPresent: 'green',
        missedSquares: 'red',
    });
};

export default Game;