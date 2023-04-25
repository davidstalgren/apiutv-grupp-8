import '../style/style.css';
import { io } from 'socket.io-client';

import { renderAddUsers, drawPlayers  } from './addUsers'; 
import { renderUserChat, renderUserMessages } from './userChat';
import { renderReadyPlayers, renderStartInformation } from './information';
import { gridDrawing, renderGridContainer } from './gridDrawing';
import { startPicturePreview, renderFinishBtn } from './gameplay';
const socket = io('http://localhost:3000');

function init() {

  const app = document.getElementById('app');

  renderAddUsers();
  renderUserChat();
  renderStartInformation();
  renderGridContainer();
  renderFinishBtn();
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

socket.on('gameIsOver', correctResultInProcent => {
   console.log('correctResultInProcent', correctResultInProcent);
   // TODO: Rendera ut resultatet
});

init();