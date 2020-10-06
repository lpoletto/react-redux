import {auth, firebase} from '../firebase';


// data incial
const dataInicial = {
    loading : false, // para desactivar botones si el usuario se esta logueando
    activo : false // para saber si el usuario esta activo
}


// types
const LOADING = 'LOADING';
const USUARIO_ERROR = 'USUARIO_ERROR';
const USUARIO_EXITO = 'USUARIO_EXITO';
const CERRAR_SESION = 'CERRAR_SESION';

// reducer
export default function usuarioReducer (state = dataInicial, action) {
    switch(action.type){
        case LOADING:
            return {...state, loading : true};
        case USUARIO_ERROR:
            return {...dataInicial};
        case USUARIO_EXITO:
<<<<<<< HEAD
            return {...state, loading : false, user : action.payload, activo: true};
        case CERRAR_SESION:
            return{...dataInicial};
=======
            return {...state, loading : false, user : action.payload}
>>>>>>> 147aaf0e536b32a7af35d39c1f8bde4866f08f8a
        default:
            return {...state};
    }
}


// action
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type : LOADING
    })

    try {
        // Acceso con Google
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);

        dispatch({
            type : USUARIO_EXITO,
            payload : {
                uid : res.user.uid,
                email : res.user.email
            }
        })

        // Guardamos en Local Storage
        localStorage.setItem('usuario',JSON.stringify({
            uid : res.user.uid,
            email : res.user.email
        }));
<<<<<<< HEAD

=======
        
>>>>>>> 147aaf0e536b32a7af35d39c1f8bde4866f08f8a
    } catch (error) {
        console.log(error);
        dispatch({
            type : USUARIO_ERROR
        })
    }
}

// Se ejecutará cuando nosotros carguemos nuestro sitio
export const leerUsuarioActivoAccion = () => (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type : USUARIO_EXITO,
            payload : JSON.parse(localStorage.getItem('usuario'))
        })
    }
}


export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut(); // Cierra sesiones de Google (firebase)

    // Eliminamos el usuario del local storage
    localStorage.removeItem('usuario');

    dispatch({
        type: CERRAR_SESION
    })
}