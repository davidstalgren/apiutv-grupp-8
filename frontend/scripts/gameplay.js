import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const app = document.querySelector('#app');

export function startGame() {
    console.log('Spelet är igång');
};



export function renderFinishBtn() {
    const finishBtn = document.createElement('button');
    finishBtn.innerHTML = 'Klara';
    finishBtn.addEventListener('click', finishGame);
    app.appendChild(finishBtn); // test
}
export function finishGame() {
    const userData = localStorage.getItem('userData');
    socket.emit('finishGame', userData.userName);
}
