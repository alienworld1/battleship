import Player from "../modules/player";

const computer = new Player('computer');

const randomNumber = () => Math.floor(Math.random() * 5);

const attackedSquares = [];

const Computer = {
    enemyGameboard: null,
    gameboard: computer.gameboard(),

    playMove: () => {
        const x = randomNumber();
        const y = randomNumber();
        if (attackedSquares.some(square => JSON.stringify({x, y}) === JSON.stringify(square))) {
            return this.playMove();
        }
        attackedSquares.push({x, y})
        return {x, y};
    }

}

export default Computer;