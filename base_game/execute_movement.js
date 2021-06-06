////////////////////////////////////////////////////
//FUNCTIONS FOR PICKING UP AND PUTTING DOWN PIECES//
////////////////////////////////////////////////////

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("piece", ev.target.id);
  //highlight 'possibleMoves' for dragged piece on the board
  let piece = allPieces.find(o => o.id == ev.target.id);
  if (piece.color == activePlayer.color) {
    allSquares.forEach(cell => {
      if (piece.possibleMoves.includes(cell)) {
        getCell = document.getElementById(cell)
        if (getCell.className == "whiteCell") {
          getCell.classList.add("possMovesWhite");
        } else {
          getCell.classList.add("possMovesBlack");
        }
      }
    })
  }
}

//Confirms drag move, reassigns position of moved piece, removes any taken piece
function drop(ev) {
  ev.preventDefault();
  removeHighlights(false);
  let data = ev.dataTransfer.getData("piece");
  let newPiece = document.getElementById(data)
  let piece = allPieces.find(o => o.id == newPiece.id)
  let target = ev.target.id;
  //CANT REMEMBER WHAT THIS IF STATEMENT IS FOR ANYMORE, SEEMS IMPORTANT? ANNOTATE YOUR WORK
  if (ev.target.id.length > 2) {
    convertToPiece = allPieces.find(o => o.id == ev.target.id);
    target = convertToPiece.position
  }
  //Prevent self-taking, check piece is correct colour & move is valid
  if (newPiece.id !== ev.target.id && piece.color == activePlayer.color && piece.possibleMoves.includes(target)) {
    removeHighlights(true);
    //if piece already present in cell remove it & place incoming piece
    if (ev.target.nodeName == "IMG") {
      ev.target.parentNode.appendChild(newPiece);
      removeNode(ev.target);
      updatePosition(newPiece.id, newPiece.parentElement.id);
      fiftyMoveStalemate = 0;
    //move normally if there is no piece occupying target cell
    } else {
      //if this is a castling move, place the rook into appropriate position
      castleRook(newPiece, ev.target.id)
      //if this move was taking via en passant, remove the taken pawn
      //and then an extra if statement, as below, to check that the en passant move was actually taken
      if (piece.moveTakesPiece.find(o => o.id == target) != undefined && pawnDiagonal(piece, [], cellIsBlank).includes(ev.target.id)) {
        takenEnPassant(piece.offenseEnPassant)
      } else {
      //if this move is vulnerable to en passant, set pawn.enPassant = true, else set all to false
      //and also reverts all pawn.enPassant states to their ORIGINAL (not necessarily all false)
      isEnPassant(piece, ev.target.id)
      }
      fiftyMoveStalemate += 1;
      ev.target.appendChild(document.getElementById(data));
      updatePosition(ev.target.childNodes[0].id, ev.target.id);
    }
    //if pawn reaches backline, offer upgrade to player
    piece = pawnReachBackline(piece)
    //insert 0.5 second pause here
    //refreshes turn in "turn_order.js"
    turnSequence()
  }
}

//Delete game piece image from cell & piece data from array. Sets piece location to "taken" & add to side of board
function removeNode(node) {
  imageCoord = allPieces.find(o => o.id === node.id) 
  imageCoord.position = "taken"
  deleteFromData(imageCoord)
  node.parentNode.removeChild(node);
  //split into different function
  //doesnt currently proc for enPassant
  let img = document.createElement("img");
  img.className = "takenPiece";
  img.src = imageCoord.color + "_pieces/" + imageCoord.constructor.name + ".svg";
  let src = document.getElementById("taken" + imageCoord.id);
  src.appendChild(img);
}

//remove nodes from a specified parent div without dragging or dropping pieces
//doesnt remove from data arrays (needed for the rook in castling)
function removeNodeNoEvent(coord, remove) {
  let parentDiv = document.getElementById(coord);
  let child = document.getElementById(remove);
  parentDiv.removeChild(child);
}

//Reassigns piece.position after movement and sets hasMoved to true
function updatePosition(id, newPos) {
  allPieces.forEach(o => {
    if (o.id === id) {
      o.position = newPos;
      o.hasMoved = true;
    }
  })
}

//deletes piece from all data arrays
//if 'repeatPositionStaleMate' element includes 'piece.id', delete element
function deleteFromData(piece) {
  //standard data arrays
  deleteElement(allPieces, piece);
  deleteElement(blackPieces, piece);
  deleteElement(whitePieces, piece);
  deleteElement(allPawns, piece);
  //stalemate array
  threefoldRep = [];
}

function removeHighlights(check) {
  if (check == false) {
    allSquares.forEach(cell => {
      let getCell = document.getElementById(cell)
      if (getCell.className.includes("possMovesBlack")) {
        getCell.className = "blackCell";
      }
      if (getCell.className.includes("possMovesWhite")) {
        getCell.className = "whiteCell";
      }
    })
  } else {
    bothKings.forEach(king => {
      let getCell = document.getElementById(king.position)
      if (getCell.className.includes("blackCell")) {
        getCell.className = "blackCell";
      }
      if (getCell.className.includes("whiteCell")) {
        getCell.className = "whiteCell";
      }
    })
  }
}

//Does the move chosen trigger conditions for en passant?
//Function could be adapted to also predict en passant for AI
function isEnPassant(piece, target) {
  if (piece.constructor.name != "Pawn") {
    allPawns.forEach(o => o.enPassant = false);
    return;
  } else {
    let num = parseInt(piece.position[1]);
    let whiteTwoSquare = piece.position[0] + (num + 2);
    let blackTwoSquare = piece.position[0] + (num - 2);
    if (piece.color == "white") {
      if (whiteTwoSquare == target) {
        piece.enPassant = {takesSquare: piece.position[0] + (num + 1)};
        allPawns.forEach(o => {
          if (o.id != piece.id) {
            o.enPassant = false;
          }
        })
        return;
      } else {
        allPawns.forEach(o => o.enPassant = false);
        return;
      }
    } else {
      if (blackTwoSquare == target) {
        piece.enPassant = {takesSquare: piece.position[0] + (num - 1)};
        allPawns.forEach(o => {
          if (o.id != piece.id) {
            o.enPassant = false;
          }
        })
        return;
      } else {
        allPawns.forEach(o => o.enPassant = false);
        return;
      }
    }
  }
}

//Removes the pawn taken by en passant
function takenEnPassant(pawn) {
  removeNodeNoEvent(pawn.position, pawn.id);
  deleteFromData(pawn);
  pawn.position = "taken";
}

//if moved piece is a pawn & has reached backline, call 'chooseUpgrade' function
//merged the 'fiftyMoveStalemate' && 'threefoldRep' counter reset here
function pawnReachBackline(pawn) {
  if (pawn.constructor.name != "Pawn") {
    return pawn;
  } else {
    fiftyMoveStalemate = 0;
    threefoldRep = [];
    if ((pawn.color == "white" && pawn.position[1] == "8") || 
    (pawn.color == "black" && pawn.position[1] == "1")) {
      pawn = chooseUpgrade(pawn)
      return pawn;
    } 
  }
}

//replaces pawn with piece chosen by prompt, upgraded piece variable name is still 'xxPawn',
//id changed to 'xx*Piece*' 
function chooseUpgrade(pawn) {
  upgrade = prompt("Type which piece you want to change " + pawn.id + " into. Full name or initial (eg. b or bishop) will work");
  if (upgrade == null) {
    alert("Didn't recognise piece, please enter again");
    chooseUpgrade(pawn);
  } else {
    upgrade = upgrade.toLowerCase();
    let id = pawn.id.substr(0, 2);
    switch (upgrade) {
      case "knight":
      case "k":
        removeUpgradedPawn(pawn)
        pawn = new Knight(pawn.color, pawn.position);
        pawn.id = id + "Knight";
        createUpgradedPiece(pawn);
        break;
      case "bishop":
      case "b":
        removeUpgradedPawn(pawn)
        pawn = new Bishop(pawn.color, pawn.position);
        pawn.id = id + "Bishop";
        createUpgradedPiece(pawn);
        break;
      case "rook":
      case "r":
        removeUpgradedPawn(pawn)
        pawn = new Rook(pawn.color, pawn.position);
        pawn.id = id + "Rook";
        createUpgradedPiece(pawn);
        break
      case "queen":
      case "q":
        removeUpgradedPawn(pawn)
        pawn = new Queen(pawn.color, pawn.position);
        pawn.id = id + "Queen";
        createUpgradedPiece(pawn);
        break;
      default:
        alert("Didn't recognise piece, please enter again");
        chooseUpgrade(pawn);
    }
    return pawn;
  }
}

//sub-functions for upgrading pawns
function removeUpgradedPawn(pawn) {
  removeNodeNoEvent(pawn.position, pawn.id);
  deleteFromData(pawn);
  return pawn;
}

function createUpgradedPiece(pawn) {
  allPieces.push(pawn);
  pawn.color == "white" ? whitePieces.push(pawn) : blackPieces.push(pawn);
  attachImage(pawn);
}

//if king castles, place rook in appropriate cell
//function repeats a bit, could probably be shortened
function castleRook(newPiece, target) {
  if (newPiece.id == "e1King" && (nextLetter(target[0], 2, "plus") == newPiece.parentElement.id[0] ||
  nextLetter(target[0], 2, "minus") == newPiece.parentElement.id[0])) {
    if (target == "c1") {
      rook = e1King.castles.find(o=>o.kingMoves=="c1").rook;
      rook.position = "d1";
      rook.hasMoved = true;
      removeNodeNoEvent("a1", rook.id);
      attachImage(rook);
    } else {
      rook = e1King.castles.find(o=>o.kingMoves=="g1").rook;
      rook.position = "f1";
      rook.hasMoved = true;
      removeNodeNoEvent("h1", rook.id);
      attachImage(rook);
    }
  }
  if (newPiece.id == "e8King" && (nextLetter(target[0], 2, "plus") == newPiece.parentElement.id[0] ||
  nextLetter(target[0], 2, "minus") == newPiece.parentElement.id[0])) {
    if (target == "c8") {
      rook = e8King.castles.find(o=>o.kingMoves=="c8").rook;
      rook.position = "d8";
      rook.hasMoved = true;
      removeNodeNoEvent("a8", rook.id);
      attachImage(rook);
    } else {
      rook = e8King.castles.find(o=>o.kingMoves=="g8").rook;
      rook.position = "f8";
      rook.hasMoved = true;
      removeNodeNoEvent("h8", rook.id);
      attachImage(rook);
    }
  }
}



