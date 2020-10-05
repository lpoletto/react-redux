/*****************TIENDA*************************
 * Todos los estados para que sean disponibles por nuesta app
 * Store lee todo lo que hay en pokeDucks
 * Siempre en el store hay que llamar al reducer
 */

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import pokeReducer from './pokeDucks';

const rootReducer = combineReducers({
    //usuarios : usuariosReducer,
    pokemones : pokeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) );
    return store; 
};