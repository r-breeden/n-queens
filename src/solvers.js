/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  debugger;
  var solution = [];
  //recursive function
  //declare a function that accepts depth and memoArray  which recursively adds rook(s)
  var possibleSolutions = [];
  
  //building matrix 
  var recursive = function (depth, memoArray) {
    //base case if depth = 0
    if ( depth === 0 ) { 
      //convert single dimension memoArray to matrix array
      var matrix = [];
      for ( var i = 0; i < memoArray.length; i++) {
        //use division + math.floor() to find row index
        var rowIndex = Math.floor(i / n);
        //use modulo to find column index
        var colIndex = i % n;
        
        if (rowIndex === n - 1 ) {
          //build a row 
          var row = [];
          for ( var j = 0; j < n; j++) {
            //i = last column index
            //i - (n - 1 )  = beginning column index of the row;
            //j = distance from beginning column of the row
            //i - (n - 1) + j = index of the item we want to push from memoArray 
            row.push(memoArray[i - (n - 1) + j]);
          }
          matrix.push(row);
        }
        
      } 
      //push to solution
      possibleSolutions.push(matrix);
        
    } else if (memoArray.length === n * n) {

      //do nothing

    } else { //ELSE recusive case (when depth is not zero)
      //case when we place a rook
      recursive(depth - 1, memoArray.concat([1]));
      
      //case when we do NOT place a rook
      recursive(depth, memoArray.concat([0]));
    }
    
      //push next possible position + recurse with parameters (depth - 1, concat of memoArray) 
  };//END OF RECUSIVE FUNCTION

  // call recursive function
  recursive(n, []); // now we have all possible solotions with rook placed n times

  // loop through possibleSolutions array, then apply hasAnyRooksConflicts to each possible solution. 
    // if hasAnyRooksConflicts(matrix) returns true, then return matrix(break out of the loop);
  for (var x = 0; x < possibleSolutions.length; x++) {
    // create new board with matrix (possibleSolution[i]), then use board.hasAnyRooksConflicts;
      
    var tempBoard = new Board(possibleSolutions[x]);
    //if true return matrix
    if ( tempBoard.hasAnyRooksConflicts ) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(tempBoard));
      return tempBoard;
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
