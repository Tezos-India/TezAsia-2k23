import React from 'react';
import { useParams } from 'react-router-dom';
const socket = require('../../../integration/connection/socket').socket;
const JoinGameRoom = (gameid, userName, isCreator) => {
    const idData = {
        gameId: gameid,
        userName: userName,
        isCreator: isCreator
    }
    socket.emit("playerJoinGame", idData);
};
const JoinGame = (props) => {
    const { gameid } = useParams();
    JoinGameRoom(gameid, props.userName, props.isCreator);
    return <div></div>
};
export default JoinGame;
