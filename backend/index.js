const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
app.use(require('express').json());
app.use(cors());

var userRouter = require('./routes/users');
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

    socket.on('drawing', (recivedData) => {
        
        if (gridLayout[recivedData.i][recivedData.j] === recivedData.userColor) {
            gridLayout[recivedData.i][recivedData.j] = 0;
            io.emit('drawing', gridLayout)
            return;
        }
        gridLayout[recivedData.i][recivedData.j] = recivedData.userColor;
        io.emit('drawing', gridLayout)
    })
})

server.listen(3000)