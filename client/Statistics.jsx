import React from 'react';

const Statistics = (props) => {

  const total = props.statistics['Met'] + props.statistics['Not Met'] + props.statistics['In Progress']

  return (
    <>
    <tr>
      <th style={{border: '1px black solid', backgroundColor: 'green'}}>Met</th>
      <th style={{border: '1px black solid', backgroundColor: 'yellow'}}>In Progress</th>
      <th style={{border: '1px black solid', backgroundColor: 'red'}}>Not Met</th>
    </tr>
    <tr>
      <td style={{border: '1px black solid'}}>{props.statistics['Met']}</td>
      <td style={{border: '1px black solid'}}>{props.statistics['In Progress']}</td>
      <td style={{border: '1px black solid'}}>{props.statistics['Not Met']}</td>
    </tr>
    <tr>
      <td style={{border: '1px black solid'}}>{`${100 * (props.statistics['Met'] / total)}%`}</td>
      <td style={{border: '1px black solid'}}>{`${100 * (props.statistics['In Progress'] / total)}%`}</td>
      <td style={{border: '1px black solid'}}>{`${100 * (props.statistics['Not Met'] / total)}%`}</td>
    </tr>
    </>
  )
}

export default Statistics;