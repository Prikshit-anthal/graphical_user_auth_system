import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css';
//index css upr rakho yeh bhi matter krra hai
 import 'antd/dist/antd.css'
import App from './App';


ReactDOM.render( 
  <Router>
    <App />
    </Router>
  ,
  document.getElementById('root')
);

