import { useReducer } from 'react'
import ChessContext from "./chess-context";

const defaultChessState = {
    moveState: {}
}

const chessReducer = (state, action) => {
    if (action.type==='MOVE') {

    }
}

const ChessProvider = (props) => {
    const [chessState, dispatchChessAction] = useReducer(chessReducer, defaultChessState)

    const chessContext = {
        moveState: {}
    }

    return (
        <ChessContext.Provider value={chessContext}>
            {props.children}
        </ChessContext.Provider>
    )
}

export default ChessProvider