//Player data placeholder
let whitePlayer = {human: true, color: "white", id: "P1", activePieces: whitePieces, 
enemyPieces: blackPieces, friendlyKing: e1King, enemyKing: e8King};
let blackPlayer = {human: true, color: "black", id: "P2", activePieces: blackPieces, 
enemyPieces: whitePieces, friendlyKing: e8King, enemyKing: e1King};
let activePlayer = whitePlayer;
let fiftyMoveStalemate = 0;
let threefoldRep = [];
calcPossibleMoves();

function turnSequence(AIswitch = false) {
  calcPossibleMoves();
  if (AIswitch == false) {
    activePlayer == whitePlayer ? activePlayer = blackPlayer : activePlayer = whitePlayer;
    threefoldRep.push(allPieces.map(o => [o.id, o.position]));
  }
  //give king.position red tint if checked
  if (activePlayer.friendlyKing.inCheck != false) {
    let getCell = document.getElementById(activePlayer.friendlyKing.position);
    getCell.classList.add("check");
  }
  //look for checkmates and stalemates
  let gameOver = isGameOver(activePlayer.friendlyKing, activePlayer.activePieces)
  if (gameOver.whiteCheckmated == true || gameOver.blackCheckmated == true) alert("Checkmate")
  if (gameOver.stalemate == true) alert("Stalemate")
  //if activePlayer is AI, run AI move generation, located in "ai_files/ai_master.js"
  if (activePlayer.human == false) {
    masterAISequence(activePlayer);
  }
}

//in current board state is the game stalemated or checkmated?
function isGameOver(friendlyKing, activePieces) {
  let gameOver = {whiteCheckmated: false, blackCheckmated: false, stalemate: false, bool: false}
  //if king is checked && no valid moves => checkmate and end game
  if (friendlyKing.inCheck != false && activePieces.every(o => o.possibleMoves[0] == undefined)) {
    friendlyKing.color == "white" ? gameOver.whiteCheckmated = true : gameOver.blackCheckmated = true;
    gameOver.bool = true;
    return gameOver;
  }
  //if king is not in check && no valid moves => stalemate and draw game
  if (friendlyKing.inCheck == false && activePieces.every(o => o.possibleMoves[0] == undefined)) {
    gameOver.stalemate = true;
    gameOver.bool = true;
    return gameOver;
  }
  //if no piece taken or pawn moved for fifty turns => stalemate and draw game
  if (fiftyMoveStalemate >= 100) {
    gameOver.stalemate = true;
    gameOver.bool = true;
    return gameOver;
  }
  //if same position repeated 3 times => stalemate and draw game
  if (comparePositionStalemate(threefoldRep) == true) {
    gameOver.stalemate = true;
    gameOver.bool = true;
    return gameOver;
  }
  return gameOver;
}

//checks if same position has repeated 3 times for stalemate
function comparePositionStalemate(array) {
  let counter = {}
  if (array.length >= 3) {
    array.forEach(o => {
      if (counter[o] == undefined) {
        counter[o] = 1;
      } else {
        counter[o] += 1
      }
    })
  } else {
    return false;
  }
  for (let [key, value] of Object.entries(counter)) {
    if (value >= 3) {
      return true;
    }
  }
}
