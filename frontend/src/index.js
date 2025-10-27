import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Only use StrictMode in development for consistency, but it adds performance overhead
// Remove React.StrictMode wrapper to improve startup performance
root.render(
  <App />
);
