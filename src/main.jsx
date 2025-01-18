import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
//import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//atatus.config('27a67ad99644419c898c09d2d9cdc499').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
serviceWorkerRegistration.register();
