import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const app = document.querySelector('#app');

export function renderUserChat() {
  const chatInput = document.createElement('input');
  const sendChatBtn = document.createElement('button');
  const chatContainer = document.createElement('div');
  const chatMessageContainer = document.createElement('div');

  chatInput.className = 'chatInput';
  sendChatBtn.className = 'sendChatBtn';
  chatContainer.className = 'chatContainer';
  chatMessageContainer.className = 'chatMessageContainer';
  
  chatInput.placeholder = 'Type message';
  sendChatBtn.innerText = 'Send';

  sendChatBtn.addEventListener('click', () => {
    const chatMessage = chatInput.value;

    //userInfo är hårdkodad här för att testa, ska ändras!
    let userInfo = {
      message: chatMessage,
      name: "Test", // user.name
      color: 1, // user.color
    }

    if (chatMessage) {
      socket.emit('chat', userInfo);
      chatInput.value = '';
    }
  });

  chatContainer.append(chatInput, sendChatBtn, chatMessageContainer);
  app.append(chatContainer);
};