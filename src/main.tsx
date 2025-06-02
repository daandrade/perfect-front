import React from 'react';
import './index.css'; // esta linha deve estar no topo
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);