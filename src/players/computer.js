import Player from "../modules/player";
import Ship, {getShipSize} from "../modules/ship";

const computer = new Player('computer');

const randomNumber = () => Math.floor(Math.random() * 10);

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
        attackedSquares.push({x, y});
        return {x, y};
    },

    setupBoard: shipList => {
        /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
        shipList.forEach(ship => {
            while (true) {
                const x = randomNumber();
                const y = randomNumber();
                const mode = (Math.random() > 0.5)? 'horizontal' : 'vertical';
                if (Computer.gameboard.canPlaceShip(getShipSize(ship), {x, y}, mode)) {
                    Computer.gameboard.placeShip(new Ship(ship), {x, y}, mode);
                    break;
                }    
            }
        });
    }

}

export default Computer;