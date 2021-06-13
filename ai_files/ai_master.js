//Master AI function to call all others
function masterAISequence(aIPlayer) {
  
  //analyse board states and decide on highest positive outcome or lowest negative outcome
  let finalMove = getMove(aIPlayer);
  removeHighlights(false)
  aITarget = false;
  //let aITarget = document.getElementById(finalMove.id);
  let findTargetPiece = allPieces.find(o => o.position == finalMove.id);
  if (findTargetPiece != undefined) {
    aITarget = document.getElementById(findTargetPiece.id);
  } else {
    aITarget = document.getElementById(finalMove.id);
  }
  let newPiece = document.getElementById(finalMove.piece.id)
  let targetCell = aITarget.id
  if (aITarget.id.length > 2) {
    convertToPiece = allPieces.find(o => o.id == aITarget.id);
    targetCell = convertToPiece.position;
  }
  removeHighlights(true)
  //if move results in taking piece
  if (aITarget.nodeName == "IMG") {
    aITarget.parentNode.appendChild(newPiece)
    removeNode(aITarget);
    updatePosition(newPiece.id, newPiece.parentElement.id);
    fiftyMoveStalemate = 0;
    //if move doesnt result in piece being taken
  } else {
    //was this a castling move?
    castleRook(newPiece, aITarget.id);
    //was this an enPassant move?
    if (finalMove.piece.moveTakesPiece.find(o => o.id == targetCell) != undefined &&
    //PAWN DIAGONAL REMOVED, REPLACE WITH THE POSITION_ARRAYS.JS
    pawnDiagonal(finalMove.piece, [], cellIsBlank).includes(aITarget.id)) {
      takenEnPassant(finalMove.piece.offenseEnPassant);
    } else {
    //is this move vulnerable to en passant?
    isEnPassant(finalMove.piece, aITarget.id)
    }
    fiftyMoveStalemate += 1;
    aITarget.appendChild(document.getElementById(finalMove.piece.id));
    updatePosition(aITarget.childNodes[0].id, aITarget.id);
  }
  //if pawn reaches backline, upgrade piece
  finalMove.piece = pawnReachBackline(finalMove.piece);
  turnSequence();
}