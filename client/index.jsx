import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
  <CookiesProvider>
    <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
