import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {ingresoUsuarioAccion} from '../redux/usuarioDucks';
import {withRouter} from 'react-router-dom';


const Login = (props) => {
    const dispatch = useDispatch();
    const loading = useSelector(store => store.usuario.loading);
    const activo = useSelector(store => store.usuario.activo);
    //console.log(loading);
    
    useEffect( ()=>{
        console.log(activo);
        // Si es verdadero, redireccionamos a la página de inicio
        if(activo){
            props.history.push('/');
        }
    }, [activo, props.history]);
    
    
    return (
        <div className="mt-5 text-center">
            <h3>Ingreso con Google</h3>
            <hr/>
            <button 
                className = "btn btn-dark"
                onClick = { ()=> dispatch(ingresoUsuarioAccion()) }
                disabled = {loading}
            >
                Acceder
            </button>
        </div>
    )
}

export default withRouter(Login)
