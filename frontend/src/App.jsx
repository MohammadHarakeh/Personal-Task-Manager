import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const testApi = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "GET",
      });

      if (!response.ok) {
        console.log("error status: ", response.status);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return <div>test</div>;
}

export default App;
