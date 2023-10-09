import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import List from "./pages/List";
import Pedidos from "./pages/Pedidos";
import { StompSessionProvider } from "react-stomp-hooks";

function App() {
  return (
    <StompSessionProvider
      brokerURL="ws://localhost:8080/gs-resto-app"
      url="http://localhost:8080/gs-resto-app"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/pedidos" element={<Pedidos />}></Route>
          <Route path="/menu" element={<Home />}></Route>
          <Route path="/listado-pedidos" element={<List />}></Route>
        </Routes>
      </BrowserRouter>
    </StompSessionProvider>
  );
}

export default App;
