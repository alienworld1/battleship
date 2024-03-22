import gameEventEmitter from './eventEmitter';

const gameReport = {
    allHumanShipsHaveSunk: false,
    allComputerShipsHaveSunk: false,
    currentTurn: 'Human',
};

const getGameReport = () => gameReport;

const setGameReport = (field, value) => {
    gameReport[field] = value;
    gameEventEmitter.dispatchEvent(new CustomEvent('update'));
}

export {getGameReport, setGameReport};