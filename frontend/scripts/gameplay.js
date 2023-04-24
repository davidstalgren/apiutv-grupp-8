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
    socket.emit('finishGame', 'This is the end')
}
