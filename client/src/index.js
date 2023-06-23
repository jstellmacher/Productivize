import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { UsersProvider } from './context/Users'; // Import the UsersProvider
// import styles from "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider> {/* Wrap your App component with the UsersProvider */}
      <App />
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
