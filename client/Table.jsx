import React, { useState } from 'react';
import Row from './Row.jsx';
import Statistics from './Statistics.jsx';

const Table = (props) => {

  console.log('table', props)

  let statistics = {
    'Met': 0,
    'In Progress': 0,
    'Not Met': 0
  };

  let headers = props.table.cols;
  let body = props.table.rows;

  let startOfDateRange = new Date(props.startOfDateRange)
  let endOfDateRange = new Date(props.endOfDateRange)
  let startDate = Math.floor(startOfDateRange.getTime() / 86400000)
  let endDate = Math.floor(endOfDateRange.getTime() / 86400000)


  return (
    <>
    <button onClick={() => {
      props.exportTable();
    }}>Export</button>
    <table id={'dataTable'}>
      <thead>
        <Statistics statistics={statistics}/>
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
        {body.filter((row) => {

          let rowDate = new Date(row.c[props.dateIdx].v)
          rowDate = isNaN(rowDate.getTime()) ? false : Math.floor(rowDate.getTime() / 86400000);
          let isWithinDateRange = rowDate >= startDate && rowDate <= endDate;
          let showByTeacher = false;
          let showByClass = false;
          if (row.c[props.teacherIdx] !== null) {
            showByTeacher = row.c[props.teacherIdx].v === props.teacherFilter || props.teacherFilter === 'All';
          }
          if (row.c[props.classIdx] !== null) {
            showByClass = row.c[props.classIdx].v === props.classFilter || props.classFilter === 'All';
          }

          if (showByTeacher && showByClass && isWithinDateRange) {
            let standard = row.c[row.c.length - 1].v;
            statistics[standard]++
          }

          return showByTeacher && showByClass && isWithinDateRange;
        }).map((row, idx) => {
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