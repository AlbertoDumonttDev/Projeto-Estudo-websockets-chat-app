import express from "express";
import http from 'http';
import Socketio from "socket.io";

const app = express();
const server = http.Server(app);

app.use(express.static(__dirname + '/public'));

const io = Socketio(server);

io.on('connect', (socket) =>{

    io.to(socket.id).emit({
        status : true,
        message : "conexão estabelecida com sucesso!"
    });

    socket.on('teste', (res) => {
        console.log('Mensagem recebida!', res);

        socket.broadcast.emit('teste', res);
    })
});


app.get('/', (req, res) => {
    res.render('index.html');
})


app.get('/' , (req, res) => {
    res.send('hello wolrd');
});

server.listen(3333, () => {
    console.log('SERVIDOR INICIADO PORTA', 3333);
})