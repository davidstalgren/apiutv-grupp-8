const app = document.querySelector('#app');
const div = document.createElement('div');
div.className = 'userContainer';

export function renderAddUsers() {
    const label = document.createElement('label');
    const inputElement = document.createElement('input');
    const btn = document.createElement('button');
    label.innerHTML = 'Namn ';
    label.className = 'loginText'
    inputElement.className = 'loginParts';
    btn.className = 'loginParts';
    inputElement.placeholder = 'Skriv in namn';
    btn.innerHTML = 'Lägg Till';
    

    div.append(label,inputElement, btn);
    btn.addEventListener('click', () => {
        console.log('Button Works');
    })
    app.appendChild(div);
}
