import React from 'react';
import Row from './Row.jsx';

const Table = (props) => {

  let headers;
  let body;

  if (props.firstRowIsHeader) {
    headers = props.table.rows[0];
    body = props.table.rows.slice(1);
  } else {
    headers = props.table.rows[0];
    body = props.table.rows;
  }


  return (
    <table>
      <thead>
        <tr>
          {headers.c.map((header, idx) => {
            return <th key={JSON.stringify(props.convertIdxToLetter(idx) + idx)}>{props.convertIdxToLetter(idx)}</th>
          })}
        </tr>
        {props.firstRowIsHeader && <tr>
        {headers.c.map((header, idx) => {
          let value;
          if (header) {
            value = header.v;
          } else {
            value = '-';
          }
          return <th key={JSON.stringify(value + idx)} style={{border: '1px solid black'}}>{value}</th>
        })
        }
        </tr>}
      </thead>
      <tbody>
        {body.filter((row) => {

          let showByTeacher = false;
          let showByClass = false;
          if (row.c[props.teacherIdx] !== null) {
            showByTeacher = row.c[props.teacherIdx].v === props.teacherFilter || props.teacherFilter === 'All';
          }
          if (row.c[props.classIdx] !== null) {
            showByClass = row.c[props.classIdx].v === props.classFilter || props.classFilter === 'All';
          }

          return showByTeacher && showByClass;
        }).map((row, idx) => {
          return <Row key={JSON.stringify(row + idx)} row={row}></Row>
        })}
      </tbody>
    </table>
  )

}

export default Table;