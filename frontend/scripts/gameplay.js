import { renderAddUsers } from "./addUsers";
import { renderGridContainer } from "./gridDrawing";
import { renderUserChat } from "./userChat";

const app = document.querySelector('#app');
const container = document.createElement('div');

export function startPicturePreview() {
    console.log('Spelet är igång');

    app.innerHTML = '';
    renderAddUsers();
    renderUserChat();
    printPreviewCountdown();
    renderGridContainer();
};

function printPreviewCountdown() {
    console.log('Count down');
    
    const heading = document.createElement('h3');
    const progress = document.createElement('progress');
    const timerText = document.createElement('p');

    container.className = 'previewCountdownContainer';
    heading.innerHTML = 'Förhandsvisning';
    progress.value = 0;
    progress.max = 10;

    let timer = 10;
    let setTimer = setInterval(() =>{
        if(timer <= 0) {
            clearInterval(setTimer);
            startGame();
        };

        progress.value = 10 - timer;
        timerText.innerHTML = timer + ' sekunder kvar';

        timer -= 1;
    }, 1000);

    container.append(heading, progress, timerText);
    app.appendChild(container);
};

function startGame() {
    container.innerHTML = '';
    console.log('Start drawing');
};