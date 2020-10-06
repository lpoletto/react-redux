/**
 * Acciones para consumir la API
 */
import axios from 'axios';

// constantes
const dataInicial = {
    count : 0,
    next : null,
    previous : null,
    results : []
}

// TYPES
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';
const POKE_INFO_EXITO = 'POKE_INFO_EXITO';

// reducer -> acepta la lista de datos y los envia a las constantes
export default function pokeReducer(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return{...state, ...action.payload};
        case SIGUIENTE_POKEMONES_EXITO:
            return{...state, ...action.payload};
        case POKE_INFO_EXITO:
            return{...state, unPokemon : action.payload};
        default:
            return state;
    }
}

// acciones -> consume la api

/**
 * dispatch: activamos el reducer
 * getState: obtenemos la dataInicial
 */
export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch, getState) => {

    if (localStorage.getItem(url)) {
        console.log('datos desde el Local Storage');
        dispatch({
            type : POKE_INFO_EXITO,
            payload : JSON.parse(localStorage.getItem(url))
        })
    } else {
        console.log('datos desde API');
        try {
            const res = await axios.get(url);
            //console.log(res.data);
    
            dispatch({
                type : POKE_INFO_EXITO,
                payload : {
                    nombre : res.data.name,
                    ancho : res.data.weight, 
                    alto : res.data.height,
                    foto :  res.data.sprites.front_default
                }
            })
    
            //Guardamos en local storage
            localStorage.setItem(url, JSON.stringify({
                nombre : res.data.name,
                ancho : res.data.weight, 
                alto : res.data.height,
                foto :  res.data.sprites.front_default

            }))
        } catch (error) {
            console.log(error);
        }
    }

}

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    //console.log('gatState', getState().pokemones.offset); 
    //const offset = getState().pokemones.offset;
    
    // Preguntamos si es necesario hacer la peticion a la API
    if (localStorage.getItem('offset=0')) {
        console.log('datos desde el Local Storage');
        // como ya tenemos la informacion en la data, solo hacemos el dispatch
        dispatch({
            type : OBTENER_POKEMONES_EXITO,
            // transformamos los datos a JSON
            payload :  JSON.parse(localStorage.getItem('offset=0')) // Lista de pokemones en Local Storage
        })
    } else {
        console.log('Datos desde la API');
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`);
            //console.log(res.data);
            dispatch({
                type : OBTENER_POKEMONES_EXITO,
                payload : res.data // Lista de pokemones
            })
    
            // Guardamos en Local Storage en formato String
            // localStorage.setItem(key, JSON.stringify( value ) );
            localStorage.setItem('offset=0', JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    }
}


export const siguientePokemonAccion = () => async (dispatch, getState) => {
    /**********Primera alternativa**********
    // offset siempre debe ser multimo de 20
    const offset = getState().pokemones.offset;
    const siguiente = offset + numero;
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`);
        dispatch({
            type : SIGUIENTE_POKEMONES_EXITO,
            payload : {
                array : res.data.results, // parte desde el 20
                offset : siguiente
            }
        })
    } catch (error) {
        console.log(error);
    }*/

    // 2da Alternativa
    const {next} = getState().pokemones; // destructuración
    
    if (localStorage.getItem(next)){
        console.log('datos desde el Local Storage');

        // como ya tenemos la informacion en la data, solo hacemos el dispatch
        dispatch({
            type : OBTENER_POKEMONES_EXITO,
            // transformamos los datos a JSON
            payload :  JSON.parse(localStorage.getItem(next)) // Lista de pokemones en Local Storage
        })
    } else {
        console.log('Datos de la API');
        try {
            const res = await axios.get(next);
            dispatch({
                type : SIGUIENTE_POKEMONES_EXITO,
                payload : res.data
            })
    
            // Guardamos los datos en Local Storage
            localStorage.setItem(next, JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    }
}


export const anteriorPokemonAccion = () => async (dispatch, getState) => {
    
    const {previous} = getState().pokemones;

    if (localStorage.getItem(previous)){
        console.log('datos desde el Local Storage');

        // como ya tenemos la informacion en la data, solo hacemos el dispatch
        dispatch({
            type : OBTENER_POKEMONES_EXITO,
            // transformamos los datos a JSON
            payload :  JSON.parse(localStorage.getItem(previous)) // Lista de pokemones en Local Storage
        })
    } else {
        console.log('Datos de la API');

        try {
            const res = await axios.get(previous);
            dispatch({
                type : SIGUIENTE_POKEMONES_EXITO,
                payload : res.data
            })

            // Guardamos los datos en Local Storage
            localStorage.setItem(previous, JSON.stringify(res.data));

        } catch (error) {
            console.log(error);
        }
    }

}