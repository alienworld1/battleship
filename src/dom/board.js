import './styles/board.css';
import { primeMultiply } from '../helpers';

export default class Board {
    #board;

    #squares;

    #listeners = [];

    constructor(id) {
        this.#board = document.createElement('div');
        this.#board.classList.add('board');
        this.#board.id = id;

        this.#squares = [];

        for (let i = 0; i < 10; i += 1) {
            const row = [];            
            for (let j = 0; j < 10; j += 1) {
                const square = document.createElement('div');
                Object.assign(square, {position: {x: j, y: i}});
                square.classList.add('square');
                row.push(square);
                this.#board.appendChild(square);
            }
            this.#squares.push(row);
        }
        
    }

    #squareAt = ({x, y}) => this.#squares[y][x];

    editSquare(position, className, toRemove = false) {
        const square = this.#squareAt(position);
        if (!toRemove) {
            square.classList.add(className);
        }
        else {
            square.classList.remove(className);
        }

    }

    get board() {
        return this.#board;
    }

    get squares() {
        return this.#squares;
    }

    render(gameboard, activeClasses) {
        if (activeClasses.shipPresent) {
            for (let y = 0; y < 10; y += 1) {
                for (let x = 0; x < 10; x += 1) {
                    if (gameboard.isShipPresentAtSquare({x, y})) {
                        const thisY = y;
                        const thisX = x;
                        this.#squares[thisY][thisX].classList.add(activeClasses.shipPresent);
                    }    
                }
           }
        }
        
        if (activeClasses.missedSquares) {
            gameboard.missedHits().forEach(square => {
                this.#squares[square.y][square.x].classList.add(activeClasses.missedSquares);
            }, this)
        }

        if (activeClasses.hitSquares) {
            gameboard.attackedSquares().forEach(square => {
                this.#squares[square.y][square.x].classList.add(activeClasses.hitSquares);
            }, this)
        }
        
    }

    triggerMethodOnClick(method, exceptions = []) {
        this.#listeners = [];
        for (let y = 0; y < 10; y += 1) {
            for (let x = 0; x < 10; x += 1) {
                // eslint-disable-next-line no-loop-func
                if (!exceptions.includes(primeMultiply(x, y))) {
                    const listener = () => method(x, y);
                    this.squares[y][x].addEventListener('click', listener);    
                    this.#listeners.push({x, y, listener});    
                } else {
                    this.squares[y][x].classList.add('not-allowed');
                }
            }
        }        
    }

    clearEventListeners() {
        this.#listeners.forEach(({x, y, listener}) => {
            this.squares[y][x].removeEventListener('click', listener);
        }, this);
    }
};