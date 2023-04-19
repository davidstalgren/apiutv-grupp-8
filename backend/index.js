const app = require('express')();
const server = require('http').createServer(app);

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
]

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        console.log('msg', msg);
        io.emit('chat', msg)
    })

    socket.on('drawing', (sendData) => {
        
        if (gridLayout[sendData.i][sendData.j] === sendData.userColor) {
            gridLayout[sendData.i][sendData.j] = 0;
            io.emit('drawing', gridLayout)
            return;
        }
        gridLayout[sendData.i][sendData.j] = sendData.userColor;
        io.emit('drawing', gridLayout)
    })
})

server.listen(3000)