
import {BrowserRouter, Routes,  Route } from "react-router-dom"

import Login from './app/containers/Login'
import Restrita from './app/containers/Restrita'
import AppRoutes from './app/AppRoutes'

import './App.css';

function App() {
  
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
