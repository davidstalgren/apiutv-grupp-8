import { renderGridContainer } from "./gridDrawing";
import { renderUserChat } from "./userChat";

const app = document.querySelector('#app');

export function startGame() {
    console.log('Spelet är igång');

    app.innerHTML = '';
    renderUserChat();
    printPreviewCountdown();
    renderGridContainer();
};

function printPreviewCountdown() {
    console.log('Count down');
    
    const container = document.createElement('div');
    const heading = document.createElement('h3');
    const progress = document.createElement('progress');
    const timerText = document.createElement('p');

    container.className = 'previewCountdownContainer';
    heading.innerHTML = 'Countdown';
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

    container.append(heading, progress, timerText);
    app.appendChild(container);
;}