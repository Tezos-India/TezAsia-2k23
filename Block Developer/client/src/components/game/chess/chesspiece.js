class ChessPiece {
    constructor(name, isAttacked, color, id) {
        this.name = name ;
        this.isAttacked = isAttacked;
        this.color = color;
        this.id = id ;
    }

    setSquare(newSquare) {
        if (newSquare === undefined) {
            this.squareThisPieceIsOn = newSquare;
            return ;
        }
        if (this.squareThisPieceIsOn === undefined) {
            this.squareThisPieceIsOn = newSquare;
            newSquare.setPiece(this);
        }
        const isNewSquareDifferent = this.squareThisPieceIsOn.x != newSquare.x || this.squareThisPieceIsOn.y != newSquare.y;
        if (isNewSquareDifferent) {
            this.squareThisPieceIsOn = newSquare;
            newSquare.setPiece(this);
        }
    }
    getSquare() {
        return this.squareThisPieceIsOn;
    }
}

export default ChessPiece;