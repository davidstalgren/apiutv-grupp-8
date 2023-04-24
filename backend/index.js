const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
app.use(require('express').json());
app.use(cors());

var userRouter = require('./routes/users')
app.use('/users', userRouter);

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
];

let readyPlayersQuantity = 0;

const playerTabel = [{userName:'', userColor:1}, {userName:'', userColor:2}, {userName:'', userColor:3}, {userName:'', userColor:4}]

io.on('connection', (socket) => {
    socket.on('login', (name) => {
        for (let i = 0; i < playerTabel.length; i++)
        if (playerTabel[i].userName == ''){
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

    socket.on('readyPlayers', (playerCount) => {
        io.emit('readyPlayers', playerCount);

        console.log('Player ready', playerCount);
    });
});

server.listen(3000);