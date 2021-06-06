////////////////////////////////////////////////////////
//GETMOVE - main function to generate a move each turn//
////////////////////////////////////////////////////////

function getMove(aIPlayer) {
  aIPlayer.id == "P1" ? enemyPlayer = blackPlayer : enemyPlayer = whitePlayer;
  let masterReset = allPieces.map(piece => [piece.position, piece.hasMoved, piece.enPassant]);
  let initialPoints = materialState(masterReset);
  let firstPass = getFirstPass(aIPlayer);
  let evaluatedMoves = makeInitialAssess(firstPass);
  //CONSIDER AFTER EVERY PASS
    //check if game over and assign points to positive/negative. 
    //if checkmate in 2nd pass for enemy, or in 3rd pass for friendly make appropriate points note
    
    //'alpha-beta pruning', where a superior path (with higher positve outcomes)
    //is explored over inferior ones (with lower or negative outcomes)

    //would it be possible at any point to completely eliminate a root move?

    //need to integrate pawn backline upgrading into evaluation of moves
  //TURN THIS DATA SEQUENCE BELOW INTO REPEATABLE FUNCTION INSTEAD
  let secondRawData = getSingleState(firstPass, aIPlayer.enemyPieces);
  //likely moves need something like an if statement when gaining material value
  //currently cpu is very focused into baiting an attack that will never happen
  //also that weird thing with knight moving back to starting position on g1 when under attack (and supported)
  let likelySecondEnemy = getLikelyMoves(secondRawData, enemyPlayer);
  let secondParsedLikely = parseLikelyIntoPass(likelySecondEnemy);
  let thirdRawData = getSingleState(secondParsedLikely, aIPlayer.activePieces);
  let likelyThirdFriendly = getLikelyMoves(thirdRawData, aIPlayer);
  let thirdParsedLikely = parseLikelyIntoPass(likelyThirdFriendly);
  let fourthRawData = getSingleState(thirdParsedLikely, aIPlayer.enemyPieces);
  let likelyFourthEnemy = getLikelyMoves(fourthRawData, enemyPlayer);
  let fourthParsedLikely = parseLikelyIntoPass(likelyFourthEnemy);
  evaluateBoard(fourthParsedLikely, evaluatedMoves, initialPoints, aIPlayer);
  setState(masterReset);
  calcPossibleMoves();
 
  return getFinalMove(evaluatedMoves, aIPlayer.activePieces);
}

//takes all the data generated from a pass and breaks it down into single board states, passed to 'useSingleState'
//replaces all old board states with new ones
function getSingleState(pass, pieceSet) {
  let newPass = pass.map(piece => {
    let overwriteMove = piece.map(move => {
      let newMoves = move.map(state => [state, useSingleState(state, pieceSet)]);
      //state is outside scope here but needed
      return newMoves;
    })
    return overwriteMove;
  })
  return newPass;
}

//return [false, tempToPush, move];

//takes a single board state, calculates new moves for all pieces & checks if game is over 
//returns all possible board states
function useSingleState(singleState, pieceSet) {
  if (singleState[0] == true) return singleState;
  setState(singleState[1]);
  calcPossibleMoves();
  let gameOver = isGameOver(pieceSet.find(o => o.constructor.name == "King"), pieceSet);
  if (gameOver.stalemate == true || gameOver.whiteCheckmated == true || gameOver.blackCheckmated == true) {
    //add true marker to show grid state is at end of line
    singleState[0] = true;
    singleState.push(gameOver);
    //NOTE THAT IF GAME IS OVER ONLY A SINGLE BOARD STATE IS RETURNED NOT MULTIPLES (FOR SCORING)
    return singleState;
  }
  let potentialStates = pieceSet.map(piece => {
    let resetState = allPieces.map(o => [o.position, o.hasMoved, o.enPassant]);
    let newStates = piece.possibleMoves.map(move => {
      return [virtualMove(piece, move, resetState)];
    });
    return newStates;
  })
  return potentialStates;
}

////////////////////////////////
//MAKING LIKELY RESPONSE MOVES//
////////////////////////////////

//score likeliest responses to each grid state
function getLikelyMoves(rawData, enemyPlayer) {
  //need another reset point for friendly piece?
  let resetAtEnd = allPieces.map(piece => [piece.position, piece.hasMoved, piece.enPassant]);
  let response = rawData.map(fPiece => {
    let overwriteFPiece = fPiece.map(fMove => {
      //create second reset point here
      let fMoveReset = fMove[0][0][1]
      let points = materialState(fMoveReset);
      let assessedEnemy = makeInitialAssess(fMove[0][1]);
      evaluateBoard(fMove[0][1], assessedEnemy, points, enemyPlayer);
      return assessedEnemy;
    })
    setState(resetAtEnd)
    return overwriteFPiece; 
  })
  return response;
}

//converts heavily nested likelyMoves data into useable pass format for board state generation
function parseLikelyIntoPass(likelyResponse) {
  let allMoves = likelyResponse.map(fPiece => { 
    let overwriteFPiece = fPiece.map(fMove => {
      return fMove.flat()
    })
    return overwriteFPiece;
  })
  let returnPass = allMoves.map(piece => {
    let overwriteFPiece = piece.map(moveArray => {
      let x = numberMovesNeeded(moveArray.length);
      let highestFiveMoves = [];
      moveArray.forEach(move => {
        if (highestFiveMoves.length < x) {
          highestFiveMoves.push(move);
        } else {
          for (j = 0; j < highestFiveMoves.length; j++) {
            if (move.score > highestFiveMoves[j].score) {
              highestFiveMoves.splice(j, 1, move);
              return;
            }
          }
        }
      });
      return highestFiveMoves;
    });
    return overwriteFPiece;
  });
  returnPass = returnPass.map(fPiece => {
    let overwriteFPiece = fPiece.map(fMove => {
      let overwriteFMove = fMove.map(scoredMove => {
        scoredMove = [scoredMove.gameOver, scoredMove.state, scoredMove.id]
        return scoredMove;
      })
      return overwriteFMove;
    })
    return overwriteFPiece;
  })
  return returnPass;
}

function numberMovesNeeded(moveArrayLength) {
  let x = 0
  if (moveArrayLength < 7) {
    x = moveArrayLength
  } else if (moveArrayLength < 15) {
    x = moveArrayLength / 2
  } else if (moveArrayLength < 25) {
    x = moveArrayLength / 3
  } else if (moveArrayLength < 50) {
    x = moveArrayLength / 5
  } else if (moveArrayLength < 75) {
    x = moveArrayLength / 7
  } else if (moveArrayLength < 100) {
    x = moveArrayLength / 10
  } else {
    x = moveArrayLength / 14
  }
  return x;
}

/////////////////////////////
//BOARD VALUATION FUNCTIONS//
/////////////////////////////

//sum of points value, both white and black, for each board state, Takes argument in the 'pass' format
//IF game is over (passed as variable?) determine if this game over is positive or negative
function evaluateBoard(pass, assessed, init, player) {
  player.color == "white" ? currentDif = init.white - init.black : currentDif = init.black - init.white;
  for (i = 0; i < pass.length; i++) {
    for (j = 0; j < pass[i].length; j++) {
      pass[i][j].forEach(state => {
        if (state[0] == false) {
          //I have NO IDEA why 'i' keeps setting to 32 after materialState function
          let k = i;
          let points = materialState(state[1]);
          i = k;
          let materialScore = compareMaterial(points, currentDif, player.color);
          //add material score
          assessed[i][j].score += materialScore;
          //add positional score
          assessed[i][j].score += scorePositions(player)
        } else {
          //assess whether this game over is benefical or not
          //based on just material score, not material + positional
        }
      })

    }
  }
  //reset board state here? a little higher up in the function maybe?
  return assessed;
}

//returns numeric points value totals for black & white in an object for board state passed
function materialState(state) {
  let points = {white: 0, black: 0};
  setState(state); // NEED TO CREATE RESET POINT TOO?
  points.white = whitePieces.filter(o => o.position != "taken").map(o => o.pointsValue).reduce((a, b) => a + b, 0);
  points.black = blackPieces.filter(o => o.position != "taken").map(o => o.pointsValue).reduce((a, b) => a + b, 0);
  return points;
}

//determines whether material value was lost or gained and assigns points accordingly
function compareMaterial(points, oldDif, playerColour) {
  playerColour == "white" ? newDif = points.white - points.black : newDif = points.black - points.white;
  let score = newDif - oldDif;
  /*
  let score = 0
  playerColour == "white" ? newDif = points.white - points.black : newDif = points.black - points.white;
  if (newDif == oldDif) {
    return score;
  } else if (newDif > oldDif) {
    //could change the <= 10 to a percentage/fraction based system to adapt to endgame?
    //ie if material lost as a fraction of remaining pieces in play
      if (newDif - oldDif <= 10) {
        score = 1;
      } else if (newDif - oldDif <= 30) {
        score = 3;
      } else {
        score = 6;
      }
  } else {
    if (oldDif - newDif <= 10) {
      score = -1;
    } else if (oldDif - newDif <= 30) {
      score = -3;
    } else {
      score = -6;
    }
  }
  */
  //add points for pieces in a preferred position too?
  return score;
}

//returns the single highest-valued root move from the fully explored root moves
function getFinalMove(assessed, pieceSet) {
  let finalMove = {score: -5000};
  assessed.forEach(fPiece => {
    overwriteFPiece = fPiece.forEach(fMove => {
      fMove.piece = pieceSet[assessed.indexOf(fPiece)]
      if (fMove.score > finalMove.score) finalMove = fMove;
    })
  })
  return finalMove;
} 

//////////////////////////////////////////////////////////////
//VIRTUALMOVE - to create new board states from single moves//
//////////////////////////////////////////////////////////////

//data passed by 'useSingleState' function. That function uses the whole board state, this one works through a single piece &
//returns any changes it's moves cause to itself and other pieces in terms of position/taking
function virtualMove(piece, move, resetState) {
  let tempToPush = [];
  isEnPassant(piece, move);
  piece.position = move;
  piece.hasMoved = true;
  let taken = piece.moveTakesPiece.find(o => o.id == move);
  if (taken != undefined) taken.actsOn.position = "taken";
  virtualCastle(piece, move);
  for (i = 0; i < allPieces.length; i++) {
    tempToPush.push([allPieces[i].position, allPieces[i].hasMoved, allPieces[i].enPassant]);
  }
  setState(resetState, allPieces);
  return [false, tempToPush, move];
}

//was this virtualMove castling? moves rook to appropriate spot and sets rook.hasMoved = true
function virtualCastle(piece, move) {
  if (piece.constructor.name == "King" && piece.castles.map(o=>o.kingMoves).includes(move)) {
    let castled = piece.castles.find(o => o.kingMoves == move)
    castled.rook.position = castled.rookMoves;
    castled.rook.hasMoved = true;
  }
}

//set each piece in allPieces to position called for by board state , hasMoved status & enPassant status, if applicable
function setState(desiredState) {
  for (i = 0; i < allPieces.length; i++) {
    allPieces[i].position = desiredState[i][0] //position
    allPieces[i].hasMoved = desiredState[i][1] //hasMoved
    if (allPieces[i].constructor.name == "Pawn") {
      allPieces[i].enPassant = desiredState[i][2] //enPassant
    }
  }
}

/////////////////////////////
//MISC OR INITIAL FUNCTIONS//
/////////////////////////////

//make initial assessedStates
function makeInitialAssess(pass) {
  let assessed = pass.map(fPiece => {
    if (fPiece == undefined) console.log(pass);
    let overwritePiece = fPiece.map(move => {
      let newMove = {id: move[0][2], score: 0, state: move[0][1], gameOver: move[0][0]};
      return newMove
    })
    return overwritePiece;
  })
  return assessed;
}

//creates the correct structure for firstPass variable
function getFirstPass(aIPlayer) {
  let resetState = allPieces.map(o => [o.position, o.hasMoved, o.enPassant]);
  let firstPass = aIPlayer.activePieces.map(piece => {
    let newStates = piece.possibleMoves.map(move => {
      return virtualMove(piece, move, resetState);
    });
    return newStates;
  });
  firstPass = firstPass.map(piece => {
    let overwrite = piece.map(move => {
      return [move];
    })
    return overwrite;
  })
  return firstPass;
}