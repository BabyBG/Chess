//Set grid variables
let allSquares = [];
let columns = [];
let rows = [];

//Make grid to display in html, populate arrays: 'allSquares', 'whiteSquares', 'blackSquares', 'columns'
function makeGrid() {
  let mainContainer = document.getElementById("mainContainer")
  let subContainer = document.getElementById("subContainer")
  let gameArea = document.createElement("div")
  let board = document.createElement("div");
  board.className = 'board';
  gameArea.className = "gameArea"
  let tempCol = [];
  for (i = 1; i < 9; i++) {
    tempCol = [] 
    let column = document.createElement('column');  
    for (j = 8; j > 0; j--) {
      let cell = document.createElement('div');
      //cell.innerHTML = String.fromCharCode(i + 96) + j.toString() - uncomment if you need coordinates displayed
      allSquares.push(String.fromCharCode(i + 96) + j.toString());
      tempCol.push(String.fromCharCode(i + 96) + j.toString())
      cell.id = String.fromCharCode(i + 96) + j.toString();
      if (i % 2 == j % 2) {
        cell.className = 'blackCell';
      } else {
        cell.className = 'whiteCell';
      }
      column.appendChild(cell);
    }
    board.appendChild(column);
    columns.push(tempCol);
  }
  gameArea.appendChild(appendLetters());
  gameArea.appendChild(appendNumbers());
  gameArea.appendChild(board);
  gameArea.appendChild(appendNumbers());
  gameArea.appendChild(appendLetters());
  subContainer.appendChild(gameArea);
}

makeGrid();

//Enable drop behaviour for each cell when dragging pieces
allSquares.forEach(o => document.getElementById(o).setAttribute("ondrop", "drop(event)"))
allSquares.forEach(o => document.getElementById(o).setAttribute('ondragover', 'allowDrop(event)'))

//Populate 'rows' array for move calculation
function tempRow() {
  let tempRow = [];
  for (b = 1; b < 9; b++) {
    tempRow = allSquares.filter(element => row(element, 1, b));
    rows.push(tempRow);
  }
}
tempRow();

function row(element, index, b) {
  if (element[index] == b) {
    return element;
  }
}

//Diagonal arrays - I tried making a function to populate this list... but it took me a fraction of the time to just write them out instead
let whiteDiag = [["a2", "b1"], ["a4", "b3", "c2", "d1"], ["a6", "b5", "c4", "d3", "e2", "f1"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"], 
["c8", "d7", "e6", "f5", "g4", "h3"], ["e8", "f7", "g6", "h5"], ["g8", "h7"], ["h3", "g2", "f1"], ["h5", "g4", "f3", "e2", "d1"], ["h7", "g6",
"f5", "e4", "d3", "c2", "b1"], ["g8", "f7", "e6", "d5", "c4", "b3", "a2"], ["e8", "d7", "c6", "b5", "a4"], ["c8", "b7", "a6"]];
let blackDiag = [["a7", "b8"], ["a5", "b6", "c7", "d8"], ["a3", "b4", "c5", "d6", "e7", "f8"], ["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], 
["c1", "d2", "e3", "f4", "g5", "h6"], ["e1", "f2", "g3", "h4"], ["g1", "h2"], ["a3", "b2", "c1"], ["a5", "b4", "c3", "d2", "e1"], ["a7", "b6",
"c5", "d4", "e3", "f2", "g1"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"], ["d8", "e7", "f6", "g5", "h4"], ["f8", "g7", "h6"]];

//Add letters around the board
function appendLetters() {
  let borderRow = document.createElement("borderRow");
  borderRow.className = "borderRow";
  for (i = 1; i < 9; i++) {
    let letterCell = document.createElement("div");
    letterCell.className = "letterCell";
    letterCell.innerHTML = String.fromCharCode(i + 96);
    borderRow.appendChild(letterCell);
  }
  return borderRow;
}

//Add numbers around the board
function appendNumbers() {
  let borderColumn = document.createElement("borderColumn");
  borderColumn.className = "borderColumn";
  for (i = 8; i > 0; i--) {
    let numberCell = document.createElement("div");
    numberCell.className = "numberCell";
    numberCell.innerHTML = i;
    borderColumn.appendChild(numberCell);
  }
  return borderColumn;
}

//Set html radio buttons to 'human'
function defaultRadio() {
  let whiteRadio = document.getElementById("whiteHuman");
  let blackRadio = document.getElementById("blackHuman");
  whiteRadio.checked = true;
  blackRadio.checked = true;
}

defaultRadio()

//want to set the 'human' value whenever the radio button is changed
function humanOrCpu(white, human) {
  if (white == true) {
    human == true ? whitePlayer.human = true : whitePlayer.human = false;
  } else {
    human == true ? blackPlayer.human = true : blackPlayer.human = false;
  }
  turnSequence(true);
}

/////////////////////////////////////
//Useful functions across all pages//
/////////////////////////////////////

//Function to increment/decrement letters
function nextLetter(c, shift, plusOrMinus) {
  if (plusOrMinus == "plus") {
    let letter = String.fromCharCode(c.charCodeAt(0) + shift);
    return letter;
  } 
  if (plusOrMinus == "minus") {
    let letter = String.fromCharCode(c.charCodeAt(0) - shift);
    return letter;
  }
}

//return the highest value in array, or '0' if array is empty
function calcHighestTake(netValueTakes) {
  let largest = netValueTakes[0]
  if (largest == undefined) {
    return 0;
  }
  for (i = 1; i < netValueTakes.length; i++) {
    if (netValueTakes[i] > largest) {
      largest = netValueTakes[i];
    }
  }
  return largest;
}

//Delete named element in array
function deleteElement(array, element) {
  let index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}

//Find all squares occupied by a certain colour
function findOccupied(whichColor) {
  temp = allPieces.filter(o => o.color == whichColor)
  occupiedArray = temp.map(o => o.position);
  return occupiedArray
}

//checks if character is a letter
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

//returns true if cell is blank or occupied by enemy, false if occupied by friendly piece
function cellIsMoveable(cell, piece) {
  a = allPieces.find(o => o.position == cell) 
  a == undefined ? pieceToTest = "blank" : pieceToTest = a
  if (pieceToTest == "blank" || piece.color != pieceToTest.color) {
    return true;
  } else {
    return false;
  }
}

//Is cell occupied by an enemy piece?
//returns an enemy piece object if true, returns false if not
function cellIsEnemy(cell, piece) {
  piece.color == "white" ? pieceSet = blackPieces : pieceSet = whitePieces;
  let pieceToTest = pieceSet.find(o => o.position == cell);
  if (pieceToTest == undefined) {
    return false;
  }
  if (pieceToTest.color != piece.color) {
    return pieceToTest;
  } else {
    return false;
  }
}

//returns true only if cell is blank
function cellIsBlank(cell, nullOne, nullTwo) {
  let empty = allPieces.find(o => o.position == cell)
  if (empty == undefined) {
    return true;
  } else {
    return false;
  }
}

//is cell friendly?
function cellIsFriendly(cell, piece) {
  let friendly = findOccupied(piece.color);
  if (friendly.includes(cell)) {
    return true;
  } else {
    return false;
  }
}

//returns true if piece is a bishop, rook or queen
function trueIfBRQ(piece) {
  if (piece.constructor.name == "Bishop" ||
  piece.constructor.name == "Rook" ||
  piece.constructor.name == "Queen") {
    return true;
  } else {
    return false;
  }
}

//count how many elements match 'x' in an array
function count(x, array) {
  let count = 0;
  for(i = 0; i < array.length; i++) {
    if (array[i] == x)
    count++;
  }
  return count;
}