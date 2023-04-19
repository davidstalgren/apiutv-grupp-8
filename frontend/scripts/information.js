import { startGame } from "./gameplay";

const app = document.querySelector('#app');

export function renderStartInformation() {
    const infoContainer = document.createElement('div');
    const heading = document.createElement('h2');
    const information = document.createElement('ul');
    const rules = ['First rule', 'second rule', 'third rule'];
    const startBtn = document.createElement('button');

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerHTML = rule;
        
        information.appendChild(li);
    });

    startBtn.className = 'startBtn';

    heading.innerHTML = 'Regler';
    startBtn.innerHTML = 'Starta';

    infoContainer.append(heading, startBtn, information);
    app.appendChild(infoContainer);

    startBtn.addEventListener('click', startGame);
};