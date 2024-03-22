/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/dom/mainmenu.js

const MainMenu = document.createElement('main');
MainMenu.id = 'main-menu';
const heading = document.createElement('h1');
heading.textContent = 'Battleship';
const mainmenu_button = document.createElement('button');
mainmenu_button.textContent = 'Play';
MainMenu.appendChild(heading);
MainMenu.appendChild(mainmenu_button);
/* harmony default export */ const mainmenu = (MainMenu);
;// CONCATENATED MODULE: ./src/helpers.js
/* eslint-disable no-restricted-syntax */
const primeMultiply = (a, b) => 2 ** a * 3 ** b;
const timeoutPromise = delay => new Promise(resolve => {
  setTimeout(() => resolve(), delay);
});

;// CONCATENATED MODULE: ./src/dom/board.js


class Board {
  #board;
  #squares;
  #listeners = [];
  constructor(id) {
    this.#board = document.createElement('div');
    this.#board.classList.add('board');
    this.#board.id = id;
    this.#squares = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        const square = document.createElement('div');
        Object.assign(square, {
          position: {
            x: j,
            y: i
          }
        });
        square.classList.add('square');
        row.push(square);
        this.#board.appendChild(square);
      }
      this.#squares.push(row);
    }
  }
  #squareAt = _ref => {
    let {
      x,
      y
    } = _ref;
    return this.#squares[y][x];
  };
  editSquare(position, className) {
    let toRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const square = this.#squareAt(position);
    if (!toRemove) {
      square.classList.add(className);
    } else {
      square.classList.remove(className);
    }
  }
  get board() {
    return this.#board;
  }
  get squares() {
    return this.#squares;
  }
  render(gameboard, activeClasses) {
    if (activeClasses.shipPresent) {
      for (let y = 0; y < 10; y += 1) {
        for (let x = 0; x < 10; x += 1) {
          if (gameboard.isShipPresentAtSquare({
            x,
            y
          })) {
            const thisY = y;
            const thisX = x;
            this.#squares[thisY][thisX].classList.add(activeClasses.shipPresent);
          }
        }
      }
    }
    if (activeClasses.missedSquares) {
      gameboard.missedHits().forEach(square => {
        this.#squares[square.y][square.x].classList.add(activeClasses.missedSquares);
      }, this);
    }
    if (activeClasses.hitSquares) {
      gameboard.attackedSquares().forEach(square => {
        this.#squares[square.y][square.x].classList.add(activeClasses.hitSquares);
      }, this);
    }
  }
  triggerMethodOnClick(method) {
    let exceptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    this.#listeners = [];
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        // eslint-disable-next-line no-loop-func
        if (!exceptions.includes(primeMultiply(x, y))) {
          const listener = () => method(x, y);
          this.squares[y][x].addEventListener('click', listener);
          this.#listeners.push({
            x,
            y,
            listener
          });
        } else {
          this.squares[y][x].classList.add('not-allowed');
        }
      }
    }
  }
  clearEventListeners() {
    this.#listeners.forEach(_ref2 => {
      let {
        x,
        y,
        listener
      } = _ref2;
      this.squares[y][x].removeEventListener('click', listener);
    }, this);
  }
}
;
;// CONCATENATED MODULE: ./src/modules/ship.js
const getShipSize = name => {
  const sizes = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Destroyer: 2,
    Submarine: 1
  };
  return sizes[name];
};
class Ship {
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
  isSunk() {
    return this.#numberOfHits >= this.#length;
  }
  get name() {
    return this.#name;
  }
}

;// CONCATENATED MODULE: ./src/modules/gameboard.js
class GameBoard {
  #board;
  #numberOfShips = 0;
  #missedSquares;
  #attackedSquares;
  #shipList;
  clear() {
    this.#board = [];
    this.#missedSquares = [];
    this.#attackedSquares = [];
    this.#shipList = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        row.push(null);
      }
      this.#board.push(row);
    }
  }
  static isValidSquare = square => square.x >= 0 && square.x < 10 && square.y >= 0 && square.y < 10;
  static canPlaceShip(shipLength, _ref, mode) {
    let {
      x,
      y
    } = _ref;
    if (mode === 'horizontal') {
      for (let i = 0; i < shipLength; i += 1) {
        if (!GameBoard.isValidSquare({
          x: x + i,
          y
        })) return false;
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        if (!GameBoard.isValidSquare({
          x,
          y: y + i
        })) return false;
      }
    }
    return true;
  }
  constructor() {
    this.clear();
  }
  shipAt(_ref2) {
    let {
      x,
      y
    } = _ref2;
    return this.#board.at(y).at(x);
  }
  #setShipAtSquare(ship, x, y) {
    this.#board[y][x] = ship;
  }
  placeShip(ship, _ref3, mode) {
    let {
      x,
      y
    } = _ref3;
    if (mode === 'horizontal') {
      for (let i = 0; i < ship.length(); i += 1) {
        this.#setShipAtSquare(ship, x + i, y);
      }
    } else {
      for (let i = 0; i < ship.length(); i += 1) {
        this.#setShipAtSquare(ship, x, y + i);
      }
    }
    this.#numberOfShips += 1;
    this.#shipList.push(ship);
  }
  canPlaceShip(shipLength, _ref4, mode) {
    let {
      x,
      y
    } = _ref4;
    if (mode === 'horizontal') {
      for (let i = 0; i < shipLength; i += 1) {
        if (!GameBoard.isValidSquare({
          x: x + i,
          y
        }) || this.isShipPresentAtSquare({
          x: x + i,
          y
        })) return false;
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        if (!GameBoard.isValidSquare({
          x,
          y: y + i
        }) || this.isShipPresentAtSquare({
          x,
          y: y + i
        })) return false;
      }
    }
    return true;
  }
  isShipPresentAtSquare = square => this.shipAt(square) !== null;
  numberOfShips = () => this.#numberOfShips;

  // Returns false if the attack misses and returns the ship if the attack hits.
  receiveAttack(square) {
    const ship = this.shipAt(square);
    if (!ship) {
      this.#missedSquares.push(square);
      return false;
    }
    ship.hit();
    this.#attackedSquares.push(square);
    return ship;
  }
  missedHits = () => this.#missedSquares;
  attackedSquares = () => this.#attackedSquares;
  allShipsHaveSunk = () => this.#shipList.every(ship => ship.isSunk());
}
;// CONCATENATED MODULE: ./src/modules/player.js

class Player {
  #gameboard;
  constructor(name) {
    this.name = name;
    this.#gameboard = new GameBoard();
  }
  gameboard = () => this.#gameboard;
}
;// CONCATENATED MODULE: ./src/players/human.js

const human = new Player('human');
const Human = {
  enemyGameboard: null,
  gameboard: human.gameboard()
};
/* harmony default export */ const players_human = (Human);
;// CONCATENATED MODULE: ./src/players/computer.js



const computer = new Player('computer');
const randomNumber = () => Math.floor(Math.random() * 10);
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
    return {
      x,
      y
    };
  },
  setupBoard: shipList => {
    /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
    shipList.forEach(ship => {
      while (true) {
        const x = randomNumber();
        const y = randomNumber();
        const mode = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        if (Computer.gameboard.canPlaceShip(getShipSize(ship), {
          x,
          y
        }, mode)) {
          Computer.gameboard.placeShip(new Ship(ship), {
            x,
            y
          }, mode);
          break;
        }
      }
    });
  }
};
/* harmony default export */ const players_computer = (Computer);
;// CONCATENATED MODULE: ./src/game-setup.js


players_human.enemyGameboard = players_computer.gameboard;
players_computer.enemyGameboard = players_human.gameboard;
const shipList = ['Carrier', 'Battleship', 'Cruiser', 'Destroyer', 'Destroyer', 'Submarine', 'Submarine'];

;// CONCATENATED MODULE: ./src/dom/setup.js




const renderMessage = function (shipName, length, mode) {
  let error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return `<h3>Click a square to place a ${shipName} (${length} squares)!</h3>
    <p>Right click to rotate your ship. (Mode: ${mode})</p>
    <p class="error">${error}</p>`;
};
const returnNextShip = (() => {
  let count = 0;
  return () => {
    count += 1;
    return shipList.at(count - 1);
  };
})();
const Setup = document.createElement('main');
Setup.id = 'setup-screen';
let ship = returnNextShip();
let mode = 'horizontal';
const label = document.createElement('div');
const refreshLabel = function () {
  let error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  label.innerHTML = renderMessage(ship, getShipSize(ship), mode, error);
};
const HumanBoard = new Board('human-board');
HumanBoard.board.addEventListener('contextmenu', event => {
  event.preventDefault();
  mode = mode === 'horizontal' ? 'vertical' : 'horizontal';
  refreshLabel();
});
refreshLabel();
HumanBoard.triggerMethodOnClick((x, y) => {
  if (!players_human.gameboard.canPlaceShip(getShipSize(ship), {
    x,
    y
  }, mode)) {
    refreshLabel('Invalid placement');
    return false;
  }
  players_human.gameboard.placeShip(new Ship(ship), {
    x,
    y
  }, mode);
  ship = returnNextShip();
  if (!ship) {
    Setup.callback();
  }
  refreshLabel();
  HumanBoard.render(players_human.gameboard, {
    shipPresent: 'green-backdrop'
  });
  return false;
});
Setup.appendChild(label);
Setup.appendChild(HumanBoard.board);
/* harmony default export */ const setup = (Setup);
;// CONCATENATED MODULE: ./src/eventEmitter.js
const gameEventEmitter = new EventTarget();
/* harmony default export */ const eventEmitter = (gameEventEmitter);
;// CONCATENATED MODULE: ./src/dom/dialog.js

const dialog = document.createElement('dialog');
const h3 = document.createElement('h3');
const restartButton = document.createElement('button');
restartButton.textContent = 'Play Again';
dialog.appendChild(h3);
dialog.appendChild(restartButton);
const Dialog = {
  dialog,
  setResult(result) {
    if (result === 'win') {
      h3.textContent = 'Congratulations! You won :)';
    } else {
      h3.textContent = 'You lost the game :(';
    }
  },
  setRestartFunction(func) {
    restartButton.addEventListener('click', func);
  }
};
/* harmony default export */ const dom_dialog = (Dialog);
;// CONCATENATED MODULE: ./src/report.js

const gameReport = {
  allHumanShipsHaveSunk: false,
  allComputerShipsHaveSunk: false,
  currentTurn: 'Human'
};
const getGameReport = () => gameReport;
const setGameReport = (field, value) => {
  gameReport[field] = value;
  eventEmitter.dispatchEvent(new CustomEvent('update'));
};

;// CONCATENATED MODULE: ./src/dom/game.js





const game_attackedSquares = [];
const Game = document.createElement('main');
Game.id = 'game-screen';
const BoardComponent = (board, label) => {
  const boardComponent = document.createElement('div');
  boardComponent.classList.add('board-component');
  boardComponent.appendChild(board);
  const labelElement = document.createElement('h3');
  labelElement.textContent = label;
  boardComponent.appendChild(labelElement);
  return boardComponent;
};
const game_HumanBoard = new Board('human-board');
const ComputerBoard = new Board('computer-board');
Game.appendChild(BoardComponent(game_HumanBoard.board, 'You'));
Game.appendChild(BoardComponent(ComputerBoard.board, 'Computer'));
const message = document.createElement('p');
message.className = 'message';
message.textContent = 'Click on an enemy square to attack it.';
const setMessageColor = color => {
  message.classList.remove('red', 'green');
  message.classList.add(color);
};
const playComputerMove = async () => {
  await timeoutPromise(1000);
  const move = players_computer.playMove();
  const attackResult = players_human.gameboard.receiveAttack(move);
  if (!attackResult) {
    message.textContent = 'None of your ships were hit!';
    setMessageColor('red');
  } else if (attackResult.isSunk()) {
    message.textContent = `Your ${attackResult.name} has sunk!`;
    setMessageColor('green');
  } else {
    message.textContent = `Your ${attackResult.name} was hit!`;
    setMessageColor('green');
  }
  if (players_human.gameboard.allShipsHaveSunk()) {
    setGameReport('allHumanShipsHaveSunk', true);
  }
  Game.renderHumanBoard();
  setGameReport('currentTurn', 'Human');
};
const ComputerBoardManager = {
  disable() {
    ComputerBoard.clearEventListeners();
  },
  enable() {
    ComputerBoard.triggerMethodOnClick((x, y) => {
      const attackResult = players_computer.gameboard.receiveAttack({
        x,
        y
      });
      if (!attackResult) {
        message.textContent = 'You didn\'t hit any ship!';
        setMessageColor('red');
      } else if (attackResult.isSunk()) {
        message.textContent = `You sunk an enemy ${attackResult.name}!`;
        setMessageColor('green');
      } else {
        message.textContent = 'You hit a ship!';
        setMessageColor('green');
      }
      Game.renderComputerBoard();
      game_attackedSquares.push(primeMultiply(x, y));
      if (players_computer.gameboard.allShipsHaveSunk()) {
        setGameReport('allComputerShipsHaveSunk', true);
      }
      setGameReport('currentTurn', 'Computer');
    }, game_attackedSquares);
  }
};
Game.appendChild(message);
Game.renderHumanBoard = () => {
  game_HumanBoard.render(players_human.gameboard, {
    shipPresent: 'green',
    missedSquares: 'red',
    hitSquares: 'gray'
  });
};
Game.renderComputerBoard = () => {
  ComputerBoard.render(players_computer.gameboard, {
    missedSquares: 'red',
    hitSquares: 'gray'
  });
};
/* harmony default export */ const game = (Game);

;// CONCATENATED MODULE: ./src/index.js








const body = document.querySelector('body');
const initalizeGame = () => {
  body.appendChild(game);
  game.renderHumanBoard();
  players_computer.setupBoard(shipList);
  game.renderComputerBoard();
  ComputerBoardManager.enable();
};
const initializeSetup = () => {
  setup.callback = () => {
    body.removeChild(setup);
    initalizeGame();
  };
  body.appendChild(setup);
};
const initializeMainMenu = () => {
  body.appendChild(mainmenu);
  const button = mainmenu.querySelector('button');
  button.addEventListener('click', () => {
    body.removeChild(mainmenu);
    initializeSetup();
  });
};
const showDialog = result => {
  const {
    dialog
  } = dom_dialog;
  dialog.close();
  body.appendChild(dialog);
  dom_dialog.setResult(result);
  dom_dialog.setRestartFunction(() => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
  dialog.showModal();
};
eventEmitter.addEventListener('update', () => {
  const report = getGameReport();
  if (report.allComputerShipsHaveSunk) {
    showDialog('win');
    return;
  }
  if (report.allHumanShipsHaveSunk) {
    showDialog('loss');
    return;
  }
  if (report.currentTurn === 'Computer') {
    ComputerBoardManager.disable();
    playComputerMove();
  } else {
    ComputerBoardManager.enable();
  }
});
initializeMainMenu();
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map