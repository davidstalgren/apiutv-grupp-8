import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const app = document.querySelector('#app');

export function renderUserChat() {
  const chatInput = document.createElement('input');
  const sendChatBtn = document.createElement('button');
  const chatContainer = document.createElement('div');
  const chatMessageContainer = document.createElement('div');

  chatInput.placeholder = 'Type message';
  chatContainer.className = 'chatContainer';
  chatMessageContainer.className = 'chatMessageContainer';

  sendChatBtn.innerText = 'Send'
  sendChatBtn.addEventListener('click', () => {
    const chatMessage = chatInput.value;

    if (chatMessage) {
      socket.emit('chat', chatMessage);
      chatInput.value = '';
    }
  });

  chatContainer.append(chatInput, sendChatBtn, chatMessageContainer)
  app.append(chatContainer);
};