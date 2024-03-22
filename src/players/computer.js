import Player from "../modules/player";
import Ship, {getShipSize} from "../modules/ship";

const computer = new Player('computer');

const randomNumber = () => Math.floor(Math.random() * 10);

const primeMultiply = (a, b) => (
    (2 ** a) * (3 ** b)
);

const attackedSquares = [];

const Computer = {
    enemyGameboard: null,
    gameboard: computer.gameboard(),

    playMove: () => {
        let x = randomNumber();
        let y = randomNumber();
        while (attackedSquares.includes(primeMultiply(x, y))) {
            x = randomNumber();
            y = randomNumber();
        }
        attackedSquares.push(primeMultiply(x, y));
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