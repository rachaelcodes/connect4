import React from 'react';

export default function Cell(props) {
  return (
    <div className={ "cell cell-" + props.value }>
    </div>
  )
}