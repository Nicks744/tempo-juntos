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

// Registra o service worker para tornar o site instalável (PWA) e funcionar offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    navigator.serviceWorker.register(swUrl).catch((erro) => {
      console.warn('Falha ao registrar o service worker:', erro);
    });
  });
}
