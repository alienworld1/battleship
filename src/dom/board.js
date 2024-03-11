import './styles/board.css';

export default class Board {
    #board;

    #squares;

    constructor(id) {
        this.#board = document.createElement('div');
        this.#board.classList.add('board');
        this.#board.id = id;

        this.#squares = [];

        for (let i = 0; i < 5; i += 1) {
            const row = [];            
            for (let j = 0; j < 5; j += 1) {
                const square = document.createElement('div');
                square.classList.add('square');
                row.push(square);
                this.#board.appendChild(square);
            }
            this.#squares.push(row);
        }
        
    }

    get board() {
        return this.#board;
    }
};