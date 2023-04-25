import '../style/style.css';
import { io } from 'socket.io-client';
import { renderAddUsers } from './addUsers'; 
import { renderUserChat, renderUserMessages } from './userChat';
import { renderReadyPlayers, renderStartInformation } from './information';
import { gridDrawing, renderGridContainer } from './gridDrawing';
import { drawPlayers } from './addUsers';
import { startPicturePreview } from './gameplay';
const socket = io('http://localhost:3000');

function init() {

  const app = document.getElementById('app');

  renderAddUsers();
  renderUserChat();
  renderStartInformation();
  renderGridContainer();
};

socket.on('chat', (user) => {
  console.log('msg', user);
  renderUserMessages(user);
});

socket.on('drawing', (gridlayout) => {
  
  gridDrawing(gridlayout)

});

socket.on('players', playerTabel => {
  if (localStorage.getItem('userData') != undefined) {
    drawPlayers(playerTabel);
  }
});

socket.on('countReadyPlayers', (readyPlayer) => {
  console.log('readyplayer', readyPlayer);
  renderReadyPlayers(readyPlayer);

  if(readyPlayer.length === 4) {
    startPicturePreview();
  };

});

init();