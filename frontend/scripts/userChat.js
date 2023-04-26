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
      message: "message 1",
      name: "Name1", // user.name
      color: 1, // user.color
      currentUser: true
    }

    let userInfo2 = {
      message: "message 2",
      name: "Name2", // user.name
      color: 2, // user.color
      currentUser: false
    }

    let userInfo3 = {
      message: "message 3",
      name: "Name3", // user.name
      color: 3, // user.color
      currentUser: false
    }

    let userInfo4 = {
      message: "message 4",
      name: "Name4", // user.name
      color: 4, // user.color
      currentUser: false
    }

    socket.emit('chat', userInfo);
    socket.emit('chat', userInfo2);
    socket.emit('chat', userInfo3);
    socket.emit('chat', userInfo4);

    // if (chatMessage) {
    //   socket.emit('chat', userInfo);
    //   chatInput.value = '';
    // }
  });

  chatContainer.append(chatHeading, chatMessageContainer, chatInput, sendChatBtn);
  app.append(chatContainer);
};

export function renderUserMessages(user) {
  let chatMessageContainer = document.querySelector('.chatMessageContainer');
  const colors = ['chatUserRed', 'chatUserBlue', 'chatUserGreen', 'chatUserYellow']; //klassnamn i css

  const messageElement = document.createElement('p');
  messageElement.innerHTML = `${user.name}: ${user.message}`;

  chatMessageContainer.append(messageElement);

  if (user.currentUser) {
    messageElement.classList = 'chatUserMe';
    messageElement.classList.add(colors[user.color-1]);
  }
  else {
    messageElement.classList = 'chatUserOther';
    messageElement.classList.add(colors[user.color-1]);
  }
}