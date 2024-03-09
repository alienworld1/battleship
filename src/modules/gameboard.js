export default class GameBoard {
    #board;

    #numberOfShips = 0;

    clear() {
        this.#board = [];
        for (let i = 0; i < 4; i += 1) {
            const row = [];
            for (let j = 0; j < 4; j += 1) {
                row.push(null);
            }
            this.#board.push(row);
        }
    }

    static isValidSquare = square => (square.x >= 0 && square.x < 5 && square.y >= 0  && square.y < 5);

    static canPlaceShip(shipLength, {x, y}, mode) {
        if (mode === 'horizontal') {
            for (let i = 0; i < shipLength; i += 1) {
                if (!GameBoard.isValidSquare({x: x + i, y})) return false;
            }
        }
        else {
            for (let i = 0; i < shipLength; i += 1) {
                if (!GameBoard.isValidSquare({x, y: y + i})) return false;
            }
        }
        return true;
    }

    constructor() {
        this.clear();
    }

    shipAt({x, y}) {
        return this.#board.at(y).at(x);
    }

    #setShipAtSquare(ship, x, y) {
        this.#board[y][x] = ship;
    } 

    placeShip(ship, {x, y}, mode) {
        if (mode === 'horizontal') {
            for (let i = 0; i < ship.length(); i += 1) {
                this.#setShipAtSquare(ship, x + i, y);
            }
        }
        else {
            for (let i = 0; i < ship.length(); i += 1) {
                this.#setShipAtSquare(ship, x, y + i);
            }            
        }
        this.#numberOfShips += 1;
    }

    isShipPresentAtSquare = square => this.shipAt(square) !== null;

    numberOfShips = () => this.#numberOfShips;


}