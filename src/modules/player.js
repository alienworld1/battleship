import GameBoard from "./gameboard";

export default class Player {
    #gameboard;

    constructor(name) {
        this.name = name;
        this.#gameboard = new GameBoard();
    }

    gameboard = () => this.#gameboard;
}