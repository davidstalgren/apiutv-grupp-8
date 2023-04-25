import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const app = document.querySelector('#app');

export function renderStartInformation() {
    const infoContainer = document.createElement('article');
    const ruleContainer = document.createElement('div');
    const heading = document.createElement('h2');
    const information = document.createElement('ul');
    const rules = [
        'När spelet startas visas först bilden spelarna ska måla under 15 sek', 
        'Spelarna har därefter 3 min på sig att försöka eftersträva originalbilden', 
        'Om spelarna blir klara innan tiden går ut kan man klicka på klar för att avsluta spelet',
        'Alla spelare måste klicka på klar innan spelet kan avslutas',
        'När tiden går ut avslutas spelet och ett resultat kommer presenteras',
        'Spelaren kan därefter visa tidigare målade bilder eller spela igen'
    ];
    const startBtn = document.createElement('button');
    const playerContainer = document.createElement('div');

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerHTML = rule;
        
        information.appendChild(li);
    });

    infoContainer.className = 'infoContainer';
    ruleContainer.className = 'ruleContainer';
    startBtn.className = 'startBtn';
    playerContainer.className = 'playerContainer';

    heading.innerHTML = 'Information';
    startBtn.innerHTML = 'Starta';

    ruleContainer.append(heading, information, playerContainer);
    infoContainer.append(startBtn, ruleContainer);
    app.appendChild(infoContainer);

    startBtn.addEventListener('click', countPlayers);
};

function countPlayers() {
    const startBtn = document.querySelector('.startBtn');
    const userData = JSON.parse(localStorage.getItem('userData'));

    startBtn.remove();

    socket.emit('countReadyPlayers', userData.userName);
};

export function renderReadyPlayers(playerName) {
    const playerContainer = document.querySelector('.playerContainer');
    const playersReady = document.createElement('p');

    playersReady.className = 'playersReady';
    playerContainer.innerHTML = '';

    playersReady.innerHTML = playerName + ' är redo';
    playerContainer.appendChild(playersReady);
};

