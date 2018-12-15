import React from 'react';
import Cell from './cell';

export default function Column (props) {
  const cells = props.values.map((value, index) =>
    <Cell value={ value } key={ 'cell' + props.column + index }/>
  );

  return (
    <div className="column">
      <button className={"column-btn column-btn-" + props.player} onClick={ props.onClick }></button>
      { cells }
    </div>
  )
}