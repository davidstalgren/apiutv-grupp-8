const app = require('express')();
const server = require('http').createServer(app);

app.get('/', (req, res) => {
    res.send('fungerar servern?');
})

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Loggad in användare');
})

server.listen(3000)