import '../style/style.css';
import { io } from 'socket.io-client';

import { renderAddUsers, drawPlayers  } from './addUsers'; 
import { renderUserChat, renderUserMessages } from './userChat';
import { renderReadyPlayers, renderStartInformation } from './information';
import { gridDrawing, renderGridContainer } from './gridDrawing';
import { finishGame, renderDonePlayers, startPicturePreview} from './gameplay';
import { renderGameOver } from './gameOver';
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
  renderReadyPlayers(readyPlayer);

  if(readyPlayer.length === 4) {
    startPicturePreview();
  };
});

socket.on('countDonePlayers', (donePlayer) => {
  renderDonePlayers(donePlayer);
});

socket.on('gameIsOver', gameOver => {
  const grid = gameOver.playerGrid;
  const goalGrid = gameOver.goalGrid;
  const result = gameOver.result;
  console.log(gameOver);
  console.log(grid, goalGrid, result)
  renderGameOver(grid, result, goalGrid)
  
});

init();