import Player from "../modules/player";

const human = new Player('human');

const Human = {
    enemyGameboard: null,
    gameboard: human.gameboard(),
}

export default Human;