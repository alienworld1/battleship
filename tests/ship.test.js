import Ship from '../src/modules/ship';

describe('Tests for ship.js', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship('Destroyer');
    })

    afterEach(() => {
        ship = null;
    })

    test('Returns correct length of the ship: Destroyer', () => (
        expect(ship.length()).toBe(2)
    ));

    test('Returns correct length of the ship: Cruiser', () => {
        ship = new Ship('Cruiser');
        expect(ship.length()).toBe(3);
    });

    test('Returns correct number of hits: no hits', () => (
        expect(ship.numberOfHits()).toBe(0)
    ));

    test('Returns correct number of hits: 1 hit', () => {
        ship.hit();
        expect(ship.numberOfHits()).toBe(1);
    });

    test('Check if ship is sunk: the ship has not sunk', () => (
        expect(ship.isSunk()).toBeFalsy()
    )); 

    test('Check if ship is sunk: the ship has sunk', () => {
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy();
    });
});