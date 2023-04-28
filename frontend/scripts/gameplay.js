import { renderAddUsers } from "./addUsers";
import { gridDrawing, renderGridContainer, starterGrid } from "./gridDrawing";
import { renderUserChat } from "./userChat";
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

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

socket.on('startGame', (getAnswerGrid) => {
    const goalGrid = getAnswerGrid;
    console.table('goalGrid: ' + goalGrid)
    startPicturePreview()
    gridDrawing(goalGrid);
    setTimeout(() => {
        gridDrawing(starterGrid);
    }, 15000)
})

function printPreviewCountdown() {
    const heading = document.createElement('h2');
    const progress = document.createElement('progress');
    const timerText = document.createElement('p');

    container.className = 'countdownContainer';
    heading.innerHTML = 'Förhandsvisning';
    progress.value = 0;
    progress.max = 15;

    let timer = 15;
    let setTimer = setInterval(() => {
        if (timer <= 0) {
            clearInterval(setTimer);
            startGame();
        };

        progress.value = 15 - timer;
        timerText.innerHTML = timer + ' sekunder kvar';

        timer -= 1;
    }, 1000);

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
    const finishBtn = document.createElement('button');

    container.className = 'countdownContainer';
    finishBtn.className = 'finishBtn';

    heading.innerHTML = 'Börja måla!';
    finishBtn.innerHTML = 'Klar';

    progress.value = 0;
    progress.max = 30;

    let timer = 30;
    let setTimer = setInterval(() => {
        if (timer <= 0) {
            clearInterval(setTimer);
            outOfTime();
            console.log('Spelet är över');
            return;
        };

        progress.value = 30 - timer;
        timerText.innerHTML = timer + ' sekunder kvar';

        timer -= 1;

    }, 1000);

    innerContainer.append(heading, progress, timerText, finishBtn);
    container.appendChild(innerContainer);
    app.appendChild(container);

    finishBtn.addEventListener('click', () => {
        finishGame(); // Räknar på server sidan så alla håller samma räkning
    });
};

export function renderDonePlayers(players) {
    const container = document.querySelector('.innerContainer');
    const playersDone = document.createElement('p');
    if (container) {
        players.forEach(player => {
        playersDone.className = 'playersDone';
        playersDone.innerHTML += player + ' är klar';
        container.appendChild(playersDone);
    })
    }
};

function outOfTime() {
    socket.emit('finishGame', { userName: 'out of time' });
};

export function finishGame() {
    const userData = localStorage.getItem('userData');
    socket.emit('finishGame', userData);
};