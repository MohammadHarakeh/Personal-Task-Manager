import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authentication from "./componenets/Authentication/Authentication";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
