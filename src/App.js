import { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Single from "./Pages/Single";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/:id" exact={true}>
          <Single />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
