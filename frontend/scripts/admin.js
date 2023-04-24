const app = document.querySelector('#app');





let userColor = 0;

export function initAdminMode() {
    console.log('Admin mode initiated');

    app.innerHTML = '';

    let adminSection = document.createElement('section');
    adminSection.classList.add('admin__section');

    app.appendChild(adminSection);
    let adminSectionEl = document.querySelector('.admin__section');

    let colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.classList.add('admin__colorSelectorDiv');

    let color0 = document.createElement('button');
    color0.classList.add('admin__changeColorBtn');
    color0.innerText = '#F2F2F2';
    color0.style.backgroundColor = '#F2F2F2';

    let color1 = document.createElement('button');
    color1.classList.add('admin__changeColorBtn');
    color1.innerText = '#DC2121';
    color1.style.backgroundColor = '#DC2121';

    let color2 = document.createElement('button');
    color2.classList.add('admin__changeColorBtn');
    color2.innerText = '#FFDF36';
    color2.style.backgroundColor = '#FFDF36';

    let color3 = document.createElement('button');
    color3.classList.add('admin__changeColorBtn');
    color3.innerText = '#3648EC';
    color3.style.backgroundColor = '#3648EC';

    let color4 = document.createElement('button');
    color4.classList.add('admin__changeColorBtn');
    color4.innerText = '#43B241';
    color4.style.backgroundColor = '#43B241';

    colorSelectorDiv.append(color0, color1, color2, color3, color4);

    adminSectionEl.append(colorSelectorDiv);
    
    color0.addEventListener('click', () => {
        return userColor = 0;
    });
    
    color1.addEventListener('click', () => {
        return userColor = 1;
    });
    
    color2.addEventListener('click', () => {
        return userColor = 2;
    });
    
    color3.addEventListener('click', () => {
        return userColor = 3;
    });
    
    color4.addEventListener('click', () => {
        return userColor = 4;
    });

    renderAdminGridContainer();
    renderSaveAndLoadBtns();
}

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

let gridLayout = [
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

function renderAdminGridContainer() {
    let adminSectionEl = document.querySelector('.admin__section');
    const gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';

    adminSectionEl.append(gridContainer);

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

function pixelClick(i, j, userColor) {
    
    if (gridLayout[i][j] === userColor) {
        gridLayout[i][j] = 0;

        return;
    }
    gridLayout[i][j] = userColor;

    gridDrawing(gridLayout);

}

function renderSaveAndLoadBtns() {
    let adminSectionEl = document.querySelector('.admin__section');

    let saveBtn = document.createElement('button');
    saveBtn.innerText = 'Save';
    saveBtn.classList.add('admin__saveBtn');

    adminSectionEl.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
        postDrawingToDb(gridLayout)
    })

}

function postDrawingToDb(gridLayout) {
    console.log('click', gridLayout);

    fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({gridLayout})
    })
    .then(res => res.json())
    .then(data => {
        console.log('saved drawing', data);
    })
}

