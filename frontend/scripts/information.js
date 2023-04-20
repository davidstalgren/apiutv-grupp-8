import { startPicturePreview} from "./gameplay";

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

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerHTML = rule;
        
        information.appendChild(li);
    });

    infoContainer.className = 'infoContainer';
    ruleContainer.className = 'ruleContainer';
    startBtn.className = 'startBtn';

    heading.innerHTML = 'Information';
    startBtn.innerHTML = 'Starta';

    ruleContainer.append(heading, information);
    infoContainer.append(startBtn, ruleContainer);
    app.appendChild(infoContainer);

    startBtn.addEventListener('click', startPicturePreview);
};