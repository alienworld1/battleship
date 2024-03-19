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

Game.renderHumanBoard = () => {
    HumanBoard.render(Human.gameboard, {
        shipPresent: 'green-backdrop',
    });    
};

Game.renderComputerBoard = () => {
    ComputerBoard.render(Computer.gameboard, {});
};

export default Game;