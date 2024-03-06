const getShipSize = name => {
    const sizes = {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Destroyer: 2,
        Submarine: 1,
    };
    return sizes[name];
}


export default class Ship {
    #name;

    #length;

    #numberOfHits;

    constructor(name) {
        this.#name = name;
        this.#length = getShipSize(name);
        this.#numberOfHits = 0;
    }

    length() {
        return this.#length;
    }

    hit() {
        this.#numberOfHits += 1;
    }

    numberOfHits() {
        return this.#numberOfHits;
    }
}