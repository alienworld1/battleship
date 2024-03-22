import './styles/game.css';
import Board from './board';

import {Human, Computer} from '../game-setup';
import { setGameReport } from '../report';
import { timeoutPromise, primeMultiply } from '../helpers';

const attackedSquares = [];

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

const setMessageColor = color => {
    message.classList.remove('red', 'green');
    message.classList.add(color);
}

const playComputerMove = async () => {
    await timeoutPromise(1000);
    const move = Computer.playMove()
    const attackResult = Human.gameboard.receiveAttack(move);
    if (!attackResult) {
        message.textContent = 'None of your ships were hit!';
        setMessageColor('red');
    } else if (attackResult.isSunk()) {
        message.textContent = `Your ${attackResult.name} has sunk!`;
        setMessageColor('green');
    } else {
        message.textContent = `Your ${attackResult.name} was hit!`;
        setMessageColor('green');
    }
    Game.renderHumanBoard();
    setGameReport('currentTurn', 'Human');
}

const ComputerBoardManager = {
    disable() {
        ComputerBoard.clearEventListeners();
    },

    enable() {
        ComputerBoard.triggerMethodOnClick((x, y) => {
            const attackResult = Computer.gameboard.receiveAttack({x, y})
            if (!attackResult) {
                message.textContent = 'You didn\'t hit any ship!';
                setMessageColor('red');
            } else if (attackResult.isSunk()) {
                message.textContent = `You sunk an enemy ${attackResult.name}!`;
                setMessageColor('green');
            } else {
                message.textContent = 'You hit a ship!';
                setMessageColor('green');
            }
            Game.renderComputerBoard();
            attackedSquares.push(primeMultiply(x, y));
            setGameReport('currentTurn', 'Computer');
        }, attackedSquares);        
    }

}

Game.appendChild(message);

Game.renderHumanBoard = () => {
    HumanBoard.render(Human.gameboard, {
        shipPresent: 'green',
        missedSquares: 'red',
        hitSquares: 'gray',
    });    
};

Game.renderComputerBoard = () => {
    ComputerBoard.render(Computer.gameboard, {
        missedSquares: 'red',
        hitSquares: 'gray',
    });
};

export default Game;
export {ComputerBoardManager, playComputerMove};
