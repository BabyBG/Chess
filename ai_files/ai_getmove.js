//REFERENCES TO EN PASSANT NEED TO BE MADE COMPLIANT WITH NEW GLOBAL 'enPassantVulerable' variable

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
    
    //'alpha-beta pruning', where a superior path (with higher positve outcomes)
    //is explored over inferior ones (with lower or negative outcomes)

    //would it be possible at any point to completely eliminate a root move?

    //need to integrate pawn backline upgrading into evaluation of moves
  //TURN THIS DATA SEQUENCE BELOW INTO REPEATABLE FUNCTION INSTEAD
  let secondRawData = getSingleState(firstPass, aIPlayer.enemyPieces);
  let likelySecondEnemy = getLikelyMoves(secondRawData, enemyPlayer);
  console.log("likelySecondEnemy")
  console.log(likelySecondEnemy)
  let secondParsedLikely = parseLikelyIntoPass(likelySecondEnemy);
  console.log("secondParsedLikely")
  console.log(secondParsedLikely)
  
  //let thirdRawData = getSingleState(secondParsedLikely, aIPlayer.activePieces);
  //console.log("thirdRawData")
  //console.log(thirdRawData)
  //let likelyThirdFriendly = getLikelyMoves(thirdRawData, aIPlayer);
  //console.log("likelyThirdFriendly")
  //console.log(likelyThirdFriendly)
  //let thirdParsedLikely = parseLikelyIntoPass(likelyThirdFriendly);
  //console.log("thirdParsedLikely")
  //console.log(thirdParsedLikely)
  /*
  let fourthRawData = getSingleState(thirdParsedLikely, aIPlayer.enemyPieces);
  //console.log("fourthRawData")
  //console.log(fourthRawData)
  let likelyFourthEnemy = getLikelyMoves(fourthRawData, enemyPlayer);
  //console.log("likelyFourthEnemy")
  //console.log(likelyFourthEnemy)
  let fourthParsedLikely = parseLikelyIntoPass(likelyFourthEnemy);
  */
  evaluateBoard(secondParsedLikely, evaluatedMoves, initialPoints, aIPlayer);
  console.log("evaluatedMoves")
  console.log(evaluatedMoves);
  setState(masterReset);
  calcPossibleMoves();
  //need condition to check that at least 1 move is returned eg if CPU is in very bad situation,
  //with no moves that dont result in a 20 point difference next turn
  return getFinalMove(evaluatedMoves, aIPlayer.activePieces);
}

//takes all the data generated from a pass and breaks it down into single board states, passed to 'useSingleState'
//replaces all old board states with new ones
function getSingleState(pass, pieceSet) {
  let newPass = pass.map(piece => {
    let overwriteMove = piece.map(move => {
      let newMoves = move.map(state => {
        let temp = [state, useSingleState(state, pieceSet)]
        return temp;
      });
      return newMoves;
    })
    return overwriteMove;
  })
  return newPass;
}

//takes a single board state and returns true if player to act next turn can explot this move, 
//lets say with a score difference of 20 between the initial state and the next immediate highest valued one.
function findAndTestHighest(scoredPass, player) {
  let masterReset = allPieces.map(allPiece => [allPiece.position, allPiece.hasMoved, allPiece.enPassant]);
  let initPoints = materialState(masterReset);
  scoredPass.forEach(piece => {
    piece.forEach(move => {
      setState(move.state)
      //Examine the different board states that each response move creates & score them
      let getNewStates = useSingleState([move.gameOver, move.state, move.id], player.activePieces);
      let assessResponse = makeInitialAssess(getNewStates)
      evaluateBoard(getNewStates, assessResponse, initPoints, player)
      let singleHighest = getFinalMove(assessResponse, player.activePieces);
    })
  })
  setState(masterReset);
  return scoredPass;
}

//takes a single board state, calculates new moves for all pieces & checks if game is over 
//returns all possible board states
function useSingleState(singleState, pieceSet) {
  if (singleState[0].bool == true) {
    //not 100% about the noMoves return - making copies of a finished board state could skew move scoring
    //couldnt think of a solution where the CPU stops examining while not causing crashes later down the line
    let noMoves = pieceSet.map(o => [[singleState]]);
    return noMoves;
  }
  setState(singleState[1]);
  calcPossibleMoves();
  let gameOver = isGameOver(pieceSet.find(o => o.constructor.name == "King"), pieceSet);
  if (gameOver.bool == true) {
    //add true marker to show grid state has no moves to make
    singleState[0] = gameOver;
    let noMoves = pieceSet.map(o => [[singleState]]);
    return noMoves;
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
function getLikelyMoves(rawData, responsePlayer, filterByTop = false) {
  let resetAtEnd = allPieces.map(piece => [piece.position, piece.hasMoved, piece.enPassant]);
  let response = rawData.map(fPiece => {
    let overwriteFPiece = fPiece.map(fMove => {
      //create second reset point here
      let fMoveReset = fMove[0][0][1]
      let points = materialState(fMoveReset);
      let assessedEnemy = makeInitialAssess(fMove[0][1]);
      evaluateBoard(fMove[0][1], assessedEnemy, points, responsePlayer);
      //INSERT THE IF CONDITION FOR LIKELY MOVES HERE? <----------------------------
      //pick the highest scoring response to each likely move and if there is a > 20 point differential, delete the likely move
      //assessedEnemy = findAndTestHighest(assessedEnemy, responsePlayer);
      //some way to save the raw pass data from findHighestResponse to save this being done again?
      //or irrelevant because of the narrowing of moves explored?
      return assessedEnemy;
    })
    setState(resetAtEnd)
    return overwriteFPiece; 
  })
  return response;
}

//converts nested likelyMoves data into pass format for board state generation
function parseLikelyIntoPass(likelyResponse) {
  let scoredNewPass = likelyResponse.map(fPiece => { 
    let overwriteFPiece = fPiece.map(fMove => {
      let moveArray = fMove.flat();
      let x = 2 //numberMovesNeeded(moveArray.length);
      let highestXMoves = [];
      moveArray.forEach(move => {
        if (highestXMoves.length < x) {
          highestXMoves.push([move.gameOver, move.state, move.id]);
        } else {
          for (j = 0; j < highestXMoves.length; j++) {
            if (move.score > highestXMoves[j].score) {
              highestXMoves.splice(j, 1, [move.gameOver, move.state, move.id]);
              return;
            }
          }
        }
      })
      return highestXMoves
    })
    return overwriteFPiece;
  })
  return scoredNewPass;
}

//Picks how many moves should be considered 'likely' based on total number of moves available.
//The actual numbers could be reduced a bit after the scoring is less influenced by piece-baiting
//Experiment with replacing this function with a constant number ie x = "4"
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

//create array bsed on root moves, later passed to evaluateBoard()
function makeInitialAssess(pass) {
  let assessed = pass.map(fPiece => {
    let overwritePiece = fPiece.map(move => {
      let newMove = {id: move[0][2], score: 0, state: move[0][1], gameOver: move[0][0]};
      return newMove;
    })
    return overwritePiece;
  })
  return assessed;
}

//sum of points value, both white and black, for each board state, Takes argument in the 'pass' format
//IF game is over (passed as variable?) determine if this game over is positive or negative
function evaluateBoard(pass, assessed, points, player) {
  player.whiteColor == true ? currentDif = points.white - points.black : currentDif = points.black - points.white;
  for (m = 0; m < pass.length; m++) {
    for (n = 0; n < pass[m].length; n++) {
      pass[m][n].forEach(state => {
        if (state[0].bool == false) {
          let newPoints = materialState(state[1]);
          let materialScore = compareMaterial(newPoints, currentDif, player.color);
          //add material score
          assessed[m][n].score += materialScore;
          //add positional score
          assessed[m][n].score += scorePositions(player)
        } else {
          //add scoring if board is checkmated or stalemated
          assessed[m][n].score += gameOverScoring(player, state[0], currentDif)
        }
      })
    }
  }
  //reset board state here? a little higher up in the function maybe?
  return assessed;
}

//score game over board states. Numbers probably need tweaking
function gameOverScoring(player, boardState) {
  let score = 0;
  //stalemate
  if (boardState.stalemate == true) {
    currentDif >= 10 ? score = -10 : score = 10;
  //checkmate
  } else {
    if (player.color == "white") {
      boardState.whiteCheckmated == true ? score = -20: score = 20;
    } else {
      boardState.blackCheckmated == true ? score = -20: score = 20;
    } 
  }
  return score;
}

//returns numeric points value totals for black & white in an object for board state passed
function materialState(state) {
  let points = {white: 0, black: 0};
  setState(state); // NEED TO CREATE RESET POINT TOO?
  points.white = whitePieces.filter(o => o.position != false).map(o => o.pointsValue).reduce((a, b) => a + b, 0);
  points.black = blackPieces.filter(o => o.position != false).map(o => o.pointsValue).reduce((a, b) => a + b, 0);
  return points;
}

//determines whether material value was lost or gained and assigns points accordingly
function compareMaterial(points, oldDif, playerColour) {
  playerColour == "white" ? newDif = points.white - points.black : newDif = points.black - points.white;
  let score = newDif - oldDif;
  //rough draft alternative scoring method option below, instead of absolute material value
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
//adds the piece object to the move data here too
//will choose randomly if it finds moves with the same score
function getFinalMove(assessed, pieceSet) {
  let allMoves = assessed.flatMap(fPiece => {
    let overwriteFPiece = fPiece.map(fMove => {
      fMove.piece = pieceSet[assessed.indexOf(fPiece)];
      return fMove;
    })
    return overwriteFPiece;
  })
  shuffle(allMoves);
  let highest = allMoves[0];
  let jointHighest = [];
  for (i = 1; i < allMoves.length; i++) {
    if (allMoves[i].score > highest.score) {
      highest = allMoves[i];
      jointHighest = [allMoves[i]];
    } else if (allMoves[i].score == highest.score) {
      jointHighest.push(allMoves[i])
    }
  }
  if (jointHighest.length > 1) {
    let x = Math.floor(Math.random() * jointHighest.length)
    highest = jointHighest[x];
  }
  return highest;
}

//////////////////////////////////////////////////////////////
//VIRTUALMOVE - to create new board states from single moves//
//////////////////////////////////////////////////////////////

//data passed by 'useSingleState' function. That function uses the whole board state, this one works through a single piece &
//move at a time and returns any changes that moves cause to itself and other pieces in terms of position/taking
function virtualMove(piece, move, resetState) {
  let tempToPush = [];
  isEnPassant(piece, move);
  piece.position = move;
  piece.hasMoved = true;
  let taken = piece.moveTakesPiece.find(o => o.id == move);
  if (taken != undefined) taken.actsOn.position = false;
  virtualCastle(piece, move);
  for (i = 0; i < allPieces.length; i++) {
    tempToPush.push([allPieces[i].position, allPieces[i].hasMoved, allPieces[i].enPassant]);
  }
  setState(resetState, allPieces);
  let gameOver = {bool: false, stalemate: false, whiteCheckmated: false, blackCheckmated: false};
  return [gameOver, tempToPush, move]; //was return [false, tempToPush, move];
}

//was this virtualMove castling? moves rook to appropriate spot and sets rook.hasMoved = true
function virtualCastle(piece, move) {
  if (piece.constructor.name == "King" && piece.castles.map(o=>o.kingMoves).includes(move)) {
    let castled = piece.castles.find(o => o.kingMoves == move)
    castled.rook.position = castled.rookMoves;
    castled.rook.hasMoved = true;
  }
}

//set each piece in allPieces to position called for by board state, hasMoved status & enPassant status, if applicable
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

//creates the correct structure for firstPass variable
//get rid of repeating section
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