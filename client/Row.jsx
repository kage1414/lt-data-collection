import React from 'react';

const Row = (props) => {

  return (
    <tr>
      {props.row.c.map((cell, idx) => {

        let style = {border: '1px solid black', padding: '10px'};
        if (cell.color) {
          style['backgroundColor'] = cell.color;
        }
        if (!cell) {
          style['textAlign'] = 'center';
        }
        cell = !cell ? {v: '-'} : cell;

        return <td key={JSON.stringify(cell + idx)} style={style}>{cell.v}</td>
      })}
    </tr>
  )

}

export default Row;