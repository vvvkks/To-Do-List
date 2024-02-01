import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppWithReducers from "./AppWithReducers";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<AppWithReducers />);
reportWebVitals();
