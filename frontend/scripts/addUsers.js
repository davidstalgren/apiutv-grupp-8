import { initAdminMode } from "./admin";

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

        if (inputElement.value === 'admin') {

            console.log('admin wanna play');
            initAdminMode();
            
        } else {
            
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",      
                },
                body: JSON.stringify({newName:inputElement.value})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch ((err) => {
                console.log(err)
            });
        }
    });
    app.appendChild(div);
}
