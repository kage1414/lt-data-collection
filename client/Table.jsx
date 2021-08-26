import React, { useState } from 'react';
import Row from './Row.jsx';
import Statistics from './Statistics.jsx';

const Table = (props) => {

  let headers = props.table.cols;
  let body = props.table.rows;


  return (
    <>
    <button onClick={() => {
      props.exportTable();
    }}>Export</button>
    <table id={'dataTable'}>
      <thead>
        <Statistics statistics={props.statistics}/>
        <tr>
          {headers.map((header, idx) => {
            return <th key={JSON.stringify(props.convertIdxToLetter(idx) + idx)} style={{border: '1px solid black', backgoundColor: '#c7c7c7', padding: '10px'}}>{header.id}</th>
          })}
        </tr>
        <tr>
        {headers.map((header, idx) => {
          let value;
          if (header) {
            value = header.label;
          } else {
            value = '-';
          }
          return <th key={JSON.stringify(value + header + idx)} style={{border: '1px solid black', padding: '10px'}}>{value}</th>
        })
        }
        </tr>
      </thead>
      <tbody>
        {body.map((row, idx) => {
          return <Row
          key={JSON.stringify(row + idx)}
          idx={idx}
          row={row}></Row>
        })}
      </tbody>
    </table>
    </>
  )

}

export default Table;