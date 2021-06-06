//create all invalidMoves
//usually called twice - once for black, once for white
function masterInvalidCalc (friendlyPieces, enemyPieces, king) {
  //make new pieceSet arrays to account for pieces temporarily taken by AI planning
  let useFriendlyPieces = friendlyPieces.filter(o => o.position != "taken");
  let useEnemyPieces = enemyPieces.filter(o => o.position != "taken");
  //main function
  useFriendlyPieces.forEach(o => o.invalidMoves = []);
  isKingChecked(king, useEnemyPieces);
  if (king.inCheck != false) {
    //if king is checked by multiple pieces simultaneously
    if (king.inCheck.length > 1) {
      useFriendlyPieces.forEach(piece => checkMoveNuker(piece));
    //if king is checked by one piece
    } else {
      let checkBlockers = calcCheckBlockers(king, king.inCheck[0])
      useFriendlyPieces.forEach(piece => checkMoveNuker(piece));
      useFriendlyPieces.forEach(piece => reverseNuker(piece, king.inCheck[0], checkBlockers));
    }
  //if king is not in check look for pinned pieces
  } else {
    let attack = kingAttackLines(king, useEnemyPieces);
    let pinnedArray = isPinned(king, attack, useFriendlyPieces, useEnemyPieces);
    let checkBlockers = pinnedArray.map(pin => calcCheckBlockers(king, pin.pinnedBy));
    pinnedArray.forEach(element => checkMoveNuker(element.pinned));
    for (i = 0; i < pinnedArray.length; i++) {
      reverseNuker(pinnedArray[i].pinned, pinnedArray[i].pinnedBy, checkBlockers[i])
    }
  }
  useFriendlyPieces.forEach(o => deleteInvalid(o));
}

//return an array of pieces that are bishops, rooks or queens
function bishopRookQueen(pieceSet) {
  let array = pieceSet.filter(o => o.constructor.name == "Bishop" 
  || o.constructor.name == "Rook" || o.constructor.name == "Queen")
  return array;
}

//returns the attacking piece if king is in check
function isKingChecked(king, enemyPieces) {
  king.invalidMoves = enemyPieces.map(o => o.blocksEnemyKing).flat();
  if (king.invalidMoves.includes(king.position)) {
    king.inCheck = enemyPieces.filter(o => o.possibleMoves.includes(king.position));
  } else {
    king.inCheck = false;
  }
}

//the 'nukers' remove all moves that would be legal on an empty board
function checkMoveNuker(piece) {
  switch(piece.constructor.name) {
    case "Pawn":
      pawnNuker(piece);
      break;
    case "Knight":
      knightNuker(piece);
      break;
    case "Bishop":
      bishopNuker(piece);
      break;
    case "Rook":
      rookNuker(piece);
      break;
    case "Queen":
      queenNuker(piece);
      break;
    case "King":
      break;
    default:
      alert("Piece somehow not identified in 'checkMoveNuker'")
      console.log(piece);
  }
}

function pawnNuker(pawn) {
  let x = pawn.position[0];
  let y = parseInt(pawn.position[1]);
  let array = []
  if (pawn.color == "white") {
    array = [x + (y + 1), x + (y + 2), nextLetter(x, 1, "minus") + (y + 1),
    nextLetter(x, 1, "plus") + (y + 1)]
  } else {
    array = [x + (y - 1), x + (y - 2), nextLetter(x, 1, "minus") + (y - 1),
    nextLetter(x, 1, "plus") + (y - 1)]
  }
  pawn.invalidMoves = array.filter(o => allSquares.includes(o));
}

function knightNuker(knight) {
  let pos = knight.position;
  let y = parseInt(pos[1]);
  minOne = nextLetter(pos[0], 1, "minus");
  minTwo = nextLetter(pos[0], 2, "minus");
  plusOne = nextLetter(pos[0], 1, "plus");
  plusTwo = nextLetter(pos[0], 2, "plus");
  let array = [minOne + (y + 2), minOne + (y - 2), minTwo + (y + 1), minTwo + (y - 1),
  plusOne + (y + 2), plusOne + (y - 2), plusTwo + (y + 1), plusTwo + (y - 1)];
  knight.invalidMoves = array.filter(o => allSquares.includes(o));
}

function bishopNuker(bishop) {
  let array = [];
  let pos = bishop.position;
  let tempW = whiteDiag.filter(o => o.includes(pos));
  let tempB = blackDiag.filter(o => o.includes(pos));
  if (tempW.length == 0) {
    if (tempB[1] == undefined) {
      array = tempB[0];
    } else {
      array = tempB.flat();
    }
  } else {
    if (tempW[1] == undefined) {
      array = tempW[0];
    } else {
      array = tempW.flat();
    }
  }
  if (bishop.constructor.name == "Queen") {
    return array;
  } else {
  bishop.invalidMoves = array;
  }
}

function rookNuker(rook) {
  let pos = rook.position;
  let rookColumns = columns.filter(o => o.includes(pos)).flat();
  let rookRows = rows.filter(n => n.includes(pos)).flat();
  let array = rookColumns.concat(rookRows).flat();
  if (rook.constructor.name == "Queen") {
    return array;
  } else {
    rook.invalidMoves = array;
  }
}

function queenNuker(queen) {
  let bishop = bishopNuker(queen)
  let rook = rookNuker(queen)
  queen.invalidMoves = bishop.concat(rook).flat();
}


function calcCheckBlockers(king, attacker) {
  let checkBlockers = [];
  if (trueIfBRQ(attacker) == true) {
    let attackLine = attacker.occupyLines.find(o => o.includes(king.position));
    let kingIndex = attackLine.indexOf(king.position)
    let attackerIndex = attackLine.indexOf(attacker.position)
    attackLine.forEach(cell => {
      if (attackLine.indexOf(cell) < kingIndex && attackLine.indexOf(cell) > attackerIndex ||
      attackLine.indexOf(cell) > kingIndex && attackLine.indexOf(cell) < attackerIndex) {
        checkBlockers.push(cell)
      }
    });
  }
  return checkBlockers;
}

//removes invalidMoves if the piece causing check/pinning is taken or blocked by that move
function reverseNuker(piece, attackedBy, checkBlockers) {
  if (piece.constructor.name != "King") {
    checkBlockers.forEach(blocker => {
      if (piece.invalidMoves.includes(blocker)) {
        deleteElement(piece.invalidMoves, blocker);
      }
    })
    piece.moveTakesPiece.forEach(takes => {
      if (takes.actsOn.id == attackedBy.id) {
        deleteElement(piece.invalidMoves, takes.actsOn.position)
      }
    })
  }
}

//calculates if friendly piece is pinned by an attackLine on the King if 'true' is passed (default)
//if 'false' is passed, calculated discovered check
function isPinned(king, attack, friendlyPieces, enemyPieces, pinOrDiscover = true) {
  let pinned = [];
  attack.forEach(atk => {
    let kingIndex = atk.line.indexOf(king.position);
    let attackerIndex = atk.line.indexOf(atk.from.position);
    let definedLine = [];
    atk.line.forEach(o => {
      if (atk.line.indexOf(o) < kingIndex && atk.line.indexOf(o) > attackerIndex ||
      atk.line.indexOf(o) > kingIndex && atk.line.indexOf(o) < attackerIndex) {
        definedLine.push(o);
      }
    })
    let enemyPop = enemyPieces.filter(o=>definedLine.includes(o.position))
    let friendlyPop = friendlyPieces.filter(o=>definedLine.includes(o.position))
    if (enemyPop.length + friendlyPop.length > 1) {
      return;
    }
    if (pinOrDiscover == true) {
      if (friendlyPop.length == 1) {
        definedLine.push(atk.from.position);
        pinned.push({pinned: friendlyPop[0], pinnedBy: atk.from, onLine: definedLine});
      }
    } else {
      if (enemyPop.length == 1) {
        definedLine.push(atk.from.position);
        definedLine.push(king.position);
        pinned.push({discBy: enemyPop[0], checkBy: atk.from, onLine: definedLine});
      }
    }
  })
  return pinned;
}

//might need to add 'checkMoves' here if I end up creating them
function deleteInvalid(piece) {
  //debug test condition
  if (piece.invalidMoves == undefined) {
    console.log(piece)
  }
  if (piece.invalidMoves.length == 0) {
    return;
  }
  //delete from possibleMoves
  piece.invalidMoves.forEach(inv => {
    if (piece.possibleMoves.includes(inv)) {
      deleteElement(piece.possibleMoves, inv);
    }
  })
  let toDelete = [];
  //delete from moveTakesPiece
  for (i = piece.moveTakesPiece.length - 1; i >= 0; i--) {
    if (piece.invalidMoves.includes(piece.moveTakesPiece[i].id)) {
      toDelete.push(i);
    }
  }
  toDelete.forEach(del => piece.moveTakesPiece.splice(del, 1));
}

//finds possible attack vectors to the king to begin identifying pinned pieces
function kingAttackLines(king, enemyPieces) {
  let allKingAttackLines = [];
  let enemyBRQ = bishopRookQueen(enemyPieces);
  enemyBRQ.forEach(bRQ => {
    let kingAttackLines = bRQ.occupyLines.filter(line => line.includes(king.position)).flat()
    if (kingAttackLines.length != 0) {
      allKingAttackLines.push({from: bRQ, line: kingAttackLines});
    }
  })
  return allKingAttackLines;
}

//return true if specific piece is prevented from moving to a specific square by being pinned
function singlePiecePin(piece, cell) {
  piece.color == "white" ? king = e1King : king = e8King;
  piece.color == "white" ? enemyPieces = blackPieces : enemyPieces = whitePieces;
  piece.color == "white" ? friendlyPieces = whitePieces : friendlyPieces = blackPieces;
  let attack = kingAttackLines(king, enemyPieces);
  let pinnedArray = isPinned(king, attack, friendlyPieces, enemyPieces);
  pinnedArray.forEach(o => {
    if (o.pinned.id == piece.id && !o.onLine.includes(cell)) {
      return true; 
    } 
  }) 
  return false;
}