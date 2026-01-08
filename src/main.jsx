import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Changed to lowercase 'a' to match your filename 'app.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);