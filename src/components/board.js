import React from 'react';
import Column from './column';
import Status from './status';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [
        Array(6).fill(null),
        Array(6).fill(null),
        Array(6).fill(null),
        Array(6).fill(null),
        Array(6).fill(null),
        Array(6).fill(null),
        Array(6).fill(null),
      ],
      isRedTurn: true,
      winner: null,
      boardFull: false
    }
  }

  winner(cells) {

    const winningOptions = [
      [ [0,0], [0,1], [0,2], [0,3] ],
      [ [0,1], [0,2], [0,3], [0,4] ],
      [ [0,2], [0,3], [0,4], [0,5] ],
      [ [0,3], [0,4], [0,5], [0,6] ],
      [ [1,0], [1,1], [1,2], [1,3] ],
      [ [1,1], [1,2], [1,3], [1,4] ],
      [ [1,2], [1,3], [1,4], [1,5] ],
      [ [1,3], [1,4], [1,5], [1,6] ],
      [ [2,0], [2,1], [2,2], [2,3] ],
      [ [2,1], [2,2], [2,3], [2,4] ],
      [ [2,2], [2,3], [2,4], [2,5] ],
      [ [2,3], [2,4], [2,5], [2,6] ],
      [ [3,0], [3,1], [3,2], [3,3] ],
      [ [3,1], [3,2], [3,3], [3,4] ],
      [ [3,2], [3,3], [3,4], [3,5] ],
      [ [3,3], [3,4], [3,5], [3,6] ],
      [ [4,0], [4,1], [4,2], [4,3] ],
      [ [4,1], [4,2], [4,3], [4,4] ],
      [ [4,2], [4,3], [4,4], [4,5] ],
      [ [4,3], [4,4], [4,5], [4,6] ],
      [ [5,0], [5,1], [5,2], [5,3] ],
      [ [5,1], [5,2], [5,3], [5,4] ],
      [ [5,2], [5,3], [5,4], [5,5] ],
      [ [5,3], [5,4], [5,5], [5,6] ],
      [ [0,0], [1,0], [2,0], [3,0] ],
      [ [1,0], [2,0], [3,0], [4,0] ],
      [ [2,0], [3,0], [4,0], [5,0] ],
      [ [0,1], [1,1], [2,1], [3,1] ],
      [ [1,1], [2,1], [3,1], [4,1] ],
      [ [2,1], [3,1], [4,1], [5,1] ],
      [ [0,2], [1,2], [2,2], [3,2] ],
      [ [1,2], [2,2], [3,2], [4,2] ],
      [ [2,2], [3,2], [4,2], [5,2] ],
      [ [0,3], [1,3], [2,3], [3,3] ],
      [ [1,3], [2,3], [3,3], [4,3] ],
      [ [2,3], [3,3], [4,3], [5,3] ],
      [ [0,4], [1,4], [2,4], [3,4] ],
      [ [1,4], [2,4], [3,4], [4,4] ],
      [ [2,4], [3,4], [4,4], [5,4] ],
      [ [0,5], [1,5], [2,5], [3,5] ],
      [ [1,5], [2,5], [3,5], [4,5] ],
      [ [2,5], [3,5], [4,5], [5,5] ],
      [ [0,6], [1,6], [2,6], [3,6] ],
      [ [1,6], [2,6], [3,6], [4,6] ],
      [ [2,6], [3,6], [4,6], [5,6] ],
      [ [0,0], [1,1], [2,2], [3,3] ],
      [ [0,1], [1,2], [2,3], [3,4] ],
      [ [0,2], [1,3], [2,4], [3,5] ],
      [ [0,3], [1,4], [2,5], [3,6] ],
      [ [1,0], [2,1], [3,2], [4,3] ],
      [ [1,1], [2,2], [3,3], [4,4] ],
      [ [1,2], [2,3], [3,4], [4,5] ],
      [ [1,3], [2,4], [3,5], [4,6] ],
      [ [2,0], [3,1], [4,2], [5,3] ],
      [ [2,1], [3,2], [4,3], [5,4] ],
      [ [2,2], [3,3], [4,4], [5,5] ],
      [ [2,3], [3,4], [4,5], [5,6] ],
      [ [0,3], [1,2], [2,1], [3,0] ],
      [ [0,4], [1,3], [2,2], [3,1] ],
      [ [0,5], [1,4], [2,3], [3,2] ],
      [ [0,6], [1,5], [2,4], [3,3] ],
      [ [1,3], [2,2], [3,1], [4,0] ],
      [ [1,4], [2,3], [3,2], [4,1] ],
      [ [1,5], [2,4], [3,3], [4,2] ],
      [ [1,6], [2,5], [3,4], [4,3] ],
      [ [2,3], [3,2], [4,1], [5,0] ],
      [ [2,4], [3,3], [4,2], [5,1] ],
      [ [2,5], [3,4], [4,3], [5,2] ],
      [ [2,6], [3,5], [4,4], [5,3] ]
    ]

    for (var i = 0; i < winningOptions.length; i++) {
      const [a, b, c, d] = winningOptions[i];
      if (cells[a[1]][a[0]] && cells[a[1]][a[0]] === cells[b[1]][b[0]] && cells[a[1]][a[0]] === cells[c[1]][c[0]] && cells[a[1]][a[0]] === cells[d[1]][d[0]] ) {
        return cells[a[1]][a[0]]
      }
    }
  }

  spacesInColumn(column) {
    return !this.state.cells[column][0]
  }

  columnCanBePlayed(index) {
    return this.spacesInColumn(index)
  }

  player() {
    return this.state.isRedTurn ? 'red' : 'yellow'
  }

  calculateColumnPosition(column) {
    const lastPlayedInColumn = column.findIndex(cell => cell != null)
    if (lastPlayedInColumn === -1) {
      column[5] = this.player() 
    }
    else {
      column[lastPlayedInColumn-1] = this.player()
    }
  }

  checkIfWinner(cells) {
    const winningPlayer = this.winner(cells)

    if (winningPlayer) {
      this.setState({
        winner: winningPlayer
      })
    } else {
      this.setState({
        isRedTurn: !this.state.isRedTurn,
      })
    }
  }

  checkBoardSpaces(columns) {

    const boardHasSpaces = columns.some( 
      column => column.some(
        cell => cell == null
        )
      )
    if (!boardHasSpaces) {
      this.setState({
        boardFull: true
      })
    }
  }

  gameOver() {
    return this.state.winner != null || this.state.boardFull
  }

  handleClick(index) {   
    
    if(!this.gameOver() && this.columnCanBePlayed(index)) {
      const cells = this.state.cells.slice();
      const column = cells[index].slice();

      this.calculateColumnPosition(column);
  
      cells[index] = column

      this.setState({
        cells: cells
      })

      this.checkIfWinner(cells)   
      this.checkBoardSpaces(cells)   
    }
  } 

  render() {
    const winner = this.state.winner
    const player = this.player()
    const over = this.gameOver() ? 'game-over' : null

    const columns = this.state.cells.map((values, index)=>
      <Column values={ values } column={ index } player={ player } onClick={() => this.handleClick(index)} key={ 'column' + index }/>
    );

    return (
      <div className={ "game-board "+ over }>
        <div className="board">
          { columns }
        </div>
        <Status player={ player } over={ over } winner={ winner }></Status>
      </div>
    )
  }
}