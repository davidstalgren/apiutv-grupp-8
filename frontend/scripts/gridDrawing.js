import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const app = document.querySelector('#app');

const userColor = 1;

const starterGrid = [
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
    [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
]

export function renderGridContainer() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';

    app.append(gridContainer);

    gridDrawing(starterGrid);
}

export function gridDrawing(gridLayout) {

    const gridContainer = document.querySelector('.gridContainer');
    gridContainer.innerHTML = '';
    
    const rows = 15;
    const colors = [
        '#F2F2F2',
        '#DC2121',
        '#FFDF36',
        '#3648EC',
        '#43B241',
    ]


    for(let i = 0; i < rows; i++) {

        for(let j = 0; j < rows; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.backgroundColor = colors[gridLayout[i][j]];

            gridContainer.append(pixel);

            pixel.addEventListener('click', () => {
                pixelClick(i, j, userColor);
            })    
        }
    }
}

export function pixelClick(i, j, userColor) {
    const sendData = {
        i:i,
        j:j,
        userColor:userColor,
    }

    socket.emit('drawing', sendData);
    console.log(i, j, userColor);
}