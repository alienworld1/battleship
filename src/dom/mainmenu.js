import './styles/mainmenu.css';

const MainMenu = document.createElement('main');
MainMenu.id = 'main-menu';

const heading = document.createElement('h1');
heading.textContent = 'Battleship';

const button = document.createElement('button');
button.textContent = 'Play'

MainMenu.appendChild(heading);
MainMenu.appendChild(button);

export default MainMenu;