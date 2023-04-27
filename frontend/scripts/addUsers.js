import { initAdminMode } from "./admin";

const login = document.querySelector('#login');
const div = document.createElement('div');
import { io } from 'socket.io-client';
import { renderStartBtn } from "./information";
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

        const userData = JSON.parse(localStorage.getItem("userData")) || {}


        if (inputElement.value === 'admin') {

            console.log('admin wanna play');
            initAdminMode();
            return;

        } else {

            fetch("http://localhost:3000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({newName:inputElement.value, userName:userData.userName, userId:userData.userId})
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("userData", JSON.stringify({userName:data.userName, userId:data.userId}))  //spara användaren i mappen userData i localstorage med userName och userId.
                socket.emit('login', userName)
                renderStartBtn();
            })
            .catch ((err) => {
                console.log(err)
                const userContainer = document.querySelector('.userContainer');
                let inlogErrorMessege = document.getElementById('inlogErrorMessege');
                if (inlogErrorMessege == null) {
                    inlogErrorMessege = document.createElement('p')
                    inlogErrorMessege.id = 'inlogErrorMessege';
                    userContainer.appendChild(inlogErrorMessege);
                }
                inlogErrorMessege.innerHTML = ('Något gick fel! Användarnamnet är upptaget. Prova med ett annat! :)');
                inlogErrorMessege.style.color = 'red';
                
            });

        }
    });
    login.appendChild(div);
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

