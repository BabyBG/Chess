//assign score values to each piece's position, higher where the piece is stronger,
//& lower where it is weaker
//NEED TO REBALANCE POINTS VALUES ASSIGNED IN COMPARE MATERIAL,
//CLOSER TO ACTUAL MATERIAL POINTS VALUE?
function scorePositions(player) {
  let score = 0;
  if (player.whiteColor == true) {
    score = player.activePieces.map(piece => {
      if (piece.position != false) {
        let pieceScore = whitePositionScoring(piece)
        return pieceScore;
      } else {
        return 0
      }
    })
  } else {
    score = player.activePieces.map(piece => {
      if (piece.position != false) {
        let pieceScore = blackPositionScoring(piece);
        return pieceScore;
      } else {
        return 0
      }
    })
  }
  return score.reduce((a, b) => a + b, 0);
}

function whitePositionScoring(piece) {
  let score = 0;
  switch(piece.constructor.name) {
    case "Pawn":
      score = whitePawn(piece.position);
      break;
    case "Knight":
      score = whiteKnight(piece.position);
      break;
    case "Bishop":
      score = whiteBishop(piece.position);
      break;
    case "Rook":
      score = whiteRook(piece.position);
      break;
    case "Queen":
      score = whiteQueen(piece.position);
      break;
    case "King":
      score = whiteKing(piece.position);
      break;
    default:
      alert("Piece somehow not identified in 'whitePositionScoring'")
      console.log(piece);
  }
  return score;
}

function blackPositionScoring(piece) {
  let score = 0;
  switch(piece.constructor.name) {
    case "Pawn":
      score = blackPawn(piece.position);
      break;
    case "Knight":
      score = blackKnight(piece.position);
      break;
    case "Bishop":
      score = blackBishop(piece.position);
      break;
    case "Rook":
      score = blackRook(piece.position);
      break;
    case "Queen":
      score = blackQueen(piece.position);
      break;
    case "King":
      score = blackKing(piece.position);
      break;
    default:
      alert("Piece somehow not identified in 'blackPositionScoring'")
      console.log(piece);
  }
  return score;
}

//Tidy up this section by deleting duplicate code for black and just passing the blackSwitch
//functions as a variable in the main position scoring function.
function whitePawn(position) {
  let boardPoints = [[0, 0.5, 0.5, 0, 0.5, 1, 5, 0], [0, 1, -0.5, 0, 0.5, 1, 5, 0], [0, 1, -1, 0, 1, 2, 5, 0],
  [0, -2, 0, 2, 2.5, 3, 5, 0], [0, -2, 0, 2, 2.5, 3, 5, 0], [0, 1, -1, 0, 1, 2, 5, 0], [0, 1, -0.5, 0, 0.5, 1, 5, 0],
  [0, 0.5, 0.5, 0, 0.5, 1, 5, 0]];
  let x = position[0].charCodeAt(0) - 97;
  let y = parseInt(position[1]) - 1;
  return boardPoints[x][y];
}

function whiteKnight(position) {
  let boardPoints = [[-5, -4, -3, -3, -3, -3, -4, -5],[-3, -2, 0.5, 0, 0.5, 0, -2, -3],[-3, 0, 1, 1.5, 1.5, 1, 0, -3],
  [-3, 0.5, 1.5, 2, 2, 1.5, 0, -3],[-3, 0.5, 1.5, 2, 2, 1.5, 0, -3],[-3, 0, 1, 1.5, 1.5, 1, 0, -3],
  [-3, -2, 0.5, 0, 0.5, 0, -2, -3],[-5, -4, -3, -3, -3, -3, -4, -5]];
  let x = position[0].charCodeAt(0) - 97;
  let y = parseInt(position[1]) - 1;
  return boardPoints[x][y];
}

function whiteBishop(position) {
  let boardPoints = [[-2, -1, -1, -1, -1, -1, -1, -2], [-1, 0.5, 1, 0, 0.5, 0, 0, -1],[-1, 0, 1, 1, 0.5, 0.5, 0, -1],
  [-1, 0, 1, 1, 1, 1, 0, -1],[-1, 0, 1, 1, 1, 1, 0, -1],[-1, 0, 1, 1, 0.5, 0.5, 0, -1],
  [-1, 0.5, 1, 0, 0.5, 0, 0, -1],[-2, -1, -1, -1, -1, -1, -1, -2]];
  let x = position[0].charCodeAt(0) - 97;
  let y = parseInt(position[1]) - 1;
  return boardPoints[x][y];
}

function whiteRook(position) {
  let boardPoints = [[0, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0],[0, 0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 1, 0],
  [0.5, 0, 0, 0, 0, 0, 1, 0],[0.5, 0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 1, 0],
  [0, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0]];
  let x = position[0].charCodeAt(0) - 97;
  let y = parseInt(position[1]) - 1;
  return boardPoints[x][y];
}

function whiteQueen(position) {
  let boardPoints = [[-2, -1, -1, 0, -0.5, -1, -1, -2],[-1, 0, 0.5, 0, 0, 0, 0, -1],
  [-1, 0.5, 0.5, 0.5, 0.5, 0.5, 0, -1],[-0.5, 0, 0.5, 0.5, 0.5, 0.5, 0, -0.5],[-0.5, 0, 0.5, 0.5, 0.5, 0.5, 0, -0.5],
  [-1, 0.5, 0.5, 0.5, 0.5, 0.5, 0, -1],[-1, 0, 0.5, 0, 0, 0, 0, -1],[-2, -1, -1, 0, -0.5, -1, -1, -2]];
  let x = position[0].charCodeAt(0) - 97;
  let y = parseInt(position[1]) - 1;
  return boardPoints[x][y];
}

function whiteKing(position) {
  let boardPoints = [[2, 2, -1, -2, -3, -3, -3, -3],[3, 2, -2, -3, -4, -4, -4, -4],[1, 0, -2, -3, -4, -4, -4, -4],
  [0, 0, -2, -4, -5, -5, -5, -5],[0, 0, -2, -4, -5, -5, -5, -5],[1, 0, -2, -3, -4, -4, -4, -4],
  [3, 2, -2, -3, -4, -4, -4, -4],[2, 2, -1, -2, -3, -3, -3, -3]];
  let x = position[0].charCodeAt(0) - 97;
  let y = parseInt(position[1]) - 1;
  return boardPoints[x][y];
}

function blackPawn(position) {
  let boardPoints = [[0, 0.5, 0.5, 0, 0.5, 1, 5, 0], [0, 1, -0.5, 0, 0.5, 1, 5, 0], [0, 1, -1, 0, 1, 2, 5, 0],
  [0, -2, 0, 2, 2.5, 3, 5, 0], [0, -2, 0, 2, 2.5, 3, 5, 0], [0, 1, -1, 0, 1, 2, 5, 0], [0, 1, -0.5, 0, 0.5, 1, 5, 0],
  [0, 0.5, 0.5, 0, 0.5, 1, 5, 0]];
  let x = blackLetterSwitch(position[0]);
  let y = blackNumberSwitch(parseInt(position[1]));
  return boardPoints[x][y];
}

function blackKnight(position) {
  let boardPoints = [[-5, -4, -3, -3, -3, -3, -4, -5],[-3, -2, 0.5, 0, 0.5, 0, -2, -3],[-3, 0, 1, 1.5, 1.5, 1, 0, -3],
  [-3, 0.5, 1.5, 2, 2, 1.5, 0, -3],[-3, 0.5, 1.5, 2, 2, 1.5, 0, -3],[-3, 0, 1, 1.5, 1.5, 1, 0, -3],
  [-3, -2, 0.5, 0, 0.5, 0, -2, -3],[-5, -4, -3, -3, -3, -3, -4, -5]];
  let x = blackLetterSwitch(position[0]);
  let y = blackNumberSwitch(parseInt(position[1]));
  return boardPoints[x][y];
}

function blackBishop(position) {
  let boardPoints = [[-2, -1, -1, -1, -1, -1, -1, -2], [-1, 0.5, 1, 0, 0.5, 0, 0, -1],[-1, 0, 1, 1, 0.5, 0.5, 0, -1],
  [-1, 0, 1, 1, 1, 1, 0, -1],[-1, 0, 1, 1, 1, 1, 0, -1],[-1, 0, 1, 1, 0.5, 0.5, 0, -1],
  [-1, 0.5, 1, 0, 0.5, 0, 0, -1],[-2, -1, -1, -1, -1, -1, -1, -2]];
  let x = blackLetterSwitch(position[0]);
  let y = blackNumberSwitch(parseInt(position[1]));
  return boardPoints[x][y];
}

function blackRook(position) {
  let boardPoints = [[0, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0],[0, 0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 1, 0],
  [0.5, 0, 0, 0, 0, 0, 1, 0],[0.5, 0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 1, 0],
  [0, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0]];
  let x = blackLetterSwitch(position[0]);
  let y = blackNumberSwitch(parseInt(position[1]));
  return boardPoints[x][y];
}

function blackQueen(position) {
  let boardPoints = [[-2, -1, -1, 0, -0.5, -1, -1, -2],[-1, 0, 0.5, 0, 0, 0, 0, -1],
  [-1, 0.5, 0.5, 0.5, 0.5, 0.5, 0, -1],[-0.5, 0, 0.5, 0.5, 0.5, 0.5, 0, -0.5],[-0.5, 0, 0.5, 0.5, 0.5, 0.5, 0, -0.5],
  [-1, 0.5, 0.5, 0.5, 0.5, 0.5, 0, -1],[-1, 0, 0.5, 0, 0, 0, 0, -1],[-2, -1, -1, 0, -0.5, -1, -1, -2]];
  let x = blackLetterSwitch(position[0]);
  let y = blackNumberSwitch(parseInt(position[1]));
  return boardPoints[x][y];
}

function blackKing(position) {
  let boardPoints = [[2, 2, -1, -2, -3, -3, -3, -3],[3, 2, -2, -3, -4, -4, -4, -4],[1, 0, -2, -3, -4, -4, -4, -4],
  [0, 0, -2, -4, -5, -5, -5, -5],[0, 0, -2, -4, -5, -5, -5, -5],[1, 0, -2, -3, -4, -4, -4, -4],
  [3, 2, -2, -3, -4, -4, -4, -4],[2, 2, -1, -2, -3, -3, -3, -3]];
  let x = blackLetterSwitch(position[0]);
  let y = blackNumberSwitch(parseInt(position[1]));
  return boardPoints[x][y];
}

function blackLetterSwitch(digit) {
  switch(digit) {
    case "a":
      digit = 7;
      break;
    case "b":
      digit = 6;
      break;
    case "c":
      digit = 5;
      break;
    case "d":
      digit = 4;
      break;
    case "e":
      digit = 3;
      break;
    case "f":
      digit = 2;
      break;
    case "g":
      digit = 1;
      break;
    case "h":
      digit = 0;
      break;
    default:
      alert("letter not within a-h range in 'blackLetterSwitch'")
      console.log(digit);
  }
  return digit;
}

function blackNumberSwitch(digit) {
  switch(digit) {
    case 1:
      digit = 7;
      break;
    case 2:
      digit = 6;
      break;
    case 3:
      digit = 5;
      break;
    case 4:
      digit = 4;
      break;
    case 5:
      digit = 3;
      break;
    case 6:
      digit = 2;
      break;
    case 7:
      digit = 1;
      break;
    case 8:
      digit = 0;
      break;
    default:
      alert("number not within 1-8 range in 'blackNumberSwitch'")
      console.log(digit);
  }
  return digit;
}