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
  function findOccupied(colorBoolean) {
    temp = allPieces.filter(o => o.whiteColor == colorBoolean)
    occupiedArray = temp.map(o => o.position);
    return occupiedArray
  }
  
  //checks if character is a letter
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  
  //CHECK IF ALLPIECES STILL WORKS HERE WITH AI PLANNING
  //returns true if cell is blank or occupied by enemy, false if occupied by friendly piece
  function cellIsMoveable(cell, piece) {
    a = allPieces.find(o => o.position == cell) 
    a == undefined ? pieceToTest = "blank" : pieceToTest = a
    if (pieceToTest == "blank" || piece.whiteColor != pieceToTest.whiteColor) {
      return true;
    } else {
      return false;
    }
  }
  
  //Is cell occupied by an enemy piece?
  //returns an enemy piece object if true, returns false if not
  function cellIsEnemy(cell, piece) {
    piece.whiteColor == true ? pieceSet = blackPieces : pieceSet = whitePieces;
    let pieceToTest = pieceSet.find(o => o.position == cell);
    if (pieceToTest == undefined) {
      return false;
    }
    if (pieceToTest.whiteColor != piece.whiteColor) {
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
    let friendly = findOccupied(piece.whiteColor);
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
  
  //randomly shuffle elements in an array
  //directly copied from 'Fisher-Yates (aka Knuth) Shuffle'
  function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  
  //deletes duplicates from array when combined with filter()
  // => let unique = a.filter(onlyUnique); 
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  //is this number even?
  function isEven(y) {
    return y % 2 == 0;
  }
  
  //is this number odd?
  function isOdd(y) {
    return Math.abs(y % 2) == 1;
  }