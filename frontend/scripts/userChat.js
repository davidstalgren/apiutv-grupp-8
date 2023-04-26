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
    const userData = JSON.parse(localStorage.getItem('userData'));
    const playerTabel = JSON.parse(localStorage.getItem('playerTabel'));
    const playerTabelArray = playerTabel.playerTabel;
    const foundUser = playerTabelArray.find(user => user.userName === userData.userName);

    let userInfo = {
      message: chatMessage,
      name: userData.userName,
      color: foundUser.userColor,
      id: userData.userId 
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
  const chatMessageContainer = document.querySelector('.chatMessageContainer');
  const colors = ['chatUserRed', 'chatUserYellow', 'chatUserBlue', 'chatUserGreen']; //klassnamn i css
  const userData = JSON.parse(localStorage.getItem('userData'));
  const messageElement = document.createElement('p');
  messageElement.innerHTML = `${user.name}: ${user.message}`;

  chatMessageContainer.append(messageElement);

  if (user.name === userData.userName) {
    messageElement.classList = 'chatUserMe';
    messageElement.classList.add(colors[user.color-1]);
  }
  else {
    messageElement.classList = 'chatUserOther';
    messageElement.classList.add(colors[user.color-1]);
  }
}