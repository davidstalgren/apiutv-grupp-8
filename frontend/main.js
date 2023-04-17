import './style.css'
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');


function init() {

  const app = document.getElementById('app');

  const chatInput = document.createElement('input');
  const sendChatBtn = document.createElement('button');
  const chatContainer = document.createElement('div');

  sendChatBtn.innerText = 'Send'
  sendChatBtn.addEventListener('click', () => {
    const chatMessage = chatInput.value;

    if (chatMessage) {
      socket.emit('chat', chatMessage);
      chatInput.value = '';
    }
  })

  app.append(chatInput, sendChatBtn, chatContainer)

}

init()