import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const testApi = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
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

  return (
    <div>
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
    </div>
  );
}

export default App;
