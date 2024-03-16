import './styles/board.css';

export default class Board {
    #board;

    #squares;

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
};