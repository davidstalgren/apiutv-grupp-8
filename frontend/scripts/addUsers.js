import { initAdminMode } from "./admin";

const app = document.querySelector('#app');
const div = document.createElement('div');
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
div.className = 'userContainer';

export function renderAddUsers() {
    div.innerHTML = '';

    const label = document.createElement('label');
    const inputElement = document.createElement('input');
    const btn = document.createElement('button');
    label.innerHTML = 'Namn ';
    label.className = 'loginText';
    inputElement.className = 'loginParts';
    inputElement.id = 'loginName';
    btn.className = 'loginParts';
    inputElement.placeholder = 'Skriv in namn';
    btn.innerHTML = 'Lägg Till';


    div.append(label, inputElement, btn);

    btn.addEventListener('click', () => {

        const userName = inputElement.value;

        if (inputElement.value === 'admin') {

            console.log('admin wanna play');
            initAdminMode();

        } else {

            fetch("http://localhost:3000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newName: inputElement.value })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("userData", JSON.stringify({ userName: data.userName, userId: data.userId }))  //spara användaren i mappen userData i localstorage med userName och userId.
                    socket.emit('login', userName)
                })
                .catch((err) => {
                    console.log(err)
                    const userContainer = document.querySelector('.userContainer');
                    const inlogErrorMessege = document.createElement('p')
                    inlogErrorMessege.innerHTML = ('Error! User already exist. Try a new one! :)');
                    inlogErrorMessege.style.color = 'red';
                    userContainer.appendChild(inlogErrorMessege);
                });
        }
    });
    app.appendChild(div);
}

export function drawPlayers(playerTabel) {
    localStorage.setItem("playerTabel", JSON.stringify({ playerTabel: playerTabel }))    // spara spelarrayn i localstorage
    const userContainer = document.querySelector('.userContainer');
    userContainer.innerHTML = '';
    playerTabel.map(user => {

        const showName = document.createElement('p');
        showName.innerHTML = user.userName;
        showName.className = ('showColorDivName');
        userContainer.appendChild(showName);
        const showColor = document.createElement('div');
        showColor.className = ('showColorDiv');
        userContainer.appendChild(showColor);

        const colors = ['#DC2121', '#FFDF36', '#3648EC', '#43B241']
        showColor.style.backgroundColor = colors[user.userColor - 1];

    })
}

