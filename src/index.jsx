import React from 'react';
import { render } from 'react-dom';
import App from './App';
import GuestbookProvider from './context/GuestbookProvider';

render(
  <React.StrictMode>
    <GuestbookProvider>
      <App />
    </GuestbookProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
