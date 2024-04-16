import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Authentication from "./componenets/Authentication/Authentication";
import Homepage from "./componenets/Homepage/Homepage";
import BoardCard from "./componenets/BoardCard/BoardCard";
import "./index.css";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/board" element={<BoardCard />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
