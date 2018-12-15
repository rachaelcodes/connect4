import React from 'react';

export default function Status(props) {
  if (props.winner) {
    return (
      <div className={ "status win-" + props.player }>
        Congratulations { props.winner }!
      </div>
    )
  } else if (props.over) {
    return (
      <div className="status">
        game is drawn!
      </div>
    )
  } else {
    return (
      <div className="status">
        { props.player }'s turn
      </div>
    )
  }
}