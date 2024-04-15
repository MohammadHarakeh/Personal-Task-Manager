import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Authentication from "./componenets/Authentication/Authentication";
import Homepage from "./componenets/Homepage/Homepage";
import "./index.css";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
