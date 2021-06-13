///////////////////////////////////////////////////////////////////////
//master move function, when called calculates all moves for all pieces
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

//directs to each specific piece's movement function
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
  
  //get relevant entry in pawn data array
  let validMoves = [];
  pawn.moveTakesPiece = [];
  pawn.whiteColor == true ? useArray = whitePawnArrays : useArray = blackPawnArrays;
  pawn.whiteColor == true ? enemyPieces = blackPieces : enemyPieces = whitePieces;
  let positionData = useArray.find(data => data.square == pawn.position);

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
  
  //set data arrays
  knight.whiteColor == true ? friendlyPositions = whitePos : friendlyPositions = blackPos;
  let positionData = knightArrays.find(data => data.square == knight.position);

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

  //find the diagonal arrays this bishop is a part of
  //finish the position_arrays.js for bishop instead of this filter
  let whiteTiles = whiteDiag.filter(o => o.includes(bishop.position));
  let blackTiles = blackDiag.filter(o => o.includes(bishop.position));
  whiteTiles.length == 0 ? useDiagArray = blackTiles : useDiagArray = whiteTiles;

  //map these arrays into validMoves, using linearCollision() to eliminate blocked movement
  let validMoves = useDiagArray.map(singleDiag => {

      //add occupyLines for future check calculations while we have the opportunity
      bishop.occupyLines.push(singleDiag)
      return linearCollision(bishop, singleDiag, whitePos, blackPos);
  })

  bishop.blocksEnemyKing = bishop.blocksEnemyKing.flat();

  return validMoves.flat();
}


//////////////////////////////////////////////////////////////////////
//assigns all rook moves using rows and columns arrays in make_grid.js
//function also called for creating queen horizontal and vertical moves
//////////////////////////////////////////////////////////////////////
function rookMovement(rook, whitePos, blackPos) {

  //find rows and columns the rook is present on
  let rookColumns = columns.find(o => o.includes(rook.position));
  let rookRows = rows.find(o => o.includes(rook.position));
  
  //set piece.occupyLines for check pinning calculation
  rook.occupyLines.push(rookColumns, rookRows);

  //filter moves blocked by other pieces
  let evalColumns = linearCollision(rook, rookColumns, whitePos, blackPos);
  let evalRows = linearCollision(rook, rookRows, whitePos, blackPos);
  
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

  //set data arrays
  let positionData = kingArrays.find(data => data.square == king.position)
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
function linearCollision(piece, movesArray, whitePos, blackPos) {
  
  //if piece is completely blocked from moving immediately return '[]' to avoid exception throw
  if (movesArray.length == 0) return movesArray;

  //set white/black pieces to use
  piece.whiteColor == true ? enemyPos = blackPos : enemyPos = whitePos;
  piece.whiteColor == true ? friendlyPos = whitePos : friendlyPos = blackPos;
  
  //create index data, positional index of original piece, which positions in movesArray 
  //are occupied, and if the occupied square is friendly or not
  let originIndex = movesArray.indexOf(piece.position);
  let opposingIndex = makeIndex(movesArray, enemyPos, originIndex, piece);
  
  //first test is for moves blocked by enemy pieces, followed by a test for moves blocked by friendly pieces  
  movesArray = removeBlockedByEnemy(movesArray, opposingIndex, originIndex);
  movesArray = removeBlockedByFriendly(movesArray, friendlyPos, piece);
  
  //while we're here add moves to piece.blocksEnemyKing
  piece.blocksEnemyKing.push(movesArray);

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

//Counterpart to removeBlockedByEnemy(), above
function removeBlockedByFriendly(movesArray, friendlyPos, piece) {

  //removeBlockedByFriendly needs it's own set of data arrays to work with
  let originIndex = movesArray.indexOf(piece.position);
  let piecesIndex = makeIndex(movesArray, friendlyPos, originIndex, piece)
  let plusMinus = piecesIndex.indexOf(originIndex);
  
  //Make sure move falls exactly between two friendly pieces
  movesArray = movesArray.reduce(function(result, move) {
    if (movesArray.indexOf(move) < originIndex && movesArray.indexOf(move) > piecesIndex[plusMinus-1]) {
      result.push(move)
    } else if (movesArray.indexOf(move) > originIndex && movesArray.indexOf(move) < piecesIndex[plusMinus+1]) {
      result.push(move) 
    }
    return result;
  }, []);

  return movesArray;
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
    king.castles.push({kingMoves: "g1", rook: a8Rook, rookMoves: "f1", returnRookTo: "h1"});
  }
}

//specialised black castling
function blackCastling(king, wP, bP) {
  
  //examine queen's side castling
  if (h1Rook.hasMoved == false && castlingCells(king, ["b8", "c8", "d8"], ["c8", "d8"], wP, bP) == true) {
    king.possibleMoves.push("c8");
    king.castles.push({kingMoves: "c8", rook: qSideR, rookMoves: "d8", returnRookTo: "a8"});
  }

  //examine king's side castling
  if (h8Rook.hasMoved == false && castlingCells(king, ["f8", "g8"], ["f8", "g8"], wP, bP) == true) {
    king.possibleMoves.push("g8");
    king.castles.push({kingMoves: "g8", rook: kSideR, rookMoves: "f8", returnRookTo: "h8"});
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