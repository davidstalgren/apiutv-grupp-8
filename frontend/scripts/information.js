import { startGame } from "./gameplay";

const app = document.querySelector('#app');

export function renderStartInformation() {
    const infoContainer = document.createElement('article');
    const ruleContainer = document.createElement('div');
    const heading = document.createElement('h2');
    const information = document.createElement('ul');
    const rules = ['First rule', 'second rule', 'third rule'];
    const startBtn = document.createElement('button');

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerHTML = rule;
        
        information.appendChild(li);
    });

    infoContainer.className = 'infoContainer';
    ruleContainer.className = 'ruleContainer';
    startBtn.className = 'startBtn';

    heading.innerHTML = 'Regler & Info';
    startBtn.innerHTML = 'Starta';

    ruleContainer.append(heading, information);
    infoContainer.append(startBtn, ruleContainer);
    app.appendChild(infoContainer);

    startBtn.addEventListener('click', startGame);
};