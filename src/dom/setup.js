import './styles/setup.css';
import Board from './board';

import Ship, { getShipSize } from '../modules/ship';
import { Human, shipList } from '../game-setup';

const renderMessage = (shipName, length, mode, error='') => `<h3>Click a square to place a ${shipName} (${length} squares)!</h3>
    <p>Right click to rotate your ship. (Mode: ${mode})</p>
    <p class="error">${error}</p>`;

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
let mode = 'horizontal';

const label = document.createElement('div');

const refreshLabel = (error = '') => {
    label.innerHTML = renderMessage(ship, getShipSize(ship), mode, error);    
}

const HumanBoard = new Board('human-board');
HumanBoard.board.addEventListener('contextmenu', event => {
    event.preventDefault();
    mode = (mode === 'horizontal')? 'vertical' : 'horizontal';
    refreshLabel();
})

refreshLabel();

for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
        // eslint-disable-next-line no-loop-func
        HumanBoard.squares[y][x].addEventListener('click', () => {
            const thisY = y;
            const thisX = x;
            if (!Human.gameboard.canPlaceShip(getShipSize(ship), {x: thisX, y: thisY}, mode)) {
                refreshLabel('Invalid placement');
                return false;
            }
            Human.gameboard.placeShip(new Ship(ship), {x: thisX, y: thisY}, mode);
            ship = returnNextShip();
            if (!ship) {
                Setup.callback();
            }
            refreshLabel();
            HumanBoard.render(Human.gameboard, {
                shipPresent: 'green-backdrop'
            });
            return false;
        })    
    }
}

Setup.appendChild(label);
Setup.appendChild(HumanBoard.board);

export default Setup;