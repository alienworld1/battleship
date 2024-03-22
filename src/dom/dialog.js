import './styles/dialog.css';

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

export default Dialog;