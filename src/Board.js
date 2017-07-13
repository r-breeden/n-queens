// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      row.forEach(function(item) {
        if (item === 1) {
          count++;
        }
      });
      return count > 1; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.get('n');
      //run for as many rows as there are
      for (var i = 0; i < n; i++) {
        //check if each row has conflict
        if ( this.hasRowConflictAt(i) ) {
        //if so return true 
          return true;
        }
      }//end for 
      return false;                                                                                                                                                  return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var column = [];
      for (var i = 0; i < this.get('n'); i++) {
        column.push(this.get(i)[colIndex]);
      }
      var count = 0;
      column.forEach(function(item) {
        if (item === 1) {
          count++;
        }
      }); 
      return count > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.get('n');
      //run for as many rows as there are
      for (var i = 0; i < n; i++) {
        //check if each row has conflict
        if ( this.hasColConflictAt(i) ) {
        //if so return true 
          return true;
        }
      }//end for 
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var majorDiagonal = [];
      var count = 0; 
      //this.get(0)[majorDiagonalColumnIndexAtFirstRow];
      var indexRow = 0;
      for (var indexCol = majorDiagonalColumnIndexAtFirstRow; indexCol < this.get('n'); indexCol++) {
        //place element into array
        majorDiagonal.push(this.get(indexRow)[indexCol]);
        indexRow++;
      }
      //check if major diagonal conflict has occured
      majorDiagonal.forEach(function(item) {
        if (item === 1) {
          count++;
        }
      });
      return count > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      console.log('---------------------------');
      console.log(JSON.stringify(this.get(0)));
      console.log(JSON.stringify(this.get(1)));
      console.log(JSON.stringify(this.get(2)));
      console.log(JSON.stringify(this.get(3)));


      var result = false;
      debugger;
      // loop and call firstRow diagnostic function
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          // if true, return true;
          result = true;
        }
        
      }

      for (var i = 1; i < this.get('n'); i++) {
        // declare major diagonal array starting row i
        var majorDiagonal = [];
        // set temporary row index that will not increment when looping j
        var tempRowIndex = i;
        // set counter for each diagonal
        var count = 0;
        for (var j = 0; j < tempRowIndex; j++) { // loops diagonal
          // push each diagonal item
          majorDiagonal.push(this.get(tempRowIndex)[j]);
          tempRowIndex++;
          
        }
        majorDiagonal.forEach(function(item) { // loop through on diagonal array and check conflict
          if (item === 1) {
            count++;
          }
        });
        if (count > 1) {
          result = true;
        }
      }

      return result; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
