import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/pedido' element={<Home />}></Route>
          <Route path='/menu' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
