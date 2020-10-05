import {auth, firebase} from '../firebase';


// data incial
const dataInicial = {
    loading : false, // para desactivar botones si el usuario se esta logueando
    activo : false // para saber si el usuario esta activo
}


// types
const LOADING = 'LOADING';
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'

// reducer
export default function usuarioReducer (state = dataInicial, action) {
    switch(action.type){
        case LOADING:
            return {...state, loading : true};
        case USUARIO_ERROR:
            return {...dataInicial};
        case USUARIO_EXITO:
            return {...state, loading : false}
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
        console.log(res);

        dispatch({
            type : USUARIO_EXITO,
            payload : res
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type : USUARIO_ERROR
        })
    }
}