import Human from './players/human';
import Computer from './players/computer';

Human.enemyGameboard = Computer.gameboard;
Computer.enemyGameboard = Human.gameboard;

const shipList = ['Carrier', 'Battleship', 'Cruiser', 'Destroyer', 'Destroyer', 'Submarine', 'Submarine'];

export {Human, Computer, shipList};
