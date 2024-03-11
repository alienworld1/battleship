import './styles/setup.css';
import Board from './board';

const Setup = document.createElement('main');
Setup.id = 'setup-screen';

const label = document.createElement('h3');
label.textContent = 'Hello world!';

const HumanBoard = new Board('human-board');

Setup.appendChild(label);
Setup.appendChild(HumanBoard.board);

export default Setup;