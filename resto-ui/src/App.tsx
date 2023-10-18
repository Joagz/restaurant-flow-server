import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import List from "./pages/protected/List";
import Pedidos from "./pages/Pedidos";
import { StompSessionProvider } from "react-stomp-hooks";
import Completed from "./pages/protected/Completed";
import Menus from "./pages/Menus";
import NewMenu from "./pages/protected/NewMenu";

function App() {
  return (
    <StompSessionProvider
      brokerURL={`ws://${process.env.REACT_APP_SERVER_ADDRESS}:8080/gs-resto-app`}
      url={`ws://${process.env.REACT_APP_SERVER_ADDRESS}:8080/gs-resto-app`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/pedidos" element={<Pedidos />}></Route>
          <Route path="/menu" element={<Menus />}></Route>
          <Route path="/secure/list" element={<List />}></Route>
          <Route path="/secure/completed" element={<Completed />}></Route>
          <Route path="/secure/new-menu" element={<NewMenu />}></Route>
        </Routes>
      </BrowserRouter>
    </StompSessionProvider>
  );
}

export default App;
