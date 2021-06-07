//master move function, when called calculates all moves for all pieces
//can overwrite moves if called in wrong place
function calcPossibleMoves() {
  allPieces.forEach(o => {
    //remove all possible moves if piece has been taken 
    if (o.position == "taken") {
      o.possibleMoves = [];
      o.moveTakesPiece = [];
      o.blocksEnemyKing = [];
    } else {
      calcMoveSwitch(o)
      moveTakesPiece(o)
    } 
  })
  //add invalidMoves and castling if available
  masterInvalidCalc(whitePieces, blackPieces, e1King);
  masterInvalidCalc(blackPieces, whitePieces, e8King);
  bothKings.forEach(king => castlingPossible(king));
}

function calcMoveSwitch(o, castling = false) {
  //not sure if a big deal but maybe 'blocksEnemyKing can stop the king taking an enemy king
  o.blocksEnemyKing = [];
  switch(o.constructor.name) {
    case "Pawn":
      o.possibleMoves = pawnMovement(o);
      break;
    case "Knight":
      o.possibleMoves = knightMovement(o);
      break;
    case "Bishop":
      o.possibleMoves = bishopMovement(o);
      break;
    case "Rook":
      o.possibleMoves = rookMovement(o);
      break;
    case "Queen":
      o.possibleMoves = queenMovement(o);
      break;
    case "King":
      o.possibleMoves = kingMovement(o);
      if (castling != false) {
        castlingPossible(o);
      }
      break;
    default:
      alert("Piece somehow not identified in 'calcMoveSwitch'")
      console.log(o)
  }
}

//Pawn movement
function pawnMovement(pawn) {
  let validMoves = [];
  let x = pawn.position[0];
  let y = parseInt(pawn.position[1]);
  //White pawn
  if (pawn.color == "white") {
    validMoves = pawnVerticalCollision(pawn, x + (y + 1), x + (y + 2), validMoves);
  //Black pawn
  } else {
    validMoves = pawnVerticalCollision(pawn, x + (y - 1), x + (y - 2), validMoves);
  }
  validMoves = pawnDiagonal(pawn, validMoves, cellIsEnemy);
  //en passant
  validMoves = addEnPassantMoves(pawn, x, y, validMoves);
  return validMoves;
}

//or maybe its pawDiagonal causing diagonal issues instead of enPassant
function pawnDiagonal(pawn, moves, funcToUse) {
  let x = pawn.position[0];
  let y = parseInt(pawn.position[1]);
  pawn.color == "white" ? increment = y + 1 : increment = y - 1;
  if (funcToUse(nextLetter(x, 1, "plus") + increment, pawn) != false) { 
    moves.push(nextLetter(x, 1, "plus") + increment);
  }
  if (funcToUse(nextLetter(x, 1, "minus") + increment, pawn) != false) {
    moves.push(nextLetter(x, 1, "minus") + increment);
  }
  return moves
}

function addEnPassantMoves(pawn, x, y, moves) {
  let rightCell = enPassantRight(pawn, x, y);
  let leftCell = enPassantLeft(pawn, x, y);
  pawn.offenseEnPassant = false
  if (rightCell.constructor.name == "Pawn" && rightCell.enPassant.takesSquare != undefined) {
    if (pawn.color == "white") {
      moves.push(nextLetter(x, 1, "plus") + (y + 1));
    } else {
      moves.push(nextLetter(x, 1, "plus") + (y - 1));
    }
    pawn.offenseEnPassant = rightCell;
  }
  if (leftCell.constructor.name == "Pawn" && leftCell.enPassant.takesSquare != undefined) {
    if (pawn.color == "white") {
      moves.push(nextLetter(x, 1, "minus") + (y + 1));
    } else {
      moves.push(nextLetter(x, 1, "minus") + (y - 1));
    }
    pawn.offenseEnPassant = leftCell;
  }
  return moves;
}

function enPassantLeft(pawn, x, y) {
  let leftLetter = nextLetter(x, 1, "minus");
  let leftCell = cellIsEnemy((leftLetter + y), pawn);
  return leftCell;
}

function enPassantRight(pawn, x, y) {
  let rightLetter = nextLetter(x, 1, "plus");
  let rightCell = cellIsEnemy((rightLetter + y), pawn);
  return rightCell;
}

//Knight movement
function knightMovement(knight) {
  let pos = knight.position;
  let y = parseInt(pos[1]);
  minOne = nextLetter(pos[0], 1, "minus");
  minTwo = nextLetter(pos[0], 2, "minus");
  plusOne = nextLetter(pos[0], 1, "plus");
  plusTwo = nextLetter(pos[0], 2, "plus");
  let validMoves = [minOne + (y + 2), minOne + (y - 2), minTwo + (y + 1), minTwo + (y - 1),
  plusOne + (y + 2), plusOne + (y - 2), plusTwo + (y + 1), plusTwo + (y - 1)];
  validMoves = validMoves.filter(o => allSquares.includes(o))
  //knight preventing king movement & piece collision detection is easily built in here
  knight.blocksEnemyKing = validMoves;
  validMoves = validMoves.filter(o => cellIsMoveable(o, knight) == true);
  return validMoves;
}

//Bishop movement
function bishopMovement(bishop) {
  let validMoves = [];
  let pos = bishop.position;
  //check black and white diagonals for matches
  let tempW = whiteDiag.filter(o => o.includes(pos));
  let tempB = blackDiag.filter(o => o.includes(pos));
  //run either 'tempW' or 'tempB' though 'linearCollision' function.
  //added condition when only 1 diagonal array available & second array returns undefined
  if (tempW.length == 0) { 
    if (tempB[1] == undefined) {
      linearKingBlocking(bishop, tempB[0])
      validMoves = linearCollision(bishop, tempB[0]);
      if (bishop.constructor.name == "Bishop") {
        bishop.occupyLines = tempB[0];
      }
    } else {
      linearKingBlocking(bishop, tempB[0])
      linearKingBlocking(bishop, tempB[1])
      validMoves = linearCollision(bishop, tempB[0]).concat(linearCollision(bishop, tempB[1]));
      if (bishop.constructor.name == "Bishop") {
        bishop.occupyLines = tempB;
      }
    }
  } else {
    if (tempW[1] == undefined) {
      linearKingBlocking(bishop, tempW[0])
      validMoves = linearCollision(bishop, tempW[0]);
      if (bishop.constructor.name == "Bishop") {
        bishop.occupyLines = tempW[0];
      }
    } else {
      linearKingBlocking(bishop, tempW[0])
      linearKingBlocking(bishop, tempW[1])
      validMoves = linearCollision(bishop, tempW[0]).concat(linearCollision(bishop, tempW[1]));
      if (bishop.constructor.name == "Bishop") {
        bishop.occupyLines = tempW;
      }
    }
  }
  return validMoves;
}

//Rook movement
function rookMovement(rook) {
  let pos = rook.position;
  let rookColumns = columns.filter(o => o.includes(pos)).flat();
  let rookRows = rows.filter(n => n.includes(pos)).flat();
  if (rook.constructor.name == "Rook") {
    rook.occupyLines = [rookColumns, rookRows];
  }
  linearKingBlocking(rook, rookColumns)
  linearKingBlocking(rook, rookRows)
  let evalColumns = linearCollision(rook, rookColumns);
  let evalRows = linearCollision(rook, rookRows);
  let validMoves = evalColumns.concat(evalRows);
  return validMoves;
}

//Queen movement (rook & bishop combined)
function queenMovement(queen) {
  let pos = queen.position;
  let validMoves = bishopMovement(queen).concat(rookMovement(queen))
  let tempW = whiteDiag.filter(o => o.includes(pos));
  let tempB = blackDiag.filter(o => o.includes(pos));
  let queenColumns = columns.filter(o => o.includes(pos)).flat()
  let queenRows = rows.filter(n => n.includes(pos)).flat()
  if (tempW.length == 0) {
    if (tempB[1] == undefined) {
      queen.occupyLines = [tempB[0], queenColumns, queenRows];
    } else {
      queen.occupyLines = [tempB[0], tempB[1], queenColumns, queenRows];
    }
  } else {
    if (tempW[1] == undefined) {
      queen.occupyLines = [tempW[0], queenColumns, queenRows];
    } else {
      queen.occupyLines = [tempW[0], tempW[1], queenColumns, queenRows];
    }
  }
  return validMoves;
}

//King Movement
function kingMovement(king) {
  let pos = king.position;
  let y = parseInt(pos[1]);
  minOne = nextLetter(pos[0], 1, "minus")
  plusOne = nextLetter(pos[0], 1, "plus")
  let validMoves = [minOne + (y - 1), minOne + (y), minOne + (y + 1), pos[0] + (y + 1),
  plusOne + (y + 1), plusOne + (y), plusOne + (y - 1), pos[0] + (y - 1)];
  validMoves = validMoves.filter(o => allSquares.includes(o));
  king.blocksEnemyKing = validMoves;
  validMoves = validMoves.filter(o => cellIsMoveable(o, king) == true);
  return validMoves;
}

//If castling is possible, push extra moves to the king
function castlingPossible(king) {
  king.castles = [];
  //does king pass basic castling requirements?
  if (king.hasMoved == true || king.inCheck != false) {
    return false;
  }
  king.color == "white" ? qSideR = whitePieces.find(o=>o.id=="a1Rook") : qSideR = blackPieces.find(o=>o.id=="a8Rook");
  king.color == "white" ? kSideR = whitePieces.find(o=>o.id=="h1Rook")  : kSideR = blackPieces.find(o=>o.id=="h8Rook");
  king.color == "white" ? row = rows[0] : row = rows[7];
  let isClear = linearCollision(king, row);
  //Queen Side
  if (queenSideCastling(king, isClear, qSideR) == true) {
    if (king.color == "white") {
      king.possibleMoves.push("c1");
      king.castles.push({kingMoves: "c1", rook: qSideR, rookMoves: "d1", returnRookTo: "a1"});
    } else {
      king.possibleMoves.push("c8");
      king.castles.push({kingMoves: "c8", rook: qSideR, rookMoves: "d8", returnRookTo: "a8"});
    }
  }
  //King Side
  if (kingSideCastling(king, isClear, kSideR) == true) {
    if (king.color == "white") {
      king.possibleMoves.push("g1");
      king.castles.push({kingMoves: "g1", rook: kSideR, rookMoves: "f1", returnRookTo: "h1"});
    } else {
      king.possibleMoves.push("g8");
      king.castles.push({kingMoves: "g8", rook: kSideR, rookMoves: "f8", returnRookTo: "h8"});
    }
  }
}

function queenSideCastling(king, isClear, qSideR) {
  if (qSideR != undefined) {
    if (qSideR.hasMoved == true) {
      return false;
    }
    king.color == "white" ? necessaryCells = ["b1", "c1", "d1"] : necessaryCells = ["b8", "c8", "d8"];
    if (!necessaryCells.every(o => isClear.includes(o))) {
      return false;
    }
    king.color == "white" ? lookForCheck = ["c1", "d1"] : lookForCheck = ["c8", "d8"];
    if (lookForCheck.some(o => king.invalidMoves.includes(o))) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

function kingSideCastling(king, isClear, kSideR) {
  if (kSideR != undefined) {
    if (kSideR.hasMoved == true) {
      return false;
    }
    king.color == "white" ? necessaryCells = ["f1", "g1"] : necessaryCells = ["f8", "g8"];
    if (!necessaryCells.every(o => isClear.includes(o))) {
      return false;
    }
    king.color == "white" ? lookForCheck = ["f1", "g1"] : lookForCheck = ["f8", "g8"];
    if (lookForCheck.some(o => king.invalidMoves.includes(o))) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

//to calculate piece.blockEnemyKing for bishops, rooks and queens, used later in check calculations
function linearKingBlocking(piece, moves) {
  if (moves.length === 0) {
    return;
  }
  piece.color == "white" ? enemyKing = e8King : enemyKing = e1King;
  let originIndex = moves.indexOf(piece.position);
  //remove enemy king from consideration
  let occupied = allPieces.filter(o => o.id != enemyKing.id).map(o => o.position);
  let occupiedMoves = moves.filter(o => occupied.includes(o))
  let index = occupiedMoves.map(o => moves.indexOf(o));
  if (index[index.length - 1] == originIndex) {
    index.push(10);
  }
  if (index[0] == originIndex) {
    index.unshift(-2);
  }
  let minusOrPlusOne = index.indexOf(originIndex);
  moves.forEach(o => {
    if (moves.indexOf(o) != originIndex && (moves.indexOf(o) <= originIndex && moves.indexOf(o) >= index[minusOrPlusOne - 1] ||
    moves.indexOf(o) >= originIndex && moves.indexOf(o) <= index[minusOrPlusOne + 1])) {
      piece.blocksEnemyKing.push(o);
    }
  })
}

//'linearCollision' is used for horizontal, vertical and diagonal collision while moving
function linearCollision(piece, moves) {
  //if piece is completely blocked from moving immediately return '[]' to avoid exception throw
  if (moves.length === 0) {
    return moves;
  }
  piece.color == "white" ? oppositeColor = "black" : oppositeColor = "white";
  moves = oppositeColorCollision(piece, moves, oppositeColor);
  moves = sameColorCollision(piece, moves);
  return moves;
}

function oppositeColorCollision(piece, moves, oppositeColor) {
  let originIndex = moves.indexOf(piece.position);
  let oppositeIndex = makeIndex(moves, oppositeColor, originIndex, piece);
  let minusOrPlusOne = oppositeIndex.indexOf(originIndex);
  moves = moves.filter(o => moves.indexOf(o) < originIndex && moves.indexOf(o) >= oppositeIndex[minusOrPlusOne -1]
  || moves.indexOf(o) > originIndex && moves.indexOf(o) <= oppositeIndex[minusOrPlusOne + 1] || moves.indexOf(o) == originIndex)
  return moves;
}

function sameColorCollision(piece, moves) {
  let originIndex = moves.indexOf(piece.position);
  let sameIndex = makeIndex(moves, piece.color, originIndex, piece);
  let minusOrPlusOne = sameIndex.indexOf(originIndex);
  moves = moves.filter(o => moves.indexOf(o) < originIndex && moves.indexOf(o) > sameIndex[minusOrPlusOne - 1] 
  || moves.indexOf(o) > originIndex && moves.indexOf(o) < sameIndex[minusOrPlusOne + 1]);
  return moves;
}

//Fill index with piece locations, either same colour or opposite colour
function makeIndex(moves, color, originIndex, piece) {
  let occupied = moves.filter(o => findOccupied(color).includes(o) || o == piece.position);
  let index = occupied.map(o => moves.indexOf(o));
  if (index[index.length - 1] == originIndex) {
    index.push(10);
  }
  if (index[0] == originIndex) {
    index.unshift(-2);
  }
  return index
}

function pawnVerticalCollision(pawn, posOne, posTwo, validMoves) {
  if (pawn.hasMoved == true) {
    if (cellIsBlank(posOne, pawn, "null") == true) {
      validMoves.push(posOne)
    }
  } else {
    if (cellIsBlank(posOne, pawn, "null") == true) {
      validMoves.push(posOne)
      if (cellIsBlank(posTwo, pawn, "null") == true) {
        validMoves.push(posTwo);
      }
    }
  }
  return validMoves;
}

//Searches piece.possibleMoves to return moves that take an ememy piece
function moveTakesPiece(piece) {
  piece.moveTakesPiece = [];
  //standard piece taking
  piece.possibleMoves.forEach(o => {
    let temp = cellIsEnemy(o, piece);
    if (temp != false) {
      piece.moveTakesPiece.push({selected: piece, id: o, actsOn: temp}); 
    }
  })
  //en passant piece taking
  if (piece.constructor.name == "Pawn" && piece.offenseEnPassant != false) {
    let blankDiagonals = pawnDiagonal(piece, [], cellIsBlank);
    let blankTaking = piece.possibleMoves.find(e => blankDiagonals.includes(e));
    piece.moveTakesPiece.push({selected: piece, id: blankTaking, actsOn: piece.offenseEnPassant});
  }
}