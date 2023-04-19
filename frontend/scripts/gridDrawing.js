const app = document.querySelector('#app');

export function renderGridContainer() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';

    app.append(gridContainer);

    gridDrawing();
}


export function gridDrawing() {

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

    const gridLayout = [
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,1,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,1,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],        
        ]

    for(let i = 0; i < rows; i++) {

        for(let j = 0; j < rows; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.backgroundColor = colors[gridLayout[i][j]];

            gridContainer.append(pixel);
        }
    }
}