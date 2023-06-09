import '../style/style.css';
import { io } from 'socket.io-client';

import { renderAddUsers, drawPlayers, checkUserLogin  } from './addUsers'; 
import { renderUserChat, renderUserMessages } from './userChat';
import { renderReadyPlayers, renderStartInformation } from './information';

import { gridDrawing, renderGridContainer, setUserColor } from './gridDrawing';
import { finishGame, renderDonePlayers, startPicturePreview} from './gameplay';

import { renderGameOver } from './gameOver';
const socket = io('http://localhost:3000');

export function init() {

  const app = document.getElementById('app');
  app.innerHTML = '';

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
  if (checkUserLogin())  {    // För att användaren loginfältet bara ska uppdateras om personen är inloggad.
    drawPlayers(playerTabel);
    setUserColor();
  }
});

socket.on('countReadyPlayers', (readyPlayer) => {
  renderReadyPlayers(readyPlayer);

  if(readyPlayer.length === 4) {
    startPicturePreview();
  };
});

socket.on('countDonePlayers', (donePlayers) => {
  renderDonePlayers(donePlayers);
});

socket.on('gameIsOver', gameOver => {
  const grid = gameOver.playerGrid;
  const goalGrid = gameOver.goalGrid;
  const result = gameOver.result;

  renderGameOver(grid, result, goalGrid)  
});

init();