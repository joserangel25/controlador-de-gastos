import React, { useState, useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto'))?? 0
  );
  const [ isValidBudget, setValidBudget ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);

  const [ gastos, setGastos ] = useState(
    JSON.parse(localStorage.getItem('gastos')) ?? []
  );

  const [ gastoEditar, setGastoEditar] = useState({});

  const [ filtro, setFiltro ] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([]);

  useEffect( () => {
    console.log('filtrando', filtro)
    if(filtro){
      const nuevosGastos = gastos.filter(gasto => gasto.categoria === filtro);
      console.log(nuevosGastos);
      setGastosFiltrados(nuevosGastos);
    }
  }, [filtro] )

  useEffect( () => {
    if( Object.keys(gastoEditar).length > 0 ){
      handleNewSpent()
    }
  }, [gastoEditar] );

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS ){
      setValidBudget(true)
    }
  }, [])
  
  

  const handleNewSpent = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const obtenerGasto = (gasto) => {
    if(gasto.id){
      const gastosActualizados = gastos.map( (gastoState) => gastoState.id === gasto.id ? gasto : gastoState );
      console.log(gastosActualizados)
      setGastos(gastosActualizados)
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }    

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 400);
  }

  const eliminarGasto = (gasto) => {
    const gastosActualizados = gastos.filter( gastoState => gastoState.id !== gasto.id)
    // console.log(gastosActualizados)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header presupuesto={presupuesto} 
              setPresupuesto={setPresupuesto} 
              isValidBudget={isValidBudget}
              setValidBudget={setValidBudget}
              gastos={gastos}
              setGastos={setGastos}
              
              />

      {
        isValidBudget &&
        (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />

              <ListadoGastos 
                gastos={gastos} 
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
                />
              
            </main>

            <div className='nuevo-gasto'>
              <img src={IconoNuevoGasto} alt='Icono nuevo gasto' onClick={handleNewSpent}/>
            </div>
          </>
        )
      }

      {
        modal && <Modal setModal={setModal} 
                        animarModal={animarModal} 
                        setAnimarModal={setAnimarModal}
                        obtenerGasto={obtenerGasto}
                        gastoEditar={gastoEditar}
                        setGastoEditar={setGastoEditar} />
      }
    </div>
  )
}

export default App
