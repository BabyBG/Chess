//Everything on this page is dedicated to what happens when a piece is picked up on the board by a human 
//using drag and drop functions
//Determines if attempted move is valid. If valid resolves any pieces taken/en passant/castling/pawn upgrading

//variable to track whether enPassant is available
//controlled by isEnPassant() on this page
let enPassantVulnerable = false;

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
  if (piece.whiteColor == activePlayer.whiteColor) {
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

//YOU HAVE TO CLEAN THIS FUNCTION UP
//Confirms drag move, reassigns position of moved piece, removes any taken piece
function drop(ev) {
  ev.preventDefault();
  removeHighlights(false);
  let data = ev.dataTransfer.getData("piece");
  let newPiece = document.getElementById(data)
  let piece = allPieces.find(o => o.id == newPiece.id)
  //find piece in the position_arrays.js
  let positionArrays = [];
  piece.constructor.name == "Pawn" && piece.whiteColor == true ? positionArrays = whitePawnArrays : positionArrays = blackPawnArrays;
  let positionData = positionArrays.find(o => o.letter == piece.position[0]).numberData[piece.position[1]-1];
  let target = ev.target.id;
  //CANT REMEMBER WHAT THIS IF STATEMENT IS FOR ANYMORE, SEEMS IMPORTANT? ANNOTATE YOUR WORK
  if (ev.target.id.length > 2) {
    convertToPiece = allPieces.find(o => o.id == ev.target.id);
    target = convertToPiece.position
  }
  //Prevent self-taking, check piece is correct colour & move is valid
  if (newPiece.id !== ev.target.id && piece.whiteColor == activePlayer.whiteColor && piece.possibleMoves.includes(target)) {
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
      //pawnDiagonal(piece, [], cellIsBlank)
      //if this move was taking via en passant, remove the taken pawn
      if (piece.moveTakesPiece.find(o => o.id == target) != undefined 
      && positionData.diagonal.includes(ev.target.id)) {
        takenEnPassant(enPassantVulnerable);
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

//Delete game piece image from cell & piece data from array. Sets piece location to false & add to side of board
function removeNode(node) {
  imageCoord = allPieces.find(o => o.id === node.id) 
  imageCoord.position = false
  deleteFromData(imageCoord)
  node.parentNode.removeChild(node);
  let img = document.createElement("img");
  img.className = "takenPiece";
  imageCoord.whiteColor == true ? color = "white" : color = "black";
  img.src = color + "_pieces/" + imageCoord.constructor.name + ".svg";
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

//Reassigns piece.position after movement and set hasMoved to true
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


//Removes squares highlighted red from check by resetting all squares to their default colours
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

//Does the move chosen trigger conditions for en passant? Used in movement & CPU evaluation 
function isEnPassant(piece, target) {

  //if piece isnt a pawn => no en passant
  if (piece.constructor.name != "Pawn") {
    enPassantVulnerable = false;
    return;
  } else {

    //Did the pawn move 2 squares forward?
    piece.whiteColor == true ? useArray = whitePawnArrays : useArray = blackPawnArrays;
    let positionData = useArray.find(o => o.letter == piece.position[0]).numberData[piece.position[1]-1];
    if (positionData.movesTo[1] == target) {

      //if pawn moved 2 squares set it vulerable to en passant
      enPassantVulnerable = piece;
    } else {

      //if conditions not met set enPassantVulernable to false
      enPassantVulnerable = false;
    }
  }
}

//Removes the pawn taken by en passant
function takenEnPassant(pawn) {
  removeNodeNoEvent(pawn.position, pawn.id);
  deleteFromData(pawn);
  pawn.position = false;
}

//if moved piece is a pawn & has reached backline, call 'chooseUpgrade' function
//merged the 'fiftyMoveStalemate' && 'threefoldRep' counter reset here
function pawnReachBackline(pawn) {
  if (pawn.constructor.name != "Pawn") {
    return pawn;
  } else {
    fiftyMoveStalemate = 0;
    threefoldRep = [];
    if ((pawn.whiteColor == true && pawn.position[1] == "8") || 
    (pawn.whiteColor == false && pawn.position[1] == "1")) {
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
        pawn = new Knight(pawn.whiteColor, pawn.position);
        pawn.id = id + "Knight";
        createUpgradedPiece(pawn);
        break;
      case "bishop":
      case "b":
        removeUpgradedPawn(pawn)
        pawn = new Bishop(pawn.whiteColor, pawn.position);
        pawn.id = id + "Bishop";
        createUpgradedPiece(pawn);
        break;
      case "rook":
      case "r":
        removeUpgradedPawn(pawn)
        pawn = new Rook(pawn.whiteColor, pawn.position);
        pawn.id = id + "Rook";
        createUpgradedPiece(pawn);
        break
      case "queen":
      case "q":
        removeUpgradedPawn(pawn)
        pawn = new Queen(pawn.whiteColor, pawn.position);
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
  pawn.whiteColor == true ? whitePieces.push(pawn) : blackPieces.push(pawn);
  attachImage(pawn);
}

//if king castles, place rook in appropriate cell
//function repeats and is too long
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



