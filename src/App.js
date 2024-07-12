import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Reg from './components/Auth/Registration';

import './App.css';
import './assets/css/global.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/reg' element={<Reg />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}