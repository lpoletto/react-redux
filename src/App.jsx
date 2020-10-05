import React from 'react';
import Pokemones from './Components/Pokemones';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from './Components/Login';
import Navbar from './Components/Navbar';

function App() {
  return (
      <BrowserRouter>
        <div className="container mt-3">
          
          <Navbar />
          
          <Switch>
            <Route component={Pokemones} path="/" exact />
            <Route component={Login} path="/login" exact />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
