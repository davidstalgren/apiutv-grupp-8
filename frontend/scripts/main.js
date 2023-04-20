import '../style/style.css';
import { io } from 'socket.io-client';
import { renderAddUsers } from './addUsers'; 
import { renderUserChat, renderUserMessages } from './userChat';
import { renderStartInformation } from './information';
import { gridDrawing, renderGridContainer } from './gridDrawing';
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


init();