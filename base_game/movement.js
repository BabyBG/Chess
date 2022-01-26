//Page for calculating all possible moves, and also identifying moves that result in a piece being taken
//Assigns each to respective piece.possibleMoves or piece.moveTakesPiece properties for all pieces. 

///////////////////////////////////////////////////////////////////////
//calcPossibleMoves() is master move function, when called calculates all moves for all pieces
//can overwrite moves if called in wrong place
///////////////////////////////////////////////////////////////////////
function calcPossibleMoves() {
  
  //create array with all current white and black positions
  let whitePos = whitePieces.map(piece => piece.position);
  let blackPos = blackPieces.map(piece => piece.position);

  //begin movement calculations
  allPieces.forEach(piece => {
    piece.blocksEnemyKing = [];
    if (piece.position == false) {
      piece.possibleMoves = [];
      piece.moveTakesPiece = [];
    } else {
      calcMoveSwitch(piece, whitePos, blackPos);
      moveTakesPiece(piece, whitePos, blackPos);
    } 
  })

  //add invalidMoves and castling, if available
  masterInvalidCalc(whitePieces, blackPieces, e1King);
  masterInvalidCalc(blackPieces, whitePieces, e8King);
  bothKings.forEach(king => castlingPossible(king, whitePos, blackPos));
}

//directs to each specific piece's movement function further down this page
function calcMoveSwitch(piece, whitePos, blackPos) {
  switch(piece.constructor.name) {
    case "Pawn":
      piece.possibleMoves = pawnMovement(piece, whitePos, blackPos);
      break;
    case "Knight":
      piece.possibleMoves = knightMovement(piece, whitePos, blackPos);
      break;
    case "Bishop":
      piece.occupyLines = [];
      piece.possibleMoves = bishopMovement(piece, whitePos, blackPos);
      break;
    case "Rook":
      piece.occupyLines = [];
      piece.possibleMoves = rookMovement(piece, whitePos, blackPos);
      break;
    case "Queen":
      piece.occupyLines = [];
      piece.possibleMoves = queenMovement(piece, whitePos, blackPos);
      break;
    case "King":
      piece.possibleMoves = kingMovement(piece, whitePos, blackPos);
      break;
    default:
      alert("Piece somehow not identified in 'calcMoveSwitch'")
      console.log(piece)
  }
}


////////////////////////////////////////////////////////////////
//assigns all pawn moves using pawn arrays in position_arrays.js
////////////////////////////////////////////////////////////////
function pawnMovement(pawn, whitePos, blackPos) {
  
  //get relevant entry in pawn data array from position_arrays.js
  let validMoves = [];
  pawn.moveTakesPiece = [];
  pawn.whiteColor == true ? useArray = whitePawnArrays : useArray = blackPawnArrays;
  pawn.whiteColor == true ? enemyPieces = blackPieces : enemyPieces = whitePieces;
  let positionData = useArray.find(o => o.letter == pawn.position[0]).numberData[pawn.position[1]-1];
  //.numberData.find(o => o.number == pawn.position[1]);
 
  //This is the best place to identify pawns on the backline? Cant think of another way to check unobtrusively
  //if pawn is on backline run pawnBacklineAI to remove pawn and upgrade piece (queen default, but conditions
  //for other pieces too) 
  //pawnBacklineAI(pawn) if (positionData == false)
  //return;

  //set moves 1 & 2 variables
  let movesOne = positionData.movesTo[0]
  let movesTwo = positionData.movesTo[1]

  //assign king blocking moves
  pawn.blocksEnemyKing = positionData.diagonal;

  //check for vertical collision
  if (!whitePos.includes(movesOne) && !blackPos.includes(movesOne)) validMoves.push(movesOne)
  if (movesTwo != undefined && validMoves.length == 1) {
    if (!whitePos.includes(movesTwo) && !blackPos.includes(movesTwo)) validMoves.push(movesTwo)
  }

  //add diagonal taking moves
  positionData.diagonal.forEach(diagMove => {
    let diagTake = enemyPieces.find(o => o.position == diagMove);
    if (diagTake != undefined) {
      validMoves.push(diagMove);
      pawn.moveTakesPiece.push({selected: pawn, id: diagMove, actsOn: diagTake}); 
    }
  })

  //add en passant moves
  if (enPassantVulnerable != false && positionData.enPassant.includes(enPassantVulnerable.position)) {
    let diagPassant = positionData.diagonal[positionData.enPassant.indexOf(enPassantVulnerable.position)]
    validMoves.push(diagPassant);
    pawn.moveTakesPiece.push({selected: pawn, id: diagPassant, actsOn: enPassantVulnerable});
  }

  return validMoves;
}


////////////////////////////////////////////////////////////////////
//assigns all knight moves using knight arrays in position_arrays.js
////////////////////////////////////////////////////////////////////
function knightMovement(knight, whitePos, blackPos) {

  //set data arrays from position_arrays.js
  knight.whiteColor == true ? friendlyPositions = whitePos : friendlyPositions = blackPos;
  let positionData = knightArrays.find(o => o.letter == knight.position[0]).numberData[knight.position[1]-1];

  //assign king blocking moves
  knight.blocksEnemyKing = positionData.movesTo;
  
  //remove validMoves that are occupied by a friendly piece
  let validMoves = positionData.movesTo.filter(move => !friendlyPositions.includes(move));
  
  return validMoves;
}


////////////////////////////////////////////////////////////////
//assigns all bishop moves using diagonal arrays in make_grid.js
//function also called for creating queen diagonal moves
////////////////////////////////////////////////////////////////
function bishopMovement(bishop, whitePos, blackPos) {

  //set data arrays from position_arrays.js
  let positionData = bishopArrays.find(o => o.letter == bishop.position[0]).numberData[bishop.position[1]-1];

  //set enemyKing for use in linearCollision to stop kings self-blocking block
  bishop.whiteColor == true ? enemyKing = e8King : enemyKing = e1King;

  //map these arrays into validMoves, using linearCollision() to eliminate blocked movement
  let validMoves = positionData.movesTo.map(singleDiag => {

      //add occupyLines for future check calculations while we have the opportunity
      bishop.occupyLines.push(singleDiag)
      return linearCollision(bishop, singleDiag, whitePos, blackPos, enemyKing);
  })

  bishop.blocksEnemyKing = bishop.blocksEnemyKing.flat();

  return validMoves.flat();
}


//////////////////////////////////////////////////////////////////////
//assigns all rook moves using rows and columns arrays in make_grid.js
//function also called for creating queen horizontal and vertical moves
//////////////////////////////////////////////////////////////////////
function rookMovement(rook, whitePos, blackPos) {

  let positionLetter = rook.position[0];
  let positionNumber = rook.position[1];

  //find rows and columns the rook is present on from position_arrays.js
  let rookColumn = rookLetterArrays.find(o => o.letter == positionLetter).columns;
  let rookRow = rookNumberArrays[rook.position[1]-1].rows;
  
  //set piece.occupyLines for check pinning calculation
  rook.occupyLines.push(rookColumn, rookRow);

  //set enemyKing for use in linearCollision to stop kings self-blocking block
  rook.whiteColor == true ? enemyKing = e8King : enemyKing = e1King;

  //filter moves blocked by other pieces
  let evalColumns = linearCollision(rook, rookColumn, whitePos, blackPos, enemyKing);
  let evalRows = linearCollision(rook, rookRow, whitePos, blackPos, enemyKing);
  
  rook.blocksEnemyKing = rook.blocksEnemyKing.flat();

  return evalColumns.concat(evalRows);
}


/////////////////////////////////////////////////////////////////
//assigns all queen moves using bishopMovement() & rookMovement()
/////////////////////////////////////////////////////////////////
function queenMovement(queen, whitePos, blackPos) {
  let validMoves = bishopMovement(queen, whitePos, blackPos).concat(rookMovement(queen, whitePos, blackPos))
  return validMoves;
}


//////////////////////////////////////////////////////////////////
//assigns all king moves using king arrays from position_arrays.js
//////////////////////////////////////////////////////////////////
function kingMovement(king, whitePos, blackPos) {

  //set data arrays from position_arrays.js
  let positionData = kingArrays.find(o => o.letter == king.position[0]).numberData[king.position[1]-1];
  
  //.numberData.find(o => o.number == king.position[1]);
  king.whiteColor == true ? friendlyPos = whitePos : friendlyPos = blackPos;

  //assign piece.blocksEnemyKing
  king.blocksEnemyKing = positionData.movesTo;

  //filter moves that are not blocked by friendlies
  let validMoves = positionData.movesTo.filter(move => !friendlyPos.includes(move));

  return validMoves;
}


//////////////////////////////////////////////////////////////////////////////
//linearCollision() deletes moves that are blocked by friendly or enemy pieces
//used by bishopMovement(), rookMovement() and, by extension, queenMovement()
//////////////////////////////////////////////////////////////////////////////
function linearCollision(piece, movesArray, whitePos, blackPos, enemyKing) {

  //if piece is completely blocked from moving immediately return '[]' to avoid exception throw
  if (movesArray.length == 0) return movesArray;

  //set backupMoves for king blocking use
  let backupMoves = movesArray;

  //set white/black pieces to use
  piece.whiteColor == true ? enemyPos = blackPos : enemyPos = whitePos;
  piece.whiteColor == true ? friendlyPos = whitePos : friendlyPos = blackPos;

  //create positional index of original piece and index of enemy pieces on same lines
  let originIndex = movesArray.indexOf(piece.position);
  let opposingIndex = makeIndex(movesArray, enemyPos, originIndex, piece);

  //Remove enemy-blocked squares
  movesArray = removeBlockedByEnemy(movesArray, opposingIndex, originIndex);

  //Data arrays for piece.blocksEnemyKing & removeBlockedByFriendly()
  originIndex = movesArray.indexOf(piece.position);
  let friendlyIndex = makeIndex(movesArray, friendlyPos, originIndex, piece);
  let plusMinus = friendlyIndex.indexOf(originIndex);

  //get piece.blocksEnemyKing moves
  piece.blocksEnemyKing.push(getBlocksEnemyKing(movesArray, originIndex, friendlyIndex, plusMinus));
  
  //Remove friendly-blocked squares
  movesArray = removeBlockedByFriendly(movesArray, originIndex, friendlyIndex, plusMinus); 

  //if enemy king is present on examined line, run specialised getExtraBlockedKing()
  if (movesArray.includes(enemyKing.position)) getExtraBlockedKing(piece, backupMoves, enemyKing)
  
  return movesArray;
}

//Delete moves over the course of several if conditions using the data created in linearCollision()
//If move has index above a certain number and below a certain number it is considered returned as valid
function removeBlockedByEnemy(movesArray, piecesIndex, originIndex) {
  let plusMinus = piecesIndex.indexOf(originIndex);
  
  //Make sure move falls exactly between 1 friendly piece and 1 enemy piece, including the enemy piece square
  movesArray = movesArray.reduce(function(result, move) {
    if (movesArray.indexOf(move) < originIndex && movesArray.indexOf(move) >= piecesIndex[plusMinus-1]) {
      result.push(move);
    } else if (movesArray.indexOf(move) > originIndex && movesArray.indexOf(move) <= piecesIndex[plusMinus+1]) {
      result.push(move);
    } else if ( movesArray.indexOf(move) == originIndex) {
      result.push(move);
    }
    return result;
  }, []);

  return movesArray;
}

//Counterpart to removeBlockedByEnemy() above
function removeBlockedByFriendly(movesArray, originIndex, piecesIndex, plusMinus) {

  //Make sure move falls exactly between two friendly pieces
  movesArray = movesArray.reduce(function(result, move) {
    if (movesArray.indexOf(move) < originIndex && movesArray.indexOf(move) > piecesIndex[plusMinus-1]) {
      result.push(move);
    } else if (movesArray.indexOf(move) > originIndex && movesArray.indexOf(move) < piecesIndex[plusMinus+1]) {
      result.push(move);
    }
    return result;
  }, []);

  return movesArray;
}

//To identify all squares this piece prevents the enemy king moving to
function getBlocksEnemyKing(movesArray, originIndex, piecesIndex, plusMinus) {
  let blocksKing = []
  //Make sure square isn't blocked by a friendly piece, if it is include the friendly piece's square
  movesArray.forEach(move => {
    if (movesArray.indexOf(move) < originIndex && movesArray.indexOf(move) >= piecesIndex[plusMinus-1]) {
      blocksKing.push(move);
    } else if (movesArray.indexOf(move) > originIndex && movesArray.indexOf(move) <= piecesIndex[plusMinus+1]) {
      blocksKing.push(move);
    }
  })

  return blocksKing;
}

//To recheck blocksEnemyKing moves if the king was present on the line, avoids king self-blocking check
function getExtraBlockedKing(piece, movesArray, enemyKing) {
  
  //get the cells 1 space up and down the movesArray from the king's position
  let kingIndex = movesArray.indexOf(enemyKing.position);
  let moveIncrement = movesArray[kingIndex+1];
  let moveDecrement = movesArray[kingIndex-1];

  //if each of these cells don't contain the checking piece, and are not undefined, add to piece.blocksEnemyKing
  if (moveIncrement != undefined && piece.position != moveIncrement) piece.blocksEnemyKing.push(moveIncrement) 
  if (moveDecrement != undefined && piece.position != moveDecrement) piece.blocksEnemyKing.push(moveDecrement) 
}


//Fill index with piece locations, either same colour or opposite colour as required
function makeIndex(movesArray, knownOccupied, originIndex, piece) {
  
  //find all entries in the array that are occupied & then convert them into an array of indexes
  let occupied = movesArray.filter(o => knownOccupied.includes(o) || o == piece.position);
  let index = occupied.map(o => movesArray.indexOf(o));
  
  //if originIndex is the first or last entry, add a -2 or 10 respectively to start or end of array
  if (index[index.length - 1] == originIndex) index.push(10);
  if (index[0] == originIndex) index.unshift(-2);
  
  return index;
}


///////////////////////////////////////////////////////////////////////
//Searches piece.possibleMoves to return moves that take an ememy piece
//& assigns them to piece.moveTakesPiece.
///////////////////////////////////////////////////////////////////////
function moveTakesPiece(piece, whitePos, blackPos) {

  //Pawn taking is dealt with in pawnMovement() instead
  if (piece.constructor.name == "Pawn") return;

  //set/remove data needed
  piece.moveTakesPiece = [];
  piece.whiteColor == true ? enemyPieces = blackPieces : enemyPieces = whitePieces;
  
  //check if any enemy pieces occupy a possible move
  piece.possibleMoves.forEach(move => {
    let takePiece = enemyPieces.find(o => o.position == move);
    if (takePiece != undefined) {
      
      //push to piece.moveTakesPiece if enemy piece is found
      piece.moveTakesPiece.push({selected: piece, id: move, actsOn: takePiece}); 
    }
  })
}


///////////////////////////////////////////////////////
//if castling is possible, push extra moves to the king
//must be called after all the other movement functions
///////////////////////////////////////////////////////
function castlingPossible(king, whitePos, blackPos) {
  king.castles = [];

  //stop if king is in check
  if (king.inCheck != false || king.hasMoved == true) return;

  //break off into white and black specialised functions
  if (king.whiteColor == true) {
    whiteCastling(king, whitePos, blackPos)
  } else {
    blackCastling(king, whitePos, blackPos)
  }
}

//specialised white castling
function whiteCastling(king, wP, bP) { //shorten white & black pieces to wP & bP
  
  //examine queens's side castling
  if (a1Rook.hasMoved == false && castlingCells(king, ["b1", "c1", "d1"], ["c1", "d1"], wP, bP) == true) {
    king.possibleMoves.push("c1");
    king.castles.push({kingMoves: "c1", rook: a1Rook, rookMoves: "d1", returnRookTo: "a1"});
  }

  //examine king's side castling
  if (a8Rook.hasMoved == false && castlingCells(king, ["f1", "g1"], ["f1", "g1"], wP, bP) == true) {
    king.possibleMoves.push("g1");
    king.castles.push({kingMoves: "g1", rook: h1Rook, rookMoves: "f1", returnRookTo: "h1"});
  }
}

//specialised black castling
function blackCastling(king, wP, bP) {
  
  //examine queen's side castling
  if (h1Rook.hasMoved == false && castlingCells(king, ["b8", "c8", "d8"], ["c8", "d8"], wP, bP) == true) {
    king.possibleMoves.push("c8");
    king.castles.push({kingMoves: "c8", rook: a8Rook, rookMoves: "d8", returnRookTo: "a8"});
  }

  //examine king's side castling
  if (h8Rook.hasMoved == false && castlingCells(king, ["f8", "g8"], ["f8", "g8"], wP, bP) == true) {
    king.possibleMoves.push("g8");
    king.castles.push({kingMoves: "g8", rook: h8Rook, rookMoves: "f8", returnRookTo: "h8"});
  }
}

//checks if squares necessary for castling are clear & not in check
//returns true if all conditions met, false if not
function castlingCells(king, clearCells, mustNotCheck, wP, bP) {
  if (clearCells.every(cell => !wP.includes(cell) && !bP.includes(cell)) &&
  mustNotCheck.every(cell => !king.invalidMoves.includes(cell))) {
    return true;
  } else {
    return false;
  }
}