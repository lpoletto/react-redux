/**
 * Aquí mostraremos el listado de componentes
 */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion, unPokeDetalleAccion} from '../redux/pokeDucks';
import Detalle from './Detalle';

const Pokemones = () => {
    const dispatch = useDispatch();
    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector(store => store.pokemones.previous);
    console.log(pokemones);

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Lista de Pokemones</h3>
                <br/>
                <div className="d-flex justify-content-between">
                    {
                        pokemones.length === 0 && <button className="btn btn-danger" onClick={()=>dispatch(obtenerPokemonesAccion())}> Get Pokemones </button>

                    }

                    {
                        previous &&
                        <button className="btn btn-danger" onClick={()=>dispatch(anteriorPokemonAccion())}> Anterior </button>
                    }

                    {
                        next &&
                        <button className="btn btn-danger" onClick={()=>dispatch(siguientePokemonAccion())}> Siguiente </button>
                    }

                </div>
                <ul className="list-group mt-3">
                    {
                        pokemones.map(item => (
                            <li className="list-group-item text-uppercase" key={item.name}>
                                {item.name}
                                <button 
                                    className="btn btn-warning btn-sm float-right" 
                                    onClick={()=>dispatch(unPokeDetalleAccion(item.url))}
                                >
                                    Info
                                </button>
                            </li>
                        ))
                    }
                </ul>

            </div>
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                <Detalle/>
            </div>        
        </div>
    )
}

export default Pokemones;
