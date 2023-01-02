import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Redux  
import store from './store'
import { Provider } from 'react-redux'
//React Router 
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter basename='/'>
        <Provider store={store}>
        < App />
        </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
