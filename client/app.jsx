import React, { useState, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import DataForm from './DataForm.jsx';

const App = () => {

  let [spreadsheetUrl, setSpreadsheetUrl] = useState('');

  let handleSubmit = () => {

  }

  return (
    <div>
      <span>{'LT Data Collection'}</span>
      <DataForm handleSubmit={handleSubmit}/>
    </div>
  )
}

export default App;
