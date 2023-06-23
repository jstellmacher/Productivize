import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { AppProvider } from './context/AppC.js';
import './index.css';

// Import the UsersProvider
// import styles from "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <AppProvider> 
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
