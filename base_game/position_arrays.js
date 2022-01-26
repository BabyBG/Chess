//////////////
//WHITE PAWN//
//////////////

function getWhitePawnArrays() {
  let a1 = false;
  let a2 = {number: 2, movesTo: ["a3", "a4"], diagonal: ["b3"], enPassant: []};
  let a3 = {number: 3, movesTo: ["a4"], diagonal: ["b4"], enPassant: []};
  let a4 = {number: 4, movesTo: ["a5"], diagonal: ["b5"], enPassant: []};
  let a5 = {number: 5, movesTo: ["a6"], diagonal: ["b6"], enPassant: ["b5"]};
  let a6 = {number: 6, movesTo: ["a7"], diagonal: ["b7"], enPassant: []};
  let a7 = {number: 7, movesTo: ["a8"], diagonal: ["b8"], enPassant: []};
  let a8 = {number: 8, movesTo: false};

  let b1 = false
  let b2 = {number: 2, movesTo: ["b3", "b4"], diagonal: ["a3", "c3"], enPassant: []};
  let b3 = {number: 3, movesTo: ["b4"], diagonal: ["a4", "c4"], enPassant: []};
  let b4 = {number: 4, movesTo: ["b5"], diagonal: ["a5", "c5"], enPassant: []};
  let b5 = {number: 5, movesTo: ["b6"], diagonal: ["a6", "c6"], enPassant: ["a5", "c5"]};
  let b6 = {number: 6, movesTo: ["b7"], diagonal: ["a7", "c7"], enPassant: []};
  let b7 = {number: 7, movesTo: ["b8"], diagonal: ["a8", "c8"], enPassant: []};
  let b8 = {number: 8, movesTo: false};

  let c1 = false;
  let c2 = {number: 2, movesTo: ["c3", "c4"], diagonal: ["b3", "d3"], enPassant: []};
  let c3 = {number: 3, movesTo: ["c4"], diagonal: ["b4", "d4"], enPassant: []};
  let c4 = {number: 4, movesTo: ["c5"], diagonal: ["b5", "d5"], enPassant: []};
  let c5 = {number: 5, movesTo: ["c6"], diagonal: ["b6", "d6"], enPassant: ["b5", "d5"]};
  let c6 = {number: 6, movesTo: ["c7"], diagonal: ["b7", "d7"], enPassant: []};
  let c7 = {number: 7, movesTo: ["c8"], diagonal: ["b8", "d8"], enPassant: []};
  let c8 = {number: 8, movesTo: false};

  let d1 = false;
  let d2 = {number: 2, movesTo: ["d3", "d4"], diagonal: ["c3", "e3"], enPassant: []};
  let d3 = {number: 3, movesTo: ["d4"], diagonal: ["c4", "e4"], enPassant: []};
  let d4 = {number: 4, movesTo: ["d5"], diagonal: ["c5", "e5"], enPassant: []};
  let d5 = {number: 5, movesTo: ["d6"], diagonal: ["c6", "e6"], enPassant: ["c5", "e5"]};
  let d6 = {number: 6, movesTo: ["d7"], diagonal: ["c7", "e7"], enPassant: []};
  let d7 = {number: 7, movesTo: ["d8"], diagonal: ["c8", "e8"], enPassant: []};
  let d8 = {number: 8, movesTo: false};

  let e1 = false;
  let e2 = {number: 2, movesTo: ["e3", "e4"], diagonal: ["d3", "f3"], enPassant: []};
  let e3 = {number: 3, movesTo: ["e4"], diagonal: ["d4", "f4"], enPassant: []};
  let e4 = {number: 4, movesTo: ["e5"], diagonal: ["d5", "f5"], enPassant: []};
  let e5 = {number: 5, movesTo: ["e6"], diagonal: ["d6", "f6"], enPassant: ["d5", "f5"]};
  let e6 = {number: 6, movesTo: ["e7"], diagonal: ["d7", "f7"], enPassant: []};
  let e7 = {number: 7, movesTo: ["e8"], diagonal: ["d8", "f8"], enPassant: []};
  let e8 = {number: 8, movesTo: false};

  let f1 = false;
  let f2 = {number: 2, movesTo: ["f3", "f4"], diagonal: ["e3", "g3"], enPassant: []};
  let f3 = {number: 3, movesTo: ["f4"], diagonal: ["e4", "g4"], enPassant: []};
  let f4 = {number: 4, movesTo: ["f5"], diagonal: ["e5", "g5"], enPassant: []};
  let f5 = {number: 5, movesTo: ["f6"], diagonal: ["e6", "g6"], enPassant: ["e5", "g5"]};
  let f6 = {number: 6, movesTo: ["f7"], diagonal: ["e7", "g7"], enPassant: []};
  let f7 = {number: 7, movesTo: ["f8"], diagonal: ["e8", "g8"], enPassant: []};
  let f8 = {number: 8, movesTo: false};

  let g1 = false;
  let g2 = {number: 2, movesTo: ["g3", "g4"], diagonal: ["f3", "h3"], enPassant: []};
  let g3 = {number: 3, movesTo: ["g4"], diagonal: ["f4", "h4"], enPassant: []};
  let g4 = {number: 4, movesTo: ["g5"], diagonal: ["f5", "h5"], enPassant: []};
  let g5 = {number: 5, movesTo: ["g6"], diagonal: ["f6", "h6"], enPassant: ["f5", "h5"]};
  let g6 = {number: 6, movesTo: ["g7"], diagonal: ["f7", "h7"], enPassant: []};
  let g7 = {number: 7, movesTo: ["g8"], diagonal: ["f8", "h8"], enPassant: []};
  let g8 = {number: 8, movesTo: false};

  let h1 = false;
  let h2 = {number: 2, movesTo: ["h3", "h4"], diagonal: ["g3"], enPassant: []};
  let h3 = {number: 3, movesTo: ["h4"], diagonal: ["g4"], enPassant: []};
  let h4 = {number: 4, movesTo: ["h5"], diagonal: ["g5"], enPassant: []};
  let h5 = {number: 5, movesTo: ["h6"], diagonal: ["g6"], enPassant: ["g5"]};
  let h6 = {number: 6, movesTo: ["h7"], diagonal: ["g7"], enPassant: []};
  let h7 = {number: 7, movesTo: ["h8"], diagonal: ["g8"], enPassant: []};
  let h8 = {number: 8, movesTo: false};

  let a = {letter: "a", numberData: [a1, a2, a3, a4, a5, a6, a7, a8]};
  let b = {letter: "b", numberData: [b1, b2, b3, b4, b5, b6, b7, b8]};
  let c = {letter: "c", numberData: [c1, c2, c3, c4, c5, c6, c7, c8]};
  let d = {letter: "d", numberData: [d1, d2, d3, d4, d5, d6, d7, d8]};
  let e = {letter: "e", numberData: [e1, e2, e3, e4, e5, e6, e7, e8]};
  let f = {letter: "f", numberData: [f1, f2, f3, f4, f5, f6, f7, f8]};
  let g = {letter: "g", numberData: [g1, g2, g3, g4, g5, g6, g7, g8]};
  let h = {letter: "h", numberData: [h1, h2, h3, h4, h5, h6, h7, h8]};

  let allPositions = [a, b, c, d, e, f, g, h]
  
  return allPositions;
};


//////////////
//BLACK PAWN//
//////////////

function getBlackPawnArrays() {
  let a1 = {number: 1, movesTo: false};
  let a2 = {number: 2, movesTo: ["a1"], diagonal: ["b1"], enPassant: []};
  let a3 = {number: 3, movesTo: ["a2"], diagonal: ["b2"], enPassant: []};
  let a4 = {number: 4, movesTo: ["a3"], diagonal: ["b3"], enPassant: ["b4"]};
  let a5 = {number: 5, movesTo: ["a4"], diagonal: ["b4"], enPassant: []};
  let a6 = {number: 6, movesTo: ["a5"], diagonal: ["b5"], enPassant: []};
  let a7 = {number: 7, movesTo: ["a6", "a5"], diagonal: ["b6"], enPassant: []};
  let a8 = false;

  let b1 = {number: 1, movesTo: false};
  let b2 = {number: 2, movesTo: ["b1"], diagonal: ["a1", "c1"], enPassant: []};
  let b3 = {number: 3, movesTo: ["b2"], diagonal: ["a2", "c2"], enPassant: []};
  let b4 = {number: 4, movesTo: ["b3"], diagonal: ["a3", "c3"], enPassant: ["a4", "c4"]};
  let b5 = {number: 5, movesTo: ["b4"], diagonal: ["a4", "c4"], enPassant: []};
  let b6 = {number: 6, movesTo: ["b5"], diagonal: ["a5", "c5"], enPassant: []};
  let b7 = {number: 7, movesTo: ["b6", "b5"], diagonal: ["a6", "c6"], enPassant: []};
  let b8 = false;

  let c1 = {number: 1, movesTo: false};
  let c2 = {number: 2, movesTo: ["c1"], diagonal: ["b1", "d1"], enPassant: []};
  let c3 = {number: 3, movesTo: ["c2"], diagonal: ["b2", "d2"], enPassant: []};
  let c4 = {number: 4, movesTo: ["c3"], diagonal: ["b3", "d3"], enPassant: ["b4", "d4"]};
  let c5 = {number: 5, movesTo: ["c4"], diagonal: ["b4", "d4"], enPassant: []};
  let c6 = {number: 6, movesTo: ["c5"], diagonal: ["b5", "d5"], enPassant: []};
  let c7 = {number: 7, movesTo: ["c6", "c5"], diagonal: ["b6", "d6"], enPassant: []};
  let c8 = false;

  let d1 = {number: 1, movesTo: false};
  let d2 = {number: 2, movesTo: ["d1"], diagonal: ["c1", "e1"], enPassant: []};
  let d3 = {number: 3, movesTo: ["d2"], diagonal: ["c2", "e2"], enPassant: []};
  let d4 = {number: 4, movesTo: ["d3"], diagonal: ["c3", "e3"], enPassant: ["c4", "e4"]};
  let d5 = {number: 5, movesTo: ["d4"], diagonal: ["c4", "e4"], enPassant: []};
  let d6 = {number: 6, movesTo: ["d5"], diagonal: ["c5", "e5"], enPassant: []};
  let d7 = {number: 7, movesTo: ["d6", "d5"], diagonal: ["c6", "e6"], enPassant: []};
  let d8 = false;

  let e1 = {number: 1, movesTo: false};
  let e2 = {number: 2, movesTo: ["e1"], diagonal: ["d1", "f1"], enPassant: []};
  let e3 = {number: 3, movesTo: ["e2"], diagonal: ["d2", "f2"], enPassant: []};
  let e4 = {number: 4, movesTo: ["e3"], diagonal: ["d3", "f3"], enPassant: ["d4", "f4"]};
  let e5 = {number: 5, movesTo: ["e4"], diagonal: ["d4", "f4"], enPassant: []};
  let e6 = {number: 6, movesTo: ["e5"], diagonal: ["d5", "f5"], enPassant: []};
  let e7 = {number: 7, movesTo: ["e6", "e5"], diagonal: ["d6", "f6"], enPassant: []};
  let e8 = false;

  let f1 = {number: 1, movesTo: false};
  let f2 = {number: 2, movesTo: ["f1"], diagonal: ["e1", "g1"], enPassant: []};
  let f3 = {number: 3, movesTo: ["f2"], diagonal: ["e2", "g2"], enPassant: []};
  let f4 = {number: 4, movesTo: ["f3"], diagonal: ["e3", "g3"], enPassant: ["e4", "g4"]};
  let f5 = {number: 5, movesTo: ["f4"], diagonal: ["e4", "g4"], enPassant: []};
  let f6 = {number: 6, movesTo: ["f5"], diagonal: ["e5", "g5"], enPassant: []};
  let f7 = {number: 7, movesTo: ["f6", "f5"], diagonal: ["e6", "g6"], enPassant: []};
  let f8 = false;

  let g1 = {number: 1, movesTo: false};
  let g2 = {number: 2, movesTo: ["g1"], diagonal: ["f1", "h1"], enPassant: []};
  let g3 = {number: 3, movesTo: ["g2"], diagonal: ["f2", "h2"], enPassant: []};
  let g4 = {number: 4, movesTo: ["g3"], diagonal: ["f3", "h3"], enPassant: ["f4", "h4"]};
  let g5 = {number: 5, movesTo: ["g4"], diagonal: ["f4", "h4"], enPassant: []};
  let g6 = {number: 6, movesTo: ["g5"], diagonal: ["f5", "h5"], enPassant: []};
  let g7 = {number: 7, movesTo: ["g6", "g5"], diagonal: ["f6", "h6"], enPassant: []};
  let g8 = false;

  let h1 = {number: 1, movesTo: false};
  let h2 = {number: 2, movesTo: ["h1"], diagonal: ["g1"], enPassant: []};
  let h3 = {number: 3, movesTo: ["h2"], diagonal: ["g2"], enPassant: []};
  let h4 = {number: 4, movesTo: ["h3"], diagonal: ["g3"], enPassant: ["g4"]};
  let h5 = {number: 5, movesTo: ["h4"], diagonal: ["g4"], enPassant: []};
  let h6 = {number: 6, movesTo: ["h5"], diagonal: ["g5"], enPassant: []};
  let h7 = {number: 7, movesTo: ["h6", "h5"], diagonal: ["g6"], enPassant: []};
  let h8 = false;

  let a = {letter: "a", numberData: [a1, a2, a3, a4, a5, a6, a7, a8]};
  let b = {letter: "b", numberData: [b1, b2, b3, b4, b5, b6, b7, b8]};
  let c = {letter: "c", numberData: [c1, c2, c3, c4, c5, c6, c7, c8]};
  let d = {letter: "d", numberData: [d1, d2, d3, d4, d5, d6, d7, d8]};
  let e = {letter: "e", numberData: [e1, e2, e3, e4, e5, e6, e7, e8]};
  let f = {letter: "f", numberData: [f1, f2, f3, f4, f5, f6, f7, f8]};
  let g = {letter: "g", numberData: [g1, g2, g3, g4, g5, g6, g7, g8]};
  let h = {letter: "h", numberData: [h1, h2, h3, h4, h5, h6, h7, h8]};

  let allPositions = [a, b, c, d, e, f, g, h]

  return allPositions;
}


//////////
//KNIGHT//
//////////

function getKnightArrays() {
  let a1 = {number: 1, movesTo: ["b3", "c2"]};
  let a2 = {number: 2, movesTo: ["b4", "c1", "c3"]};
  let a3 = {number: 3, movesTo: ["b1", "b5", "c2", "c4"]};
  let a4 = {number: 4, movesTo: ["b2", "b6", "c3", "c5"]};
  let a5 = {number: 5, movesTo: ["b3", "b7", "c4", "c6"]};
  let a6 = {number: 6, movesTo: ["b4", "b8", "c5", "c7"]};
  let a7 = {number: 7, movesTo: ["b5", "c6", "c8"]};
  let a8 = {number: 8, movesTo: ["b6", "c7"]};

  let b1 = {number: 1, movesTo: ["a3", "c3", "d2"]};
  let b2 = {number: 2, movesTo: ["a4", "c4", "d1", "d3"]};
  let b3 = {number: 3, movesTo: ["a1", "a5", "c1", "c5", "d2", "d4"]};
  let b4 = {number: 4, movesTo: ["a2", "a6", "c2", "c6", "d3", "d5"]};
  let b5 = {number: 5, movesTo: ["a3", "a7", "c3", "c7", "d4", "d6"]};
  let b6 = {number: 6, movesTo: ["a4", "a8", "c4", "c8", "d5", "d7"]};
  let b7 = {number: 7, movesTo: ["a5", "c5", "d6", "d8"]};
  let b8 = {number: 8, movesTo: ["a6", "c6", "d7"]};

  let c1 = {number: 1, movesTo: ["a2", "b3", "d3", "e2"]};
  let c2 = {number: 2, movesTo: ["a1", "a3", "b4", "d4", "e1", "e3"]};
  let c3 = {number: 3, movesTo: ["a2", "a4", "b1", "b5", "d1", "d5", "e2", "e4"]};
  let c4 = {number: 4, movesTo: ["a3", "a5", "b2", "b6", "d2", "d6", "e3", "e5"]};
  let c5 = {number: 5, movesTo: ["a4", "a6", "b3", "b7", "d3", "d7", "e4", "e6"]};
  let c6 = {number: 6, movesTo: ["a5", "a7", "b4", "b8", "d4", "d8", "e5", "e7"]};
  let c7 = {number: 7, movesTo: ["a6", "a8", "b5", "d5", "e6", "e8"]};
  let c8 = {number: 8, movesTo: ["a7", "b6", "d6", "e7"]};

  let d1 = {number: 1, movesTo: ["b2", "c3", "e3", "f2"]};
  let d2 = {number: 2, movesTo: ["b1", "b3", "c4", "e4", "f1", "f3"]};
  let d3 = {number: 3, movesTo: ["b2", "b4", "c1", "c5", "e1", "e5", "f2", "f4"]};
  let d4 = {number: 4, movesTo: ["b3", "b5", "c2", "c6", "e2", "e6", "f3", "f5"]};
  let d5 = {number: 5, movesTo: ["b4", "b6", "c3", "c7", "e3", "e7", "f4", "f6"]};
  let d6 = {number: 6, movesTo: ["b5", "b7", "c4", "c8", "e4", "e8", "f5", "f7"]};
  let d7 = {number: 7, movesTo: ["b6", "b8", "c5", "e5", "f6", "f8"]};
  let d8 = {number: 8, movesTo: ["b7", "c6", "e6", "f7"]};

  let e1 = {number: 1, movesTo: ["c2", "d3", "f3", "g2"]};
  let e2 = {number: 2, movesTo: ["c1", "c3", "d4", "f4", "g1", "g3"]};
  let e3 = {number: 3, movesTo: ["c2", "c4", "d1", "d5", "f1", "f5", "g2", "g4"]};
  let e4 = {number: 4, movesTo: ["c3", "c5", "d2", "d6", "f2", "f6", "g3", "g5"]};
  let e5 = {number: 5, movesTo: ["c4", "c6", "d3", "d7", "f3", "f7", "g4", "g6"]};
  let e6 = {number: 6, movesTo: ["c5", "c7", "d4", "d8", "f4", "f8", "g5", "g7"]};
  let e7 = {number: 7, movesTo: ["c6", "c8", "d5", "f5", "g6", "g8"]};
  let e8 = {number: 8, movesTo: ["c7", "d6", "f6", "g7"]};

  let f1 = {number: 1, movesTo: ["d2", "e3", "g3", "h2"]};
  let f2 = {number: 2, movesTo: ["d1", "d3", "e4", "g4", "h1", "h3"]};
  let f3 = {number: 3, movesTo: ["d2", "d4", "e1", "e5", "g1", "g5", "h2", "h4"]};
  let f4 = {number: 4, movesTo: ["d3", "d5", "e2", "e6", "g2", "g6", "h3", "h5"]};
  let f5 = {number: 5, movesTo: ["d4", "d6", "e3", "e7", "g3", "g7", "h4", "h6"]};
  let f6 = {number: 6, movesTo: ["d5", "d7", "e4", "e8", "g4", "g8", "h5", "h7"]};
  let f7 = {number: 7, movesTo: ["d6", "d8", "e5", "g5", "h6", "h8"]};
  let f8 = {number: 8, movesTo: ["d7", "e6", "g6", "h7"]};

  let g1 = {number: 1, movesTo: ["e2", "f3", "h3"]};
  let g2 = {number: 2, movesTo: ["e1", "e3", "f4", "h4"]};
  let g3 = {number: 3, movesTo: ["e2", "e4", "f1", "f5", "h1", "h5"]};
  let g4 = {number: 4, movesTo: ["e3", "e5", "f2", "f6", "h2", "h6"]};
  let g5 = {number: 5, movesTo: ["e4", "e6", "f3", "f7", "h3", "h7"]};
  let g6 = {number: 6, movesTo: ["e5", "e7", "f4", "f8", "h4", "h8"]};
  let g7 = {number: 7, movesTo: ["e6", "e8", "f5", "h5"]};
  let g8 = {number: 8, movesTo: ["e7", "f6", "h6"]};

  let h1 = {number: 1, movesTo: ["f2", "g3"]};
  let h2 = {number: 2, movesTo: ["f1", "f3", "g4"]};
  let h3 = {number: 3, movesTo: ["f2", "f4", "g1", "g5"]};
  let h4 = {number: 4, movesTo: ["f3", "f5", "g2", "g6"]};
  let h5 = {number: 5, movesTo: ["f4", "f6", "g3", "g7"]};
  let h6 = {number: 6, movesTo: ["f5", "f7", "g4", "g8"]};
  let h7 = {number: 7, movesTo: ["f6", "f8", "g5"]};
  let h8 = {number: 8, movesTo: ["f7", "g6"]};

  let a = {letter: "a", numberData: [a1, a2, a3, a4, a5, a6, a7, a8]};
  let b = {letter: "b", numberData: [b1, b2, b3, b4, b5, b6, b7, b8]};
  let c = {letter: "c", numberData: [c1, c2, c3, c4, c5, c6, c7, c8]};
  let d = {letter: "d", numberData: [d1, d2, d3, d4, d5, d6, d7, d8]};
  let e = {letter: "e", numberData: [e1, e2, e3, e4, e5, e6, e7, e8]};
  let f = {letter: "f", numberData: [f1, f2, f3, f4, f5, f6, f7, f8]};
  let g = {letter: "g", numberData: [g1, g2, g3, g4, g5, g6, g7, g8]};
  let h = {letter: "h", numberData: [h1, h2, h3, h4, h5, h6, h7, h8]};

  let allPositions = [a, b, c, d, e, f, g, h]

  return allPositions;
}


//////////
//BISHOP//
//////////

function getBishopArrays() {
  let a1 = {number: 1, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], []]};
  let a2 = {number: 2, movesTo: [["a2", "b3", "c4", "d5", "e6", "f7", "g8"], ["a2", "b1"]]};
  let a3 = {number: 3, movesTo: [["a3", "b4", "c5", "d6", "e7", "f8"], ["a3", "b2", "c1"]]};
  let a4 = {number: 4, movesTo: [["a4", "b5", "c6", "d7", "e8"], ["a4", "b3", "c2", "d1"]]};
  let a5 = {number: 5, movesTo: [["a5", "b6", "c7", "d8"], ["a5", "b4", "c3", "d2", "e1"]]};
  let a6 = {number: 6, movesTo: [["a6", "b7", "c8"], ["a6", "b5", "c4", "d3", "e2", "f1"]]};
  let a7 = {number: 7, movesTo: [["a7", "b8"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let a8 = {number: 8, movesTo: [[], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};

  let b1 = {number: 1, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["a2", "b1"]]};
  let b2 = {number: 2, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], ["a3", "b2", "c1"]]};
  let b3 = {number: 3, movesTo: [["a2", "b3", "c4", "d5", "e6", "f7", "g8"], ["a4", "b3", "c2", "d1"]]};
  let b4 = {number: 4, movesTo: [["a3", "b4", "c5", "d6", "e7", "f8"], ["a5", "b4", "c3", "d2", "e1"]]};
  let b5 = {number: 5, movesTo: [["a4", "b5", "c6", "d7", "e8"], ["a6", "b5", "c4", "d3", "e2", "f1"]]};
  let b6 = {number: 6, movesTo: [["a5", "b6", "c7", "d8"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let b7 = {number: 7, movesTo: [["a6", "b7", "c8"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};
  let b8 = {number: 8, movesTo: [["a7", "b8"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};

  let c1 = {number: 1, movesTo: [["c1", "d2", "e3", "f4", "g5", "h6"], ["a3", "b2", "c1"]]};
  let c2 = {number: 2, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["a4", "b3", "c2", "d1"]]};
  let c3 = {number: 3, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], ["a5", "b4", "c3", "d2", "e1"]]};
  let c4 = {number: 4, movesTo: [["a2", "b3", "c4", "d5", "e6", "f7", "g8"], ["a6", "b5", "c4", "d3", "e2", "f1"]]};
  let c5 = {number: 5, movesTo: [["a3", "b4", "c5", "d6", "e7", "f8"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let c6 = {number: 6, movesTo: [["a4", "b5", "c6", "d7", "e8"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};
  let c7 = {number: 7, movesTo: [["a5", "b6", "c7", "d8"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};
  let c8 = {number: 8, movesTo: [["a6", "b7", "c8"], ["c8", "d7", "e6", "f5", "g4", "h3"]]};

  let d1 = {number: 1, movesTo: [["a4", "b3", "c2", "d1"], ["d1", "e2", "f3", "g4", "h5"]]};
  let d2 = {number: 2, movesTo: [["c1", "d2", "e3", "f4", "g5", "h6"], ["a5", "b4", "c3", "d2", "e1"]]};
  let d3 = {number: 3, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["a6", "b5", "c4", "d3", "e2", "f1"]]};
  let d4 = {number: 4, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let d5 = {number: 5, movesTo: [["a2", "b3", "c4", "d5", "e6", "f7", "g8"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};
  let d6 = {number: 6, movesTo: [["a3", "b4", "c5", "d6", "e7", "f8"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};
  let d7 = {number: 7, movesTo: [["a4", "b5", "c6", "d7", "e8"], ["c8", "d7", "e6", "f5", "g4", "h3"]]};
  let d8 = {number: 8, movesTo: [["a5", "b6", "c7", "d8"], ["d8", "e7", "f6", "g5", "h4"]]};

  let e1 = {number: 1, movesTo: [["a5", "b4", "c3", "d2", "e1"], ["e1", "f2", "g3", "h4"]]};
  let e2 = {number: 2, movesTo: [["d1", "e2", "f3", "g4", "h5"], ["a6", "b5", "c4", "d3", "e2", "f1"]]};
  let e3 = {number: 3, movesTo: [["c1", "d2", "e3", "f4", "g5", "h6"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let e4 = {number: 4, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};
  let e5 = {number: 5, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};
  let e6 = {number: 6, movesTo: [["a2", "b3", "c4", "d5", "e6", "f7", "g8"], ["c8", "d7", "e6", "f5", "g4", "h3"]]};
  let e7 = {number: 7, movesTo: [["a3", "b4", "c5", "d6", "e7", "f8"], ["d8", "e7", "f6", "g5", "h4"]]};
  let e8 = {number: 8, movesTo: [["a4", "b5", "c6", "d7", "e8"], ["e8", "f7", "g6", "h5"]]};

  let f1 = {number: 1, movesTo: [["f1", "g2", "h3"], ["a6", "b5", "c4", "d3", "e2", "f1"]]};
  let f2 = {number: 2, movesTo: [["e1", "f2", "g3", "h4"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let f3 = {number: 3, movesTo: [["d1", "e2", "f3", "g4", "h5"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};
  let f4 = {number: 4, movesTo: [["c1", "d2", "e3", "f4", "g5", "h6"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};
  let f5 = {number: 5, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["c8", "d7", "e6", "f5", "g4", "h3"]]};
  let f6 = {number: 6, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], ["d8", "e7", "f6", "g5", "h4"]]};
  let f7 = {number: 7, movesTo: [["a2", "b3", "c4", "d5", "e6", "f7", "g8"], ["e8", "f7", "g6", "h5"]]};
  let f8 = {number: 8, movesTo: [["a3", "b4", "c5", "d6", "e7", "f8"], ["f8", "g7", "h6"]]};

  let g1 = {number: 1, movesTo: [["g1", "h2"], ["a7", "b6", "c5", "d4", "e3", "f2", "g1"]]};
  let g2 = {number: 2, movesTo: [["f1", "g2", "h3"], ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"]]};
  let g3 = {number: 3, movesTo: [["e1", "f2", "g3", "h4"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};
  let g4 = {number: 4, movesTo: [["c8", "d7", "e6", "f5", "g4", "h3"], ["d1", "e2", "f3", "g4", "h5"]]};
  let g5 = {number: 5, movesTo: [["c1", "d2", "e3", "f4", "g5", "h6"], ["d8", "e7", "f6", "g5", "h4"]]};
  let g6 = {number: 6, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["e8", "f7", "g6", "h5"]]};
  let g7 = {number: 7, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], ["f8", "g7", "h6"]]};
  let g8 = {number: 8, movesTo: [["g8", "h7"], ["a2", "b3", "c4", "d5", "e6", "f7", "g8"]]};

  let h1 = {number: 1, movesTo: [["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"], []]};
  let h2 = {number: 2, movesTo: [["g1", "h2"], ["b8", "c7", "d6", "e5", "f4", "g3", "h2"]]};
  let h3 = {number: 3, movesTo: [["f1", "g2", "h3"], ["c8", "d7", "e6", "f5", "g4", "h3"]]};
  let h4 = {number: 4, movesTo: [["d8", "e7", "f6", "g5", "h4"], ["e1", "f2", "g3", "h4"]]};
  let h5 = {number: 5, movesTo: [["d1", "e2", "f3", "g4", "h5"], ["e8", "f7", "g6", "h5"]]};
  let h6 = {number: 6, movesTo: [["c1", "d2", "e3", "f4", "g5", "h6"], ["f8", "g7", "h6"]]};
  let h7 = {number: 7, movesTo: [["b1", "c2", "d3", "e4", "f5", "g6", "h7"], ["g8", "h7"]]};
  let h8 = {number: 8, movesTo: [["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], []]};

  let a = {letter: "a", numberData: [a1, a2, a3, a4, a5, a6, a7, a8]};
  let b = {letter: "b", numberData: [b1, b2, b3, b4, b5, b6, b7, b8]};
  let c = {letter: "c", numberData: [c1, c2, c3, c4, c5, c6, c7, c8]};
  let d = {letter: "d", numberData: [d1, d2, d3, d4, d5, d6, d7, d8]};
  let e = {letter: "e", numberData: [e1, e2, e3, e4, e5, e6, e7, e8]};
  let f = {letter: "f", numberData: [f1, f2, f3, f4, f5, f6, f7, f8]};
  let g = {letter: "g", numberData: [g1, g2, g3, g4, g5, g6, g7, g8]};
  let h = {letter: "h", numberData: [h1, h2, h3, h4, h5, h6, h7, h8]};

  let allPositions = [a, b, c, d, e, f, g, h]
  
  return allPositions;
}


////////
//ROOK//
////////

function getRookLetterArrays() {
  let a = {letter: "a", columns: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"]};
  let b = {letter: "b", columns: ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"]};
  let c = {letter: "c", columns: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"]};
  let d = {letter: "d", columns: ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"]};
  let e = {letter: "e", columns: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8"]};
  let f = {letter: "f", columns: ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"]};
  let g = {letter: "g", columns: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"]};
  let h = {letter: "h", columns: ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"]};

  let allLetters = [a, b, c, d, e, f, g, h];
  return allLetters;
}
  
function getRookNumberArrays() {
  let one = {number: 1, rows: ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]};
  let two = {number: 2, rows: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"]};
  let three = {number: 3, rows: ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"]};
  let four = {number: 4, rows: ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"]};
  let five = {number: 5, rows: ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"]};
  let six = {number: 6, rows: ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"]};
  let seven = {number: 7, rows: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]};
  let eight = {number: 8, rows: ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"]};

  let allNumbers = [one, two, three, four, five, six, seven, eight];
  return allNumbers;
}


////////
//KING//
////////

function getKingArrays() {
  let a1 = {number: 1, movesTo: ["a2", "b1", "b2"]};
  let a2 = {number: 2, movesTo: ["a1", "a3", "b1", "b2", "b3"]};
  let a3 = {number: 3, movesTo: ["a2", "a4", "b2", "b3", "b4"]};
  let a4 = {number: 4, movesTo: ["a3", "a5", "b3", "b4", "b5"]};
  let a5 = {number: 5, movesTo: ["a4", "a6", "b4", "b5", "b6"]};
  let a6 = {number: 6, movesTo: ["a5", "a7", "b5", "b6", "b7"]};
  let a7 = {number: 7, movesTo: ["a6", "a8", "b6", "b7", "b8"]};
  let a8 = {number: 8, movesTo: ["a7", "b7", "b8"]};

  let b1 = {number: 1, movesTo: ["a1", "a2", "b2", "c1", "c2"]};
  let b2 = {number: 2, movesTo: ["a1", "a2", "a3", "b1", "b3", "c1", "c2", "c3"]};
  let b3 = {number: 3, movesTo: ["a2", "a3", "a4", "b2", "b4", "c2", "c3", "c4"]};
  let b4 = {number: 4, movesTo: ["a3", "a4", "a5", "b3", "b5", "c3", "c4", "c5"]};
  let b5 = {number: 5, movesTo: ["a4", "a5", "a6", "b4", "b6", "c4", "c5", "c6"]};
  let b6 = {number: 6, movesTo: ["a5", "a6", "a7", "b5", "b7", "c5", "c6", "c7"]};
  let b7 = {number: 7, movesTo: ["a6", "a7", "a8", "b6", "b8", "c6", "c7", "c8"]};
  let b8 = {number: 8, movesTo: ["a7", "a8", "b7", "c7", "c8"]};

  let c1 = {number: 1, movesTo: ["b1", "b2", "c2", "d1", "d2"]};
  let c2 = {number: 2, movesTo: ["b1", "b2", "b3", "c1", "c3", "d1", "d2", "d3"]};
  let c3 = {number: 3, movesTo: ["b2", "b3", "b4", "c2", "c4", "d2", "d3", "d4"]};
  let c4 = {number: 4, movesTo: ["b3", "b4", "b5", "c3", "c5", "d3", "d4", "d5"]};
  let c5 = {number: 5, movesTo: ["b4", "b5", "b6", "c4", "c6", "d4", "d5", "d6"]};
  let c6 = {number: 6, movesTo: ["b5", "b6", "b7", "c5", "c7", "d5", "d6", "d7"]};
  let c7 = {number: 7, movesTo: ["b6", "b7", "b8", "c6", "c8", "d6", "d7", "d8"]};
  let c8 = {number: 8, movesTo: ["b7", "b8", "c7", "d7", "d8"]};

  let d1 = {number: 1, movesTo: ["c1", "c2", "d2", "e1", "e2"]};
  let d2 = {number: 2, movesTo: ["c1", "c2", "c3", "d1", "d3", "e1", "e2", "e3"]};
  let d3 = {number: 3, movesTo: ["c2", "c3", "c4", "d2", "d4", "e2", "e3", "e4"]};
  let d4 = {number: 4, movesTo: ["c3", "c4", "c5", "d3", "d5", "e3", "e4", "e5"]};
  let d5 = {number: 5, movesTo: ["c4", "c5", "c6", "d4", "d6", "e4", "e5", "e6"]};
  let d6 = {number: 6, movesTo: ["c5", "c6", "c7", "d5", "d7", "e5", "e6", "e7"]};
  let d7 = {number: 7, movesTo: ["c6", "c7", "c8", "d6", "d8", "e6", "e7", "e8"]};
  let d8 = {number: 8, movesTo: ["c7", "c8", "d7", "e7", "e8"]};

  let e1 = {number: 1, movesTo: ["d1", "d2", "e2", "f1", "f2"]};
  let e2 = {number: 2, movesTo: ["d1", "d2", "d3", "e1", "e3", "f1", "f2", "f3"]};
  let e3 = {number: 3, movesTo: ["d2", "d3", "d4", "e2", "e4", "f2", "f3", "f4"]};
  let e4 = {number: 4, movesTo: ["d3", "d4", "d5", "e3", "e5", "f3", "f4", "f5"]};
  let e5 = {number: 5, movesTo: ["d4", "d5", "d6", "e4", "e6", "f4", "f5", "f6"]};
  let e6 = {number: 6, movesTo: ["d5", "d6", "d7", "e5", "e7", "f5", "f6", "f7"]};
  let e7 = {number: 7, movesTo: ["d6", "d7", "d8", "e6", "e8", "f6", "f7", "f8"]};
  let e8 = {number: 8, movesTo: ["d7", "d8", "e7", "f7", "f8"]};

  let f1 = {number: 1, movesTo: ["e1", "e2", "f2", "g1", "g2"]};
  let f2 = {number: 2, movesTo: ["e1", "e2", "e3", "f1", "f3", "g1", "g2", "g3"]};
  let f3 = {number: 3, movesTo: ["e2", "e3", "e4", "f2", "f4", "g2", "g3", "g4"]};
  let f4 = {number: 4, movesTo: ["e3", "e4", "e5", "f3", "f5", "g3", "g4", "g5"]};
  let f5 = {number: 5, movesTo: ["e4", "e5", "e6", "f4", "f6", "g4", "g5", "g6"]};
  let f6 = {number: 6, movesTo: ["e5", "e6", "e7", "f5", "f7", "g5", "g6", "g7"]};
  let f7 = {number: 7, movesTo: ["e6", "e7", "e8", "f6", "f8", "g6", "g7", "g8"]};
  let f8 = {number: 8, movesTo: ["e7", "e8", "f7", "g7", "g8"]};

  let g1 = {number: 1, movesTo: ["f1", "f2", "g2", "h1", "h2"]};
  let g2 = {number: 2, movesTo: ["f1", "f2", "f3", "g1", "g3", "h1", "h2", "h3"]};
  let g3 = {number: 3, movesTo: ["f2", "f3", "f4", "g2", "g4", "h2", "h3", "h4"]};
  let g4 = {number: 4, movesTo: ["f3", "f4", "f5", "g3", "g5", "h3", "h4", "h5"]};
  let g5 = {number: 5, movesTo: ["f4", "f5", "f6", "g4", "g6", "h4", "h5", "h6"]};
  let g6 = {number: 6, movesTo: ["f5", "f6", "f7", "g5", "g7", "h5", "h6", "h7"]};
  let g7 = {number: 7, movesTo: ["f6", "f7", "f8", "g6", "g8", "h6", "h7", "h8"]};
  let g8 = {number: 8, movesTo: ["f7", "f8", "g7", "h7", "h8"]};

  let h1 = {number: 1, movesTo: ["g1", "g2", "h2"]};
  let h2 = {number: 2, movesTo: ["g1", "g2", "g3", "h1", "h3"]};
  let h3 = {number: 3, movesTo: ["g2", "g3", "g4", "h2", "h4"]};
  let h4 = {number: 4, movesTo: ["g3", "g4", "g5", "h3", "h5"]};
  let h5 = {number: 5, movesTo: ["g4", "g5", "g6", "h4", "h6"]};
  let h6 = {number: 6, movesTo: ["g5", "g6", "g7", "h5", "h7"]};
  let h7 = {number: 7, movesTo: ["g6", "g7", "g8", "h6", "h8"]};
  let h8 = {number: 8, movesTo: ["g7", "g8", "h7"]};

  let a = {letter: "a", numberData: [a1, a2, a3, a4, a5, a6, a7, a8]};
  let b = {letter: "b", numberData: [b1, b2, b3, b4, b5, b6, b7, b8]};
  let c = {letter: "c", numberData: [c1, c2, c3, c4, c5, c6, c7, c8]};
  let d = {letter: "d", numberData: [d1, d2, d3, d4, d5, d6, d7, d8]};
  let e = {letter: "e", numberData: [e1, e2, e3, e4, e5, e6, e7, e8]};
  let f = {letter: "f", numberData: [f1, f2, f3, f4, f5, f6, f7, f8]};
  let g = {letter: "g", numberData: [g1, g2, g3, g4, g5, g6, g7, g8]};
  let h = {letter: "h", numberData: [h1, h2, h3, h4, h5, h6, h7, h8]};

  let allPositions = [a, b, c, d, e, f, g, h]
  
  return allPositions;
}

let whitePawnArrays = getWhitePawnArrays();
let blackPawnArrays = getBlackPawnArrays();
let knightArrays = getKnightArrays();
let bishopArrays = getBishopArrays();
let rookLetterArrays = getRookLetterArrays();
let rookNumberArrays = getRookNumberArrays();
let kingArrays = getKingArrays();