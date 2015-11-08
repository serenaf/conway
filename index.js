document.addEventListener("DOMContentLoaded", function(event) {
  var grid;
  //generates 2d array, with 1 and 0
  grid = initGrid(100, 100);
  //draws initial array
  //loop infinitvely

  loop( grid );

} );

var loop = function( grid ) {
  draw( grid );
  update( grid );
  setTimeout( function(){ loop( grid ) }, 100 );
}


var initGrid = function(rows, cols) {
  var startingGrid = [];

  var gridContainer = document.getElementById('grid');

  for(i=0; i< rows; i++) {
    startingGrid.push([]);
  }
  for(i=0; i< rows; i++) {
    for(j=0; j<cols; j++) {

      var cell = document.createElement('div');

      if (Math.round(Math.random()) === 1)
      {
        startingGrid[i][j] = { state: 1, elem: cell };
      }
      else {
       startingGrid[i][j] = { state: 0, elem: cell };
       cell.className = 'dead';
      }

      gridContainer.appendChild( cell );
    }
  }

  return startingGrid;
}


var draw = function(grid) {
  for( var i = 0; i < grid.length; i++ ) {
    for( var j = 0; j < grid[i].length; j++ ) {
      grid[i][j].elem.className = grid[i][j].state == 1 ? "" : "dead";
    }
  }
}

var isAlive = function( arr, col, row ) {
  var count = 0;

  for( var i = col - 1; i < col + 2; i++ ) {
    for( var j = row - 1; j < row + 2; j++ ) {
      if( ( i >= 0 && i < arr.length ) &&
          ( j >= 0 && j < arr[i].length ) &&
          !( i == col && j == row ) &&
          arr[i][j].state == 1 ) {
        count++;
      }
    }
  }

  if( arr[col][row].state == 1 && ( count < 2 || count > 3 ) ) {
    return false;
  }
  else if( count == 3 ) {
    return true;
  }
  return arr[col][row].state == 1;
}

var update = function(grid) {
  var copyGrid = arrayCopy( grid );

  for( var i = 0; i < copyGrid.length; i++ ) {
    for( var j = 0; j < copyGrid[i].length; j++ ) {
      grid[i][j].state = isAlive( copyGrid, i, j ) ? 1 : 0;
    }
  }

}

var arrayCopy = function( arr ) {
  var newArr = new Array( arr.length );
  for( var i = 0; i < arr.length; i++ ) {
    newArr[i] = new Array( arr[i].length );
    for( var j = 0; j < arr[i].length; j++ ) {
      newArr[i][j] = { state: arr[i][j].state, elem: arr[i][j].cell };
    }
  }
  return newArr;
}
