import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Cell extends React.Component {
  render() {
    return (
      <div className="cell">
        {this.props.value}
      </div>
    )
  }
}

class Column extends React.Component {
  render() {
    return (
      <div className="column">
        <button className="column-btn" onClick={this.props.onClick}>Choose</button>
        {/* refactor with iteration! */}
        <Cell value={this.props.values[0]} />
        <Cell value={this.props.values[1]} />
        <Cell value={this.props.values[2]} />
        <Cell value={this.props.values[3]} />
        <Cell value={this.props.values[4]} />
        <Cell value={this.props.values[5]} />
      </div>
    )
  }
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
      isRedTurn: true
    }
  }

  player() {
    return this.state.isRedTurn ? 'R' : 'Y'
  }

  handleClick(i) {
    // Can some of this be brought out into a new function?
    const cells = this.state.cells.slice();

    const column = cells[i].slice();

    const lastPlayed = column.findIndex(cell => cell != null)

    if (lastPlayed === -1) {
      column[5] = this.player() 
    }
    else {
      column[lastPlayed-1] = this.player()
    }

    cells[i] = column

    this.setState({
      isRedTurn: !this.state.isRedTurn,
      cells: cells
    })
  } 

  render() {
    const turnStatus = (this.state.isRedTurn ? 'Red' : 'Yellow') + "'s turn"

    return (
      <div>
          { turnStatus }
        <div className="board">
          {/* refactor with iteration! */}
          <Column values={this.state.cells[0]} onClick={() => this.handleClick(0)} />
          <Column values={this.state.cells[1]} onClick={() => this.handleClick(1)} />
          <Column values={this.state.cells[2]} onClick={() => this.handleClick(2)} />
          <Column values={this.state.cells[3]} onClick={() => this.handleClick(3)} />
          <Column values={this.state.cells[4]} onClick={() => this.handleClick(4)} />
          <Column values={this.state.cells[5]} onClick={() => this.handleClick(5)} />
          <Column values={this.state.cells[6]} onClick={() => this.handleClick(6)} />
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
