import React from 'react';
import  ReactDOM  from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

/*Es la vista donde el usuario va a poder interactuar con nuestra pagina*/
const inicio = ReactDOM.createRoot(document.getElementById('root'));

inicio.render(
    <App></App>
);