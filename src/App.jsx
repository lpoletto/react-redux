import React, {useEffect, useState} from 'react';
import Pokemones from './Components/Pokemones';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import {auth } from './firebase';
import Perfil from './Components/Perfil';


function App() {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })

    }

    fetchUser();

  }, [])

  const RutaProtegida = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')) {
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'));

      // Si es igual al usuario de la bbdd
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path = {path} {...rest}/>
      } else {
        return <Redirect to="/login" {...rest} />
      }

    } else {
      return <Redirect to="/login" {...rest} />
    }
  }
  // Si el usaurio existe, renderizamos sino mostramos mensaje de cargando
  return firebaseUser !== false ? (
      <BrowserRouter>
        <div className="container mt-3">
          
          <Navbar />
          
          <Switch>
            <RutaProtegida component={Pokemones} path="/" exact />
            <RutaProtegida component={Perfil} path="/perfil" exact />
            <Route component={Login} path="/login" exact />
          </Switch>
        </div>
      </BrowserRouter>
  ) : (<div>Cargando...</div>)
}

export default App;
