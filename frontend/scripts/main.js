import '../style.css';
import { io } from 'socket.io-client';
import { renderAddUsers } from './addUsers'; 
import { renderUserChat } from './userChat';
import { renderStartInformation } from './information';
import { renderGridContainer } from './gridDrawing';
const socket = io('http://localhost:3000');

function init() {

  const app = document.getElementById('app');

  renderUserChat();
  renderAddUsers();
  renderStartInformation();
  renderGridContainer();
};

socket.on('chat', (msg) => {
  console.log('msg', msg);

  let chatMessageContainer = document.querySelector('.chatMessageContainer');
  chatMessageContainer.innerHTML += msg;
});


init();