import '../style.css'
import { io } from 'socket.io-client';
import { renderAddUsers } from './addUsers'; 
const socket = io('http://localhost:3000');


function init() {

  const app = document.getElementById('app');

  const chatInput = document.createElement('input');
  const sendChatBtn = document.createElement('button');
  const chatContainer = document.createElement('div');

  chatContainer.id = 'chatContainer';

  sendChatBtn.innerText = 'Send'
  sendChatBtn.addEventListener('click', () => {
    const chatMessage = chatInput.value;

    if (chatMessage) {
      socket.emit('chat', chatMessage);
      chatInput.value = '';
    }
  })

  app.append(chatInput, sendChatBtn, chatContainer)
  renderAddUsers();
}

socket.on('chat', (msg) => {
  console.log('msg', msg);

  let chatContainer = document.getElementById('chatContainer');

  chatContainer.innerHTML += msg;

})


init()