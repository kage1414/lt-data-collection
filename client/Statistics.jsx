import React from 'react';

const Statistics = (props) => {

  const total = props.statistics['Met'] + props.statistics['Not Met'] + props.statistics['In Progress']
  const percentMet = Math.round(100 * (props.statistics['Met'] / total)) || 0;
  const percentInProgress = Math.round(100 * (props.statistics['In Progress'] / total)) || 0;
  const percentNotMet = Math.round(100 * (props.statistics['Not Met'] / total)) || 0;


  return (
    <>
    <tr>
      <th style={{border: '1px black solid', backgroundColor: 'green'}}>Met</th>
      <th style={{border: '1px black solid', backgroundColor: 'yellow'}}>In Progress</th>
      <th style={{border: '1px black solid', backgroundColor: 'red'}}>Not Met</th>
      <th style={{border: '1px black solid'}}>Total</th>
    </tr>
    <tr>
      <td style={{border: '1px black solid'}}>{props.statistics['Met']}</td>
      <td style={{border: '1px black solid'}}>{props.statistics['In Progress']}</td>
      <td style={{border: '1px black solid'}}>{props.statistics['Not Met']}</td>
      <td style={{border: '1px black solid'}}>{props.statistics['Not Met'] + props.statistics['In Progress'] + props.statistics['Met']}</td>
    </tr>
    <tr>
      <td style={{border: '1px black solid'}}>{`${percentMet}%`}</td>
      <td style={{border: '1px black solid'}}>{`${percentInProgress}%`}</td>
      <td style={{border: '1px black solid'}}>{`${percentNotMet}%`}</td>
      <td style={{border: '1px black solid'}}>{`${percentMet + percentInProgress + percentNotMet}%`}</td>
    </tr>
    </>
  )
}

export default Statistics;