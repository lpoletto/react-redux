import {auth, firebase, db} from '../firebase';


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
            return {...state, loading : false, user : action.payload, activo: true};
        case CERRAR_SESION:
            return{...dataInicial};
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

        // Info que viene de Google
        // Creamos el objeto usuario 
        const usuario = {
            uid : res.user.uid,
            displayName : res.user.displayName,
            email : res.user.email,
            photoURL : res.user.photoURL
        }

        // Cuando el usuario de logue por 2da vez
        // Preguntamos si existe en firestore
        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get();

        if(usuarioDB.exists){
            // Cuando existe el usuario en Firestore
            dispatch({
                type : USUARIO_EXITO,
                payload : usuarioDB.data() //usuarioDB.data() --> el data() accede al objeto
            })
    
            // Guardamos en Local Storage
            localStorage.setItem('usuario',JSON.stringify(usuarioDB.data()));

        }else{
            //No existe el usuario
            // Guardamos el usuario den la coleccion usuarios de Firestore
            await db.collection('usuarios').doc(usuario.email).set(usuario);
            
            dispatch({
                type : USUARIO_EXITO,
                payload : usuario
            })
    
            // Guardamos en Local Storage
            localStorage.setItem('usuario',JSON.stringify(usuario)); // Primera vez que guardamos el usuario que viene de Google
        }

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

// Interaccón con la bbdd
export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
        type : LOADING
    })

    const {user} = getState().usuario;

    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName : nombreActualizado
        })
        
        const usuarioEditado = {
            ...user,
            displayName : nombreActualizado
        }

        dispatch({
            type : USUARIO_EXITO,
            payload : usuarioEditado
        })

        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error);    
    }
}