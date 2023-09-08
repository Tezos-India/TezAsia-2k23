class Square {
    constructor(x, y, pieceOnThisSquare, canvasCoord) {
        this.x = x;
        this.canvasCoord = canvasCoord;
        this.pieceOnThisSquare = pieceOnThisSquare;
    }

    setPiece(newPiece) {
        if (newPiece === null && this.pieceOnThisSquare === null) {
            return;
        } else if (newPiece === null) {
            this.pieceOnThisSquare.setSquare(undefined);
            this.pieceOnThisSquare = null;
        } else if (this.pieceOnThisSquare === null) {
            this.pieceOnThisSquare = newPiece;
            newPiece.setSquare(this);
        } else if (this.getPieceIdOnThisSquare() != newPiece.id && this.pieceOnThisSquare.color != newPiece.color) {
            console.log("capture!");
            this.pieceOnThisSquare = newPiece;
            newPiece.setSquare(this);
        } else {
            return "user tried to capture their own piece";
        }
    }

    removePiece() {
        this.pieceOnThisSquare = null;
    }

    getPiece() {
        return this.pieceOnThisSquare ;
    }

    getPieceIdOnThisSquare() {
        if (this.pieceOnThisSquare === null) {
            return "empty";
        }
        return this.pieceOnThisSquare.id;
    }

    isOccupied() {
        return this.pieceOnThisSquare != null;
    }

    getCoord() {
        return [this.x, this.y];
    }

    getCanvasCoord() {
        return this.canvasCoord;
    }
}

export default Square;