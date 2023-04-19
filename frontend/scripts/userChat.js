const app = document.querySelector('#app');

export function renderUserChat() {
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
}