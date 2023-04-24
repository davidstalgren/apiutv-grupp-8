import { io } from 'socket.io-client';
import { startPicturePreview} from "./gameplay";
const socket = io('http://localhost:3000');

const app = document.querySelector('#app');

let starterPlayerCount = 0;

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
    const divider = document.createElement('div');
    const playersReady = document.createElement('p');

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerHTML = rule;
        
        information.appendChild(li);
    });

    infoContainer.className = 'infoContainer';
    ruleContainer.className = 'ruleContainer';
    startBtn.className = 'startBtn';
    divider.className = 'divider';
    playersReady.className = 'readyPlayerText';

    heading.innerHTML = 'Information';
    startBtn.innerHTML = 'Starta';
    playersReady.innerHTML = starterPlayerCount + ' av 4 spelare redo';

    ruleContainer.append(heading, information, divider, playersReady);
    infoContainer.append(startBtn, ruleContainer);
    app.appendChild(infoContainer);

    /*startBtn.addEventListener('click', () => {
        readyPlayers++;
        const playerCount = readyPlayers;

        socket.emit('readyPlayers', playerCount);
        playersReady.innerHTML = readyPlayers + ' av 4 Spelare redo';

        if(readyPlayers === 4) {
            console.log('Start Game!');
            startPicturePreview();
        };
    });*/

    startBtn.addEventListener('click', () => {
        starterPlayerCount++;
        countPlayers(starterPlayerCount);
    });
};

function countPlayers(newPlayerCount) {
    socket.emit('readyPlayers', newPlayerCount);
    console.log(newPlayerCount);

    const pTag = document.querySelector('.readyPlayerText');
    pTag.innerHTML = newPlayerCount + ' av 4 spelare redo'; 
};

