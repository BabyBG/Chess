//Holds templates for creating each piece
//Responsible for initial attachment of piece graphics to board
//Adds taken pieces graphic to side board

//Piece templates
class Pawn {
  constructor(color, startPosition) {
    this.whiteColor = color;
    this.position = startPosition;
    this.pointsValue = 10;
    this.id = startPosition + "Pawn";
    this.hasMoved = false;
    this.possibleMoves = "";
    this.moveTakesPiece = [];
    this.invalidMoves = [];
    this.offenseEnPassant = false;
    this.blocksEnemyKing = [];
  }
}

class Knight {
  constructor(color, startPosition) {
    this.whiteColor = color;
    this.position = startPosition;
    this.pointsValue = 30;
    this.id = startPosition + "Knight";
    this.hasMoved = false;
    this.possibleMoves = "";
    this.moveTakesPiece = [];
    this.invalidMoves = [];
    this.blocksEnemyKing = [];
  }
}

class Bishop {
  constructor(color, startPosition) {
    this.whiteColor = color;
    this.position = startPosition;
    this.pointsValue = 30;
    this.id = startPosition + "Bishop";
    this.hasMoved = false;
    this.possibleMoves = "";
    this.moveTakesPiece = [];
    this.invalidMoves = [];
    this.occupyLines = [];
    this.blocksEnemyKing = [];
  }
}

class Rook {
  constructor(color, startPosition) {
    this.whiteColor = color;
    this.position = startPosition;
    this.pointsValue = 50;
    this.id = startPosition + "Rook";
    this.hasMoved = false;
    this.possibleMoves = "";
    this.moveTakesPiece = [];
    this.invalidMoves = [];
    this.occupyLines = [];
    this.blocksEnemyKing = [];
  }  
}

class Queen {
  constructor(color, startPosition) {
    this.whiteColor = color;
    this.position = startPosition;
    this.pointsValue = 90;
    this.id = startPosition + "Queen";
    this.hasMoved = false;
    this.possibleMoves = "";
    this.moveTakesPiece = [];
    this.invalidMoves = [];
    this.occupyLines = [];
    this.blocksEnemyKing = [];
  }
}

class King {
  constructor(color, startPosition) {
    this.whiteColor = color;
    this.position = startPosition;
    this.pointsValue = 0;
    this.id = startPosition + "King";
    this.hasMoved = false;
    this.castles = [];
    this.inCheck = false;
    this.possibleMoves = "";
    this.moveTakesPiece = [];
    this.invalidMoves = [];
    this.blocksEnemyKing = [];
  }
}

//Create pieces, assign their starting positions & populate arrays
let e1King = new King(true, "e1");
let e8King = new King(false, "e8");

let bothKings = [e1King, e8King];
let whitePieces = [];
let blackPieces = [];
let allPawns = [];

//keep rooks global for easy castling calculation
let a1Rook = new Rook(true, "a1");
let h1Rook = new Rook(true, "h1");
let a8Rook = new Rook(false, "a8");
let h8Rook = new Rook(false, "h8");

//White
function makeWhite() {
  let a2Pawn = new Pawn(true, "a2");
  let b2Pawn = new Pawn(true, "b2");
  let c2Pawn = new Pawn(true, "c2");
  let d2Pawn = new Pawn(true, "d2");
  let e2Pawn = new Pawn(true, "e2");
  let f2Pawn = new Pawn(true, "f2");
  let g2Pawn = new Pawn(true, "g2");
  let h2Pawn = new Pawn(true, "h2");
  let b1Knight = new Knight(true, "b1");
  let g1Knight = new Knight(true, "g1");
  let c1Bishop = new Bishop(true, "c1");
  let f1Bishop = new Bishop(true, "f1");
  let d1Queen = new Queen(true, "d1");
  whitePieces = [a2Pawn, b2Pawn, c2Pawn, d2Pawn, e2Pawn, f2Pawn, g2Pawn, h2Pawn,
  b1Knight, g1Knight, c1Bishop, f1Bishop, a1Rook, h1Rook, d1Queen, e1King];
  allPawns = [a2Pawn, b2Pawn, c2Pawn, d2Pawn, e2Pawn, f2Pawn, g2Pawn, h2Pawn];
}

//Black
function makeBlack() {
  let a7Pawn = new Pawn(false, "a7");
  let b7Pawn = new Pawn(false, "b7");
  let c7Pawn = new Pawn(false, "c7");
  let d7Pawn = new Pawn(false, "d7");
  let e7Pawn = new Pawn(false, "e7");
  let f7Pawn = new Pawn(false, "f7");
  let g7Pawn = new Pawn(false, "g7");
  let h7Pawn = new Pawn(false, "h7");
  let b8Knight = new Knight(false, "b8");
  let g8Knight = new Knight(false, "g8");
  let c8Bishop = new Bishop(false, "c8");
  let f8Bishop = new Bishop(false, "f8");
  let d8Queen = new Queen(false, "d8");
  blackPieces = [a7Pawn, b7Pawn, c7Pawn, d7Pawn, e7Pawn, f7Pawn, g7Pawn, h7Pawn,
  b8Knight, g8Knight, c8Bishop, f8Bishop, a8Rook, h8Rook, d8Queen, e8King];
  allPawns = allPawns.concat(a7Pawn, b7Pawn, c7Pawn, d7Pawn, e7Pawn, f7Pawn, g7Pawn, h7Pawn);
}

makeWhite();
makeBlack();
let allPieces = whitePieces.concat(blackPieces);

//Create image of game piece on board
function attachImage(piece) {
  let img = document.createElement("img");
  img.className = "gamePiece";
  img.id = piece.id.substr(0, 2) + piece.constructor.name;
  piece.whiteColor == true? color = "white" : color = "black"
  img.src = color + "_pieces/" + piece.constructor.name + ".svg";
  let src = document.getElementById(piece.position);
  src.appendChild(img);
  img.draggable = true;
  document.getElementById(img.id).setAttribute('ondragstart', 'drag(event)')
}

allPieces.forEach(o => attachImage(o))
 
//for adding taken pieces to the sideboard
function takenPieces() {
  let takenContainer = document.getElementById("takenContainer")
  allPieces.forEach(piece => {
    let cell = document.createElement("div");
    cell.className = "takenPieceCell";
    cell.id = "taken" + piece.id;
    takenContainer.appendChild(cell);
  })
}

takenPieces()