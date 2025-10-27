import React from 'react';
import ReactDOM from 'react-dom/client';  // Alterado de 'react-dom' para 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';

// Criação da raiz do React com createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
