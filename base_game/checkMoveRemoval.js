//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Master function to create all piece.invalidMoves & then purge piece.possibleMoves & piece.moveTakesPiece
//usually called twice - once for black, once for white
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function masterInvalidCalc(friendlyPieces, enemyPieces, king) {

  //make temporary pieceSet arrays to account for pieces temporarily taken by AI planning.
  let useFriendlyPieces = friendlyPieces.filter(o => o.position != false);
  let useEnemyPieces = enemyPieces.filter(o => o.position != false);

  //make an array of all occupied positions
  let fOccupied = useFriendlyPieces.map(p => p.position);
  let eOccupied = useEnemyPieces.map(o => o.position);

  //reset all piece.invalidMoves & find if king is in check
  useFriendlyPieces.forEach(o => o.invalidMoves = []);
  isKingChecked(king, useEnemyPieces);

  //king not needed in useFriendlyPieces anymore, so remove it
  useFriendlyPieces.splice((useFriendlyPieces.length) -1, 1)

  //find all lines of attack to the king in diagonals/rows/columns, then all pinned pieces
  let attackLines = kingAttackLines(king, useEnemyPieces);
  let pinnedPieces = isPinned(king, attackLines, fOccupied, eOccupied, useFriendlyPieces);

  //if king is in check unlock further if conditions to create invalidMoves
  if (king.inCheck != false) {

    //if king is checked by multiple pieces simultaneously make everything not king-based an invalidMove
    if (king.inCheck.length > 1) {
      useFriendlyPieces.forEach(piece => {
        if (piece.constructor != "King") piece.invalidMoves = piece.possibleMoves;
      })
    
    //if king is checked by only one piece make everything that doesnt block/take that piece invalid
    } else {
      let onlyTheseMovesValid = whenCheckedByOne(king);
      useFriendlyPieces.forEach(piece => {
        piece.invalidMoves = piece.possibleMoves.filter(move => !onlyTheseMovesValid.includes(move));
      })
      
      //pinned pieces will be unable to move
      pinnedPieces.forEach(element => element.piece.invalidMoves = element.piece.possibleMoves);
    }

  //if king is not in check look only for pinned pieces
  } else {
    pinnedPieces.forEach(element => {
      element.piece.invalidMoves = element.piece.possibleMoves.filter(move => !element.validMoves.includes(move));
    })
  }

  //purge any move from piece.possibleMoves or piece.moveTakesPiece that is found in piece.invalidMoves
  deleteInvalid(king);;
  useFriendlyPieces.forEach(piece => deleteInvalid(piece));
}


//////////////////////////////////////////////////////////////////////////////
//Determine if king is in check, where from, and which squares block the check
//////////////////////////////////////////////////////////////////////////////
//Creates king.invalidMoves, uses them to determine if king is in check
function isKingChecked(king, enemyPieces) {
  king.invalidMoves = enemyPieces.map(o => o.blocksEnemyKing).flat().filter(onlyUnique);

  //if king is in check set king.inCheck to the checking piece(s)
  if (king.invalidMoves.includes(king.position)) {
    king.inCheck = enemyPieces.filter(o => o.possibleMoves.includes(king.position));

  } else {
    king.inCheck = false;
  }
}

//returns all valid moves for non-king pieces that either block or take the checking piece
function whenCheckedByOne(king) {
  let validMoveSet = [];

  //if king is checked by a bishop, rook or queen with occupyLines that can be blocked
  if (king.inCheck[0].occupyLines != undefined) {
    let checkAttackLine = king.inCheck[0].occupyLines.find(o => o.includes(king.position));
    let reduceCheckAttack = reduceAttackLine(checkAttackLine, king.position, king.inCheck[0].position);
    validMoveSet = reduceCheckAttack.concat(king.inCheck[0].position);

  //if king is checked by a pawn or knight and the only valid non-king move is to take
  } else {
    validMoveSet = king.inCheck[0].position;
  }

  return validMoveSet;
}

//reduce a single attackLine down to only cells exactly between the king and attacking piece
function reduceAttackLine(attackLine, kingPosition, attackerPosition) {

  //assign king positional index, index of attacker
  let kingIndex = attackLine.indexOf(kingPosition);
  let attackerIndex = attackLine.indexOf(attackerPosition);

  //is cell index greater than 1 index & less than another? 
  let reduceAtk = attackLine.reduce(function(result, cell) {
    if (attackLine.indexOf(cell) < kingIndex && attackLine.indexOf(cell) > attackerIndex) {
      result.push(cell);
    } else if (attackLine.indexOf(cell) > kingIndex && attackLine.indexOf(cell) < attackerIndex) {
      result.push(cell);
    }
    return result;
  }, []);

  return reduceAtk
}

//Purge all piece.possibleMoves & piece.moveTakesPiece that can be found in piece.invalidMoves
function deleteInvalid(piece) {
  if (piece.invalidMoves.length == 0) return;
  
  //delete from possibleMoves
  piece.invalidMoves.forEach(inv => {
    if (piece.possibleMoves.includes(inv)) {
      deleteElement(piece.possibleMoves, inv);
    }
  })
  
  //delete from moveTakesPiece using a decrementing loop to maintain the array order
  let toDelete = [];
  for (i = piece.moveTakesPiece.length - 1; i >= 0; i--) {
    if (piece.invalidMoves.includes(piece.moveTakesPiece[i].id)) {
      toDelete.push(i);
    }
  }
  toDelete.forEach(del => piece.moveTakesPiece.splice(del, 1));
}


////////////////////
//Find pinned pieces
////////////////////
//finds possible attack vectors to the king to begin identifying pinned pieces
function kingAttackLines(king, enemyPieces) {
  let allKingAttackLines = [];

  //find all enemy bishops, rooks & queens and assign to BRQ
  let enemyBRQ = bishopRookQueen(enemyPieces);

  //search each BRQ.occupyLines & push {piece, occupyLine} to return array if the king is found 
  enemyBRQ.forEach(bRQ => {
    let kingAttackLine = bRQ.occupyLines.filter(line => line.includes(king.position)).flat()
    if (kingAttackLine.length != 0) {
      allKingAttackLines.push({from: bRQ, line: kingAttackLine});
    }
  })

  return allKingAttackLines;
}

//return all pieces from an array that are bishops, rooks or queens
function bishopRookQueen(pieceSet) {
  let array = pieceSet.filter(piece => { 
    if (piece.constructor.name == "Bishop" || 
    piece.constructor.name == "Rook" || 
    piece.constructor.name == "Queen") {
      return true;
    }
  })
  return array;
}

//calculates if friendly piece is pinned by an attackLine on the King
function isPinned(king, attackLine, fOccupied, eOccupied, fPieces) {

  //array to push all confirmed pinned pieces
  let pinned = []

  //search each attackLine
  attackLine.forEach(atk => {
    
    //reduce the atk.line down to only cells exactly between the king and attacking piece
    let reduceAtk = reduceAttackLine(atk.line, king.position, atk.from.position);

    //find how many pieces are situated along the reduced atk.line
    let fPopulated = reduceAtk.filter(cell => fOccupied.includes(cell));
    let ePopulated = reduceAtk.filter(cell => eOccupied.includes(cell));

    //if exactly 1 friendly piece & no enemy pieces are blocking attack to the king => the piece is pinned
    if (fPopulated.length == 1 && ePopulated == 0) {

      //find the pinned piece, restrict it's movement to the reduce attack line
      let pinnedFPiece = fPieces.find(fPiece => reduceAtk.includes(fPiece.position))

      //remove it's position from newValidMoves & add pinning piece's position
      deleteElement(reduceAtk, pinnedFPiece.position);
      let newValidMoves = reduceAtk.concat(atk.from.position);

      pinned.push({piece: pinnedFPiece, validMoves: newValidMoves}); 
    }
  })

  return pinned;
}