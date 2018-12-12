import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function Cell(props) {
  return (
    <div className={ "cell cell-" + props.value }>
    </div>
  )
}


function Column (props) {
  const cells = props.values.map((value, index) =>
    <Cell value={ value } key={ 'cell' + props.column + index }/>
  );

  return (
    <div className="column">
      <button className="column-btn" onClick={ props.onClick }>Choose</button>
      { cells }
    </div>
  )
}



class Board extends React.Component {
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
      winner: null
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

  player() {
    return this.state.isRedTurn ? 'red' : 'yellow'
  }

  spacesInColumn(column) {
    return !this.state.cells[column][0]
  }

  handleClick(index) {

    const winningPlayer = this.winner(this.state.cells)
    
    if (winningPlayer) {
        this.setState({
          winner: winningPlayer
        })
      }
      else if(!this.state.winner && this.spacesInColumn(index)) {
      const cells = this.state.cells.slice();
      const column = cells[index].slice();
      const lastPlayed = column.findIndex(cell => cell != null)
  
      if (lastPlayed === -1) {
        column[5] = this.player() 
      }
      else {
        column[lastPlayed-1] = this.player()
      }
  
      cells[index] = column
  
      this.setState({
        isRedTurn: !this.state.isRedTurn,
        cells: cells
      })
    }
  } 

  render() {
    const player = this.state.isRedTurn ? 'Red' : 'Yellow'
    const winner = this.winner(this.state.cells)

    const turnStatus = winner 
      ? 'Winner: ' + winner
      : player + "'s turn"


    const columns = this.state.cells.map((values, index)=>
      <Column values={ values } column={ index } onClick={() => this.handleClick(index)} key={ 'column' + index }/>
    );

    return (
      <div>
          { turnStatus }
        <div className="board">
          { columns }
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        </div>
      </div>
    )
  }
}


ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
