import GameBoard from "./gameboard";

export default class Player {
    #gameboard;

    constructor(name) {
        this.name = name;
        this.#gameboard = GameBoard();
    }

    gameboard = () => this.#gameboard;
}