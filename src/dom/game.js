import './styles/game.css';
import Board from './board';

import {Human, Computer} from '../game-setup';

const Game = document.createElement('main');
Game.id = 'game-screen';

const removeEventListeners = element => {
    element.replaceWith(element.cloneNode(true));
}

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

const ComputerBoardManager = {
    disable() {
        for (let i = 0; i < 10; i += 1) {
            for (let j = 0; j < 10; j += 1) {
                removeEventListeners(ComputerBoard.squares.at(i).at(j));
            }
        }
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
            ComputerBoardManager.disable();
        });        
    }

}

Game.appendChild(message);

Game.renderHumanBoard = () => {
    HumanBoard.render(Human.gameboard, {
        shipPresent: 'green',
    });    
};

Game.renderComputerBoard = () => {
    ComputerBoard.render(Computer.gameboard, {
        missedSquares: 'red',
        hitSquares: 'gray',
    });
};

export default Game;
export {ComputerBoardManager};
