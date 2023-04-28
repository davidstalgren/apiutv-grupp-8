const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
app.use(require('express').json());
app.use(cors());

var userRouter = require('./routes/users.js');
var adminRouter = require('./routes/admin.js');
app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Servern fungerar');
});

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

const gridLayout = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let victoryGoal = [];

const playerTabel = [{ userName: '', userColor: 1 }, { userName: '', userColor: 2 }, { userName: '', userColor: 3 }, { userName: '', userColor: 4 }]

let readyPlayers = [];
let playersWhoAreDone = [];

io.on('connection', (socket) => {
    socket.on('login', (name) => {
        for (let i = 0; i < playerTabel.length; i++) {
            if (playerTabel[i].userName == name) {          //Om namnet är inloggat så blir det break och användaren syns i färgfältet, om ej denna kod är med skrivs den inloggade anv in på nytt. 
                break 
            }
            if (playerTabel[i].userName == '') {            //Om användaren inte finns så får den en plats i ledigt fält.
                playerTabel[i].userName = name;
                break
            }
        }
        io.emit('players', playerTabel)
    })

    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    });

    socket.on('drawing', (recivedData) => {

        if (gridLayout[recivedData.i][recivedData.j] === recivedData.userColor) {
            gridLayout[recivedData.i][recivedData.j] = 0;
            io.emit('drawing', gridLayout)
            return;
        }
        gridLayout[recivedData.i][recivedData.j] = recivedData.userColor;
        io.emit('drawing', gridLayout)
    });

    socket.on('countReadyPlayers', async (playerName) => {
        readyPlayers.push(playerName);
        if (readyPlayers.length === 4) {
            try {
                setAnswerGrid();
                resetActiveGrid();
                readyPlayers = [];
            } catch (err) {
                console.log(err)
            }
            
        }
        io.emit('countReadyPlayers', readyPlayers);
    });

    socket.on('finishGame', (playerInfo) => {
       console.log(playerInfo + playersWhoAreDone)
       for (let i = 0; i < playersWhoAreDone.length; i++) {
           if (playersWhoAreDone[i].userName == playerInfo.userName) {
               playersWhoAreDone.slice(i, 1);
               break
           }
         } 
        if (playersWhoAreDone.length === 3 || playerInfo.userName === 'out of time' ) {
            // Alla är klara, hämta resultatet och jämnför
            const resultInProcent = compareWithResult(gridLayout, victoryGoal);
            
            playersWhoAreDone = [];
            
            const gameOver = {
                result: resultInProcent,
                playerGrid: gridLayout,
                goalGrid: victoryGoal
            }
            io.emit('gameIsOver', gameOver);
            
            return;
        }

        playersWhoAreDone.push(playerInfo.userName);
        io.emit('countDonePlayers', playersWhoAreDone);
    })
})

function compareWithResult(playerGrid, resultGrid) {

    let fullPossibleScore = 0;
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (resultGrid[i][j] !== 0) {
                fullPossibleScore++;
            }
        }
    }

    let playerScore = 0;
    for (let i = 0; i < playerGrid.length; i++) {
        for (let j = 0; j < playerGrid[i].length; j++) {
            if (playerGrid[i][j] === resultGrid[i][j] && playerGrid[i][j] !== 0) {
                playerScore++;
            }
            if (playerGrid[i][j] !== resultGrid[i][j] && playerGrid[i][j] !== 0) {
                playerScore--; // Ger minus poäng om spelaren fyller i fel ruta, men inte om den är tom
            }
        }
    }

    let result = (playerScore / fullPossibleScore) * 100;
    return Math.round(result);
}

function resetActiveGrid() {
    for (let i = 0; i < gridLayout.length; i++) {
        for (let j = 0; j < gridLayout[i].length; j++) {
            gridLayout[i][j] = 0;
        }
    }
}

function setAnswerGrid() {
    const randomNr = Math.floor(Math.random() * 5) + 1;
    const sql = `SELECT * FROM presetpaintings WHERE id = '${randomNr}'`;

    connection.query(sql, (err, data) => {
        if (err) {
            console.log('Error: ' + err)
            reject(err)
        }
        data.map(grid => {
            const stringGrid = Buffer.from(grid.gridLayout).toString();
            const jsGrid = JSON.parse(stringGrid);  
            victoryGoal = jsGrid;
        })
        io.emit('startGame', victoryGoal)
    })
}


server.listen(3000);