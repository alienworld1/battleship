import Ship from "../src/modules/ship";
import GameBoard from "../src/modules/gameboard";

let gameBoard;

beforeEach(() => {
    gameBoard = new GameBoard();
})

afterEach(() => {
    gameBoard.clear();
})

describe('Set up before the battle', () => {

    test('Proper placements: Destroyer', () => {
        const newShip = new Ship('Destroyer');
        gameBoard.placeShip(newShip, {x: 2, y: 2}, 'horizontal');
        expect(gameBoard.shipAt({x: 2, y: 2})).toStrictlyEqual(newShip);
        expect(gameBoard.shipAt({x: 3, y: 2})).toStrictlyEqual(newShip);
        expect(gameBoard.shipAt({x: 4, y: 2})).not.toStrictlyEqual(newShip);
    });

    test('Proper placements: Destroyer (vertical)', () => {
        const newShip = new Ship('Destroyer');
        gameBoard.placeShip(newShip, {x: 2, y: 2}, 'vertical');
        expect(gameBoard.shipAt({x: 2, y: 2})).toStrictlyEqual(newShip);
        expect(gameBoard.shipAt({x: 2, y: 3})).toStrictlyEqual(newShip);
        expect(gameBoard.shipAt({x: 3, y: 2})).not.toStrictlyEqual(newShip);
    });

    test('Check if a ship is on a square', () => {
        const square = {x: 2, y: 2};
        expect(gameBoard.isShipPresentAtSquare(square)).toBeFalsy();
        gameBoard.placeShip(new Ship('Destroyer'), square, 'horizontal');
        expect(gameBoard.isShipPresentAtSquare(square)).toBeTruthy();
    });

    test('Check if a square is valid', () => {
        expect(GameBoard.isValidSquare({x: 2, y: 2})).toBeTruthy();
        expect(GameBoard.isValidSquare({x: 5, y: 1})).toBeFalsy();
        expect(GameBoard.isValidSquare({x: 1, y: 5})).toBeFalsy();
    });

    test('Check number of ships in gameboard', () => {
        expect(gameBoard.numberOfShips()).toBe(0);
        gameBoard.placeShip(new Ship('Destroyer'), {x: 2, y: 2}, 'horizontal');
        expect(gameBoard.numberOfShips()).toBe(1);
    });
});

describe('The action phase', () => {
    beforeEach(() => {
        gameBoard.placeShip(new Ship('Cruiser'), {x: 1, y: 1}, 'horizontal');
        gameBoard.placeShip(new Ship('Destroyer'), {x: 2, y: 2}, 'vertical');
        gameBoard.placeShip(new Ship('Submarine'), {x: 3, y: 0}, 'horizontal');        
    });

    test('Receive an attack - the attack misses', () => {
        expect(gameBoard.receiveAttack({x: 0, y: 0})).toBeFalsy();
    });

    test('Receive an attack - the attack hits', () => {
        expect(gameBoard.receiveAttack({x: 2, y: 3})).toBeTruthy();
    });

    test('Keep track of missed hits', () => {
        expect(gameBoard.missedHits()).toHaveLength(0);
        gameBoard.receiveAttack({x: 0, y: 0});
        expect(gameBoard.missedHits()).toContain({x: 0, y: 0});
    });

    test('Keep track of attacked squares', () => {
        expect(gameBoard.attackedSquares()).toHaveLength(0);
        gameBoard.receiveAttack({x: 2, y: 3});
        expect(gameBoard.attackedSquares()).toContain({x: 2, y: 3});        
    });

    test('Check if all ships have sunk', () => {
        expect(gameBoard.allShipsHaveSunk()).toBeFalsy();        
    });
});