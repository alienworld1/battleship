import './styles/setup.css';
import Board from './board';
import GameBoard from '../modules/gameboard';

import Ship, { getShipSize } from '../modules/ship';
import { Human, shipList } from '../game-setup';

const renderMessage = (shipName, length) => `<h3>Click a square to place a ${shipName} (${length} squares)!</h3>
    <p>Right click to rotate your ship</p>`;

const returnNextShip = (() => {
    let count = 0;
    return () => {
        count += 1;
        return shipList.at(count - 1);
    };
})();

const Setup = document.createElement('main');
Setup.id = 'setup-screen';

let ship = returnNextShip();

const label = document.createElement('div');
label.innerHTML = renderMessage(ship, getShipSize(ship));

const HumanBoard = new Board('human-board');

const renderBoard = (board, gameboard) => {
    for (let y = 0; y < 10; y += 1) {
        for (let x = 0; x < 10; x += 1) {
            if (gameboard.isShipPresentAtSquare({x, y})) {
                const thisY = y;
                const thisX = x;
                board.squares[thisY][thisX].classList.add('green-backdrop');
            }
        }
    }
}

for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
        // eslint-disable-next-line no-loop-func
        HumanBoard.squares[y][x].addEventListener('click', () => {
            const thisY = y;
            const thisX = x;
            if (!GameBoard.canPlaceShip(getShipSize(ship), {x: thisX, y: thisY}, 'horizontal')) {
                return false;
            }
            Human.gameboard.placeShip(new Ship(ship), {x: thisX, y: thisY}, 'horizontal');
            ship = returnNextShip();
            label.innerHTML = renderMessage(ship, getShipSize(ship));
            renderBoard(HumanBoard, Human.gameboard);
            return false;
        })    
    }
}

Setup.appendChild(label);
Setup.appendChild(HumanBoard.board);

export default Setup;