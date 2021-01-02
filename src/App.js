import { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Single from "./Pages/Single";

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
