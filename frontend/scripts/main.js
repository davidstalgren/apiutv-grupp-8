import '../style/style.css';
import { io } from 'socket.io-client';
import { renderAddUsers } from './addUsers';
import { renderUserChat } from './userChat';
import { renderStartInformation } from './information';
import { gridDrawing, renderGridContainer } from './gridDrawing';
import { drawPlayers } from './addUsers';
import { renderFinishBtn } from './gameplay';
const socket = io('http://localhost:3000');

function init() {

  const app = document.getElementById('app');

  renderAddUsers();
  renderUserChat();
  renderStartInformation();
  renderGridContainer();
  renderFinishBtn();
};

socket.on('chat', (msg) => {
  console.log('msg', msg);

  let chatMessageContainer = document.querySelector('.chatMessageContainer');
  chatMessageContainer.innerHTML += msg;

});

socket.on('drawing', (gridlayout) => {

  gridDrawing(gridlayout)

});

socket.on('players', playerTabel => {
  if (localStorage.getItem('userData') != undefined) {
    drawPlayers(playerTabel);
  }
});

socket.on('players', playerTabel => {
  if (localStorage.getItem('userData') != undefined) {
    drawPlayers(playerTabel);
  }
});

socket.on('gameIsOver', correctResultInProcent => {
   console.log('correctResultInProcent', correctResultInProcent);
   // TODO: Rendera ut resultatet
}
)

init();