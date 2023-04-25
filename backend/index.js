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
    res.send('fungerar servern?');
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
let readyPlayers = ['PlayerOne', 'PlayerTwo', 'Playerthree'];
const playersWhoAreDone = [];

io.on('connection', (socket) => {
    socket.on('login', (name) => {
        for (let i = 0; i < playerTabel.length; i++)
            if (playerTabel[i].userName == '') {
                playerTabel[i].userName = name;
                break
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
                console.log('Game has started')
                io.emit('startGame', victoryGoal);
                readyPlayers = [];
            } catch (err) {
                console.log(err)
            }
            console.log(victoryGoal);
            return;
        }
        io.emit('countReadyPlayers', readyPlayers);
    });

    socket.on('finishGame', (playerName) => {
        if (playersWhoAreDone.contains(playerName)) {
            playersWhoAreDone.pop(playerName);
            return;
        }
        if (playersWhoAreDone.length === 3) {
            // Alla är klara, hämta resultatet och jämnför
            const resultInProcent = compareWithResult(gridLayout, resultGrid);
            resetActiveGrid();
            playersWhoAreDone = [];
            //Spara de spelar gridet, skicka tillbaka resultatet
            io.emit('gameIsOver', resultInProcent);
            return;
        }
        playersWhoAreDone.push(playerName);
    })
})

function compareWithResult(playerGrid, resultGrid) {

    const fullScore = 225;
    let playerScore = 0;
    for (let i = 0; i < playerGrid.length; i++) {
        for (let j = 0; j < playerGrid[i].length; j++) {
            if (playerGrid[i][j] === resultGrid[i][j]) {
                playerScore++;
            }
            if (playerGrid[i][j] !== resultGrid[i][j] && playerGrid[i][j] !== 0) {
                playerScore--; // Ger minus poäng om spelaren fyller i fel ruta, men inte om den är tom
            }
        }
    }

    let result = (playerScore / fullScore) * 100;
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
    const randomNr = 5;
    const sql = `SELECT * FROM presetpaintings WHERE id = '${randomNr}'`;

    connection.query(sql, (err, data) => {
        if (err) {
            console.log('Error: ' + err)
            reject(err)
        }
        data.map(grid => {
            const stringGrid = Buffer.from(grid.gridLayout).toString();
            const jsGrid = JSON.parse(stringGrid);
            
            console.log(jsGrid + typeof(jsGrid));
            victoryGoal = jsGrid;
        })
        
        console.log('Victory goal: ' + victoryGoal)
    })
}

setAnswerGrid();
server.listen(3000);