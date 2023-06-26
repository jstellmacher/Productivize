import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App.js';
import { AppProvider } from './context/AppC.js';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
        <App />
      </AppProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
