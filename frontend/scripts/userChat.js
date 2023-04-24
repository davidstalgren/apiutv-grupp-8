import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const app = document.querySelector('#app');

export function renderUserChat() {
  const chatHeading = document.createElement('h3');
  const chatInput = document.createElement('input');
  const sendChatBtn = document.createElement('button');
  const chatContainer = document.createElement('div');
  const chatMessageContainer = document.createElement('div');

  chatHeading.className = 'chatHeading';
  chatInput.className = 'chatInput';
  sendChatBtn.className = 'sendChatBtn';
  chatContainer.className = 'chatContainer';
  chatMessageContainer.className = 'chatMessageContainer';
  
  chatHeading.innerText = 'Chatt';
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

  chatContainer.append(chatHeading, chatMessageContainer, chatInput, sendChatBtn);
  app.append(chatContainer);
};

export function renderUserMessages(user) {
  let chatMessageContainer = document.querySelector('.chatMessageContainer');

  const messageElement = document.createElement('p');
  messageElement.innerHTML = `${user.name}: ${user.message}`;

  chatMessageContainer.append(messageElement);

  if (user.color === 1) {
    messageElement.classList = 'chatUserMe';
  }
  else {
    messageElement.classList = 'chatUserOther';
  }
}