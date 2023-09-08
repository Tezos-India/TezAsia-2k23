import React from 'react';
import Game from '../chess/chess';
import Square from '../chess/square';
import { Stage, Layer } from 'react-konva';
import Board from '../../../assets/game/chessBoard.png';
import useSound from 'use-sound';
import chessMove from '../../../assets/game/moveSoundEffect.mp3';
import Piece from './piece';
import piecemap from './piecemap';
// import TableDiv from '../table/Table';
import web3 from 'web3'
import { useParams } from 'react-router-dom';
import { ColorContext } from '../../../store/colorcontext' ;
import VideoChatApp from '../../../integration/connection/videochat'
const socket  = require('../../../integration/connection/socket').socket;

class ChessGame extends React.Component {
    static contextType
    state = {
        gameState: new Game(this.props.color),
        draggedPieceTargetId: "",
        playerTurnToMoveIsWhite: true,
        whiteKingInCheck: false,
        blackKingInCheck: false,
        gameid: '',
        contractAddress: '',
    }


    componentDidMount() {
        console.log(this.props.myUserName);
        console.log(this.props.opponentUserName);
        console.log(this.props.contractAddress);
        // register event listeners
        socket.on('opponent move', move => {
            // move == [pieceId, finalPosition]
            // console.log("opponenet's move: " + move.selectedId + ", " + move.finalPosition)
            if (move.playerColorThatJustMovedIsWhite !== this.props.color) {
                this.movePiece(move.selectedId, move.finalPosition, this.state.gameState, false);
                this.setState({
                    playerTurnToMoveIsWhite: !move.playerColorThatJustMovedIsWhite
                });
            }
        });
    }

    startDragging = (e) => {
        this.setState({
            draggedPieceTargetId: e.target.attrs.id
        })
    }


    movePiece = (selectedId, finalPosition, currentGame, isMyMove) => {
        console.log(finalPosition)
        /**
         * "update" is the connection between the model and the UI. 
         * This could also be an HTTP request and the "update" could be the server response.
         * (model is hosted on the server instead of the browser)
         */
        var whiteKingInCheck = false 
        var blackKingInCheck = false
        var blackCheckmated = false 
        var whiteCheckmated = false
        const update = currentGame.movePiece(selectedId, finalPosition, isMyMove)
        
        if (update === "moved in the same position.") {
            this.revertToPreviousState(selectedId) // pass in selected ID to identify the piece that messed up
            return
        } else if (update === "user tried to capture their own piece") {
            this.revertToPreviousState(selectedId) ;
            return;
        } else if (update === "b is in check" || update === "w is in check") { 
            // change the fill of the enemy king or your king based on which side is in check. 
            // play a sound or something
            if (update[0] === "b") {
                blackKingInCheck = true;
            } else {
                whiteKingInCheck = true;
            }
        } else if (update === "b has been checkmated" || update === "w has been checkmated") { 
            if (update[0] === "b") {
                blackCheckmated = true;
            } else {
                whiteCheckmated = true;
            }
        } else if (update === "invalid move") {
            this.revertToPreviousState(selectedId);
            return;
        } 

        // let the server and the other client know your move
        if (isMyMove) {
            socket.emit('new move', {
                nextPlayerColorToMove: !this.state.gameState.thisPlayersColorIsWhite,
                playerColorThatJustMovedIsWhite: this.state.gameState.thisPlayersColorIsWhite,
                selectedId: selectedId, 
                finalPosition: finalPosition,
                gameId: this.props.gameId
            });
        }
        

        this.props.playAudio();
        
        // sets the new game state. 
        this.setState({
            draggedPieceTargetId: "",
            gameState: currentGame,
            playerTurnToMoveIsWhite: !this.props.color,
            whiteKingInCheck: whiteKingInCheck,
            blackKingInCheck: blackKingInCheck
        });

        if (blackCheckmated) {
            window.alert("WHITE WON BY CHECKMATE!");

            // Integrate web3 here *******************************************
        } else if (whiteCheckmated) {
            window.alert("BLACK WON BY CHECKMATE!");

            // Integrate web3 here *******************************************
        }
    }


    endDragging = (e) => {
        const currentGame = this.state.gameState
        const currentBoard = currentGame.getBoard()
        const finalPosition = this.inferCoord(e.target.x() + 90, e.target.y() + 90, currentBoard)
        const selectedId = this.state.draggedPieceTargetId
        this.movePiece(selectedId, finalPosition, currentGame, true)
    }

    revertToPreviousState = (selectedId) => {
        /**
         * Should update the UI to what the board looked like before. 
         */
        const oldGS = this.state.gameState
        const oldBoard = oldGS.getBoard()
        const tmpGS = new Game(true)
        const tmpBoard = []

        for (var i = 0; i < 8; i++) {
            tmpBoard.push([])
            for (var j = 0; j < 8; j++) {
                if (oldBoard[i][j].getPieceIdOnThisSquare() === selectedId) {
                    tmpBoard[i].push(new Square(j, i, null, oldBoard[i][j].canvasCoord))
                } else {
                    tmpBoard[i].push(oldBoard[i][j])
                }
            }
        }

        // temporarily remove the piece that was just moved
        tmpGS.setBoard(tmpBoard)

        this.setState({
            gameState: tmpGS,
            draggedPieceTargetId: "",
        })

        this.setState({
            gameState: oldGS,
        })
    }

 
    inferCoord = (x, y, chessBoard) => {
        // console.log("actual mouse coordinates: " + x + ", " + y)
        /*
            Should give the closest estimate for new position. 
        */
        var hashmap = {}
        var shortestDistance = Infinity
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                const canvasCoord = chessBoard[i][j].getCanvasCoord()
                // calculate distance
                const delta_x = canvasCoord[0] - x 
                const delta_y = canvasCoord[1] - y
                const newDistance = Math.sqrt(delta_x**2 + delta_y**2)
                hashmap[newDistance] = canvasCoord
                if (newDistance < shortestDistance) {
                    shortestDistance = newDistance
                }
            }
        }

        return hashmap[shortestDistance]
    }
   
    render() {
        // console.log(this.state.gameState.getBoard())
       //  console.log("it's white's move this time: " + this.state.playerTurnToMoveIsWhite)
        /*
            Look at the current game state in the model and populate the UI accordingly
        */
        // console.log(this.state.gameState.getBoard())
        
        return (
        <React.Fragment>
        <div style = {{
            backgroundImage: `url(${Board})`,
            width: "720px",
            height: "720px", marginRight: "1rem"}}
        >
            <Stage width = {720} height = {720}>
                <Layer>
                {this.state.gameState.getBoard().map((row) => {
                        return (<React.Fragment>
                                {row.map((square) => {
                                    if (square.isOccupied()) {                                    
                                        return (
                                            <Piece 
                                                x = {square.getCanvasCoord()[0]}
                                                y = {square.getCanvasCoord()[1]} 
                                                imgurls = {square.getPiece().name==='king'? (['https://bafybeibjiqatt7wvjlglyljshqcvdnbx5ns54q2hqdopuhyrvuiq2fh5q4.ipfs.dweb.link/1.png','https://bafybeibjiqatt7wvjlglyljshqcvdnbx5ns54q2hqdopuhyrvuiq2fh5q4.ipfs.dweb.link/3.png']) : piecemap[square.getPiece().name]}
                                                isWhite = {square.getPiece().color === "white"}
                                                draggedPieceTargetId = {this.state.draggedPieceTargetId}
                                                onDragStart = {this.startDragging}
                                                onDragEnd = {this.endDragging}
                                                id = {square.getPieceIdOnThisSquare()}
                                                thisPlayersColorIsWhite = {this.props.color}
                                                playerTurnToMoveIsWhite = {this.state.playerTurnToMoveIsWhite}
                                                whiteKingInCheck = {this.state.whiteKingInCheck}
                                                blackKingInCheck = {this.state.blackKingInCheck}
                                                />)
                                    }
                                    return
                                })}
                            </React.Fragment>)
                    })}
                </Layer>
            </Stage>
        </div>
        </React.Fragment>)
    }
}



const ChessGameWrapper = (props) => {



    // get the gameId from the URL here and pass it to the chessGame component as a prop. 
    const domainName = 'https://polyess.netlify.app'
    const color = React.useContext(ColorContext)
    const { gameid,mode,addr,amount,nft } = useParams()
    const [play] = useSound(chessMove);
    const [opponentSocketId, setOpponentSocketId] = React.useState('')
    const [opponentDidJoinTheGame, didJoinGame] = React.useState(false)
    const [opponentUserName, setUserName] = React.useState('')
    const [gameSessionDoesNotExist, doesntExist] = React.useState(false)

    React.useEffect(() => {
        socket.on("playerJoinedRoom", statusUpdate => {
            console.log("A new player has joined the room! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId)
            }
        })
    
        socket.on("status", statusUpdate => {
            console.log(statusUpdate)
            alert(statusUpdate)
            if (statusUpdate === 'This game session does not exist.' || statusUpdate === 'There are already 2 people playing in this room.') {
                doesntExist(true)
            }
        })
        
    
        socket.on('start game', (opponentUserName) => {
            console.log("START!")
            if (opponentUserName !== props.myUserName) {
                setUserName(opponentUserName)
                didJoinGame(true) 
            } else {
                socket.emit('request username', gameid)
            }
        })
    
    
        socket.on('give userName', (socketId) => {
            if (socket.id !== socketId) {
                console.log("give userName stage: " + props.myUserName)
                socket.emit('recieved userName', {userName: props.myUserName, gameId: gameid})
            }
        })
    
        socket.on('get Opponent UserName', (data) => {
            if (socket.id !== data.socketId) {
                setUserName(data.userName)
                console.log('data.socketId: data.socketId')
                setOpponentSocketId(data.socketId)
                didJoinGame(true) 
            }
        })
    }, [])


    return (
      <React.Fragment>
        {opponentDidJoinTheGame ? (
          <div className="container mt-5">
            <h4 className="text-danger mb-3"> Opponent: {opponentUserName} </h4>
            <div style={{ display: "flex" }}>
              <ChessGame
                playAudio={play}
                gameId={gameid}
                color={color.didRedirect}
              />
               <VideoChatApp
                mySocketId={socket.id}
                opponentSocketId={opponentSocketId}
                myUserName={props.myUserName}
                opponentUserName={opponentUserName}
              />
            </div>
            <h4 className="text-info mt-4"> You: {props.myUserName} </h4>
          </div>
        ) : gameSessionDoesNotExist ? (
          <div>
            <h1 style={{ textAlign: "center", marginTop: "200px" }}> :( </h1>
          </div>
        ) : (
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: String(window.innerHeight / 8) + "px",
              }}
            >
              Hey <strong>{props.myUserName}</strong>, copy and paste the URL
              below to send to your friend:
            </h1>
            <textarea
              style={{ marginLeft: String((window.innerWidth / 2) - 290) + "px", marginTop: "30" + "px", width: "580px", height: "30px"}}
              onFocus={(event) => {
                  console.log('sd')
                  event.target.select()
              }}
              value = {domainName + "/game/" + gameid+"/"+mode+"/"+addr+"/"+amount+"/"+nft}
              type = "text">
              </textarea>
            <br></br>

            <h1 style={{ textAlign: "center", marginTop: "100px" }}>
              {" "}
              Waiting for other opponent to join the game...{" "}
            </h1>
          </div>
        )}
      </React.Fragment>
    );
};

export default ChessGameWrapper