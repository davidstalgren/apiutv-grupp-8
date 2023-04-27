import { init } from "./main";

const app = document.querySelector('#app');


export function renderGameOver(playerGridLayout, resultInProcent, goalGridLayout) {
    app.innerHTML = '';
    const gameOverContainer = document.createElement('div');
    const playerGrid = document.createElement('div');
    const goalGrid = document.createElement('div');
    const resultContainer = document.createElement('div');
    const h2 = document.createElement('h2');
    const playerContainer = document.createElement('div');
    const goalContainer = document.createElement('div');
    const playertitle = document.createElement('h3');
    const goaltitle = document.createElement('h3');
    const resultInProcentElement = document.createElement('p');
    const button = document.createElement('button');
    const section = document.createElement('section');

    gameOverContainer.className = 'gameOverContainer';
    resultInProcentElement.innerText = 'Ni hade: ' + resultInProcent + '% rätt';
    playerGrid.className = 'gridContainer';
    goalGrid.className = 'gridContainer';
    resultContainer.className = 'resultContainer';
    playertitle.innerHTML = 'Er bild';
    goaltitle.innerHTML = 'Facit';
    h2.innerText = 'Spelet Är Slut';

    button.className = 'playAgainBtn';
    button.innerText = 'Spela igen?';

    const rows = 15;
    const colors = [
        '#F2F2F2',
        '#DC2121',
        '#FFDF36',
        '#3648EC',
        '#43B241',
    ]
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < rows; j++) {
            const playerPixel = document.createElement('div');
            const goalPixel = document.createElement('div');
            playerPixel.className = 'pixel';
            goalPixel.className = 'pixel';
            playerPixel.style.backgroundColor = colors[playerGridLayout[i][j]];
            goalPixel.style.backgroundColor = colors[goalGridLayout[i][j]];
            playerGrid.append(playerPixel);
            goalGrid.append(goalPixel);
        }
    }
    resultContainer.append(resultInProcentElement, button)
    playerContainer.append(playertitle, playerGrid)
    goalContainer.append(goaltitle, goalGrid)
    section.append(playerContainer, resultContainer, goalContainer)
    gameOverContainer.append(h2, section)
    app.append(gameOverContainer);

    button.addEventListener('click', init);
};
