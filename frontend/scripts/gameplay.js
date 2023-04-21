import { renderAddUsers } from "./addUsers";
import { renderGridContainer } from "./gridDrawing";
import { renderUserChat } from "./userChat";

const app = document.querySelector('#app');
const container = document.createElement('div');
const innerContainer = document.createElement('div');
innerContainer.className = 'innerContainer';

export function startPicturePreview() {
    console.log('Spelet är igång');

    app.innerHTML = '';
    renderAddUsers();
    renderUserChat();
    printPreviewCountdown();
    renderGridContainer();
};

function printPreviewCountdown() {
    const heading = document.createElement('h3');
    const progress = document.createElement('progress');
    const timerText = document.createElement('p');

    container.className = 'countdownContainer';
    heading.innerHTML = 'Förhandsvisning';
    progress.value = 0;
    progress.max = 5;

    let timer = 5;
    let setTimer = setInterval(() =>{
        if(timer <= 0) {
            clearInterval(setTimer);
            startGame();
        };

        progress.value = 5 - timer;
        timerText.innerHTML = timer + ' sekunder kvar';

        timer -= 1;
    }, 500);

    innerContainer.append(heading, progress, timerText);
    container.appendChild(innerContainer);
    app.appendChild(container);
};

function startGame() {
    app.innerHTML = '';
    container.innerHTML = '';

    renderAddUsers();
    renderUserChat();
    printGameCountdown();
    renderGridContainer();
};

function printGameCountdown() {
    innerContainer.innerHTML = '';

    const heading = document.createElement('h2');
    const progress = document.createElement('progress');
    const timerText = document.createElement('p');
    const button = document.createElement('button');
    const finishedPlayers = document.createElement('p');

    container.className = 'countdownContainer';
    button.className = 'finishBtn';

    heading.innerHTML = 'Börja måla!';
    button.innerHTML = 'Klar';
    finishedPlayers.innerHTML = '0 av 4 Spelare klara';

    progress.value = 0;
    progress.max = 10;
    
    let timer = 10;
    let setTimer = setInterval(() =>{
        if(timer <= 0) {
            clearInterval(setTimer);
        };

        progress.value = 10 - timer;
        timerText.innerHTML = timer + ' sekunder kvar';

        timer -= 1;
    }, 1000);

    innerContainer.append(heading, progress, timerText, button, finishedPlayers);
    container.appendChild(innerContainer);
    app.appendChild(container);

    let playerCount = 0;

    button.addEventListener('click', () => {

        if(playerCount < 3) {
            playerCount++;
            finishedPlayers.innerHTML = playerCount + ' av 4 spelare klara';
        } else {
            finishedPlayers.innerHTML = 'Alla Spelare Klara';
        };
        
    });
}