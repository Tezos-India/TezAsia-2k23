const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const gameLogic = require('./game-logic');
const app = express();
app.get('/',async (_,res)=>{
    try{
        res.send('<h1>Wait what ?? How did u find me??</h1>');
    }catch(e){
        res.status(500).send();
    }
});
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', client => {
    gameLogic.initializeGame(io, client);
});
server.listen(process.env.PORT || 8000);