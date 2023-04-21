const app = document.querySelector('#app');
const div = document.createElement('div');
div.className = 'userContainer';

export function renderAddUsers() {
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
    

    div.append(label,inputElement, btn);
    
    btn.addEventListener('click', () => {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",      
            },
            body: JSON.stringify({newName:inputElement.value})
        })
        .then(res =>  {
            if(!res.ok) {
                throw new Error();
            }

            return res.json();
        })

        .then(data => {
            console.log(data)
            getUserAndColordiv(); 
            /*
            *   spara namn id och färg i lokalstarage !!!!!!!
            */
        })
        .catch ((err) => {
            console.log(err)
            const userContainer = document.querySelector('.userContainer');
            userContainer.innerHTML = "";
            const inlogErrorMessege = document.createElement('p')
            inlogErrorMessege.innerHTML = ('Error! The game is full. Try again later! :)');
            inlogErrorMessege.style.color = 'red';
            userContainer.appendChild(inlogErrorMessege);

        });
    });
    app.appendChild(div);
}

export function getUserAndColordiv () {
    const userContainer = document.querySelector('.userContainer');
    userContainer.innerHTML = "";
    fetch("http://localhost:3000/users/colors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        let users = data;

        users.map(user => {
            let showName = document.createElement('p');
            showName.innerHTML = user.userName;
            showName.className = ('showColorDivName');
            userContainer.appendChild(showName);

            let showColor = document.createElement('div');
            showColor.className = ('showColorDiv');
            userContainer.appendChild(showColor);

            if (user.userColor == 1) {
                showColor.style.backgroundColor = '#DC2121';
            } else if (user.userColor == 2) {
                showColor.style.backgroundColor = '#FFDF36';
            } else if (user.userColor == 3) {
                showColor.style.backgroundColor = '#3648EC';
            } else if (user.userColor == 4){
                showColor.style.backgroundColor = '#43B241'; 
            }
        })
    })
}
