import React, { useState, useEffect } from 'react';
import IconCloseModal from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ({
  setModal, 
  animarModal, 
  setAnimarModal, 
  obtenerGasto, 
  gastoEditar, 
  setGastoEditar}) => {

  const [ mensaje, setMensaje ] = useState('')

  const [ nombreGasto, setNombreGasto ] = useState('');
  const [ cantidadGasto, setCantidadGasto ] = useState('');
  const [ categoria, setCategoria ] = useState('');
  const [ id, setId ] = useState('');
  const [ fecha, setFecha ] = useState('');

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ){
      setNombreGasto(gastoEditar.nombreGasto);
      setCantidadGasto(gastoEditar.cantidadGasto);
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha)
    }
  }, [gastoEditar])
  

  const handleCloseModal = () => {
    setAnimarModal(false);
    setGastoEditar({})

    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombreGasto, cantidadGasto, categoria].includes('')){
      setMensaje('Todos los componentes son obligatorios')
      return;
    }

    obtenerGasto({nombreGasto, cantidadGasto, categoria, id, fecha});
    setGastoEditar({})
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={IconCloseModal} alt='Icono de cerrar modal' onClick={handleCloseModal} />
      </div>

      <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} onSubmit={handleSubmit}>
        <legend>{gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo gasto'}</legend>
        {
          mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>
        }

        <div className='campo'>
          <label htmlFor='nombre-gasto'>Nombre del gasto</label>

          <input 
            id='nombre-gasto'
            type='text'
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
            placeholder='Añade el nombre del gasto'
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>

          <input 
            id='cantidad'
            type='number'
            value={cantidadGasto}
            onChange={(e) => setCantidadGasto(Number(e.target.value))}
            placeholder='Añade la cantidad del gasto: ej. 300'
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>

          <select 
            id='categoria'
            value={categoria}
            onChange={ (e) => setCategoria(e.target.value)}
          >
            <option value=''>--Seleccione</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='salud'>Salud</option>
            <option value='gastos'>Gastos Varios</option>
            <option value='ocio'>Ocio</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input 
          type='submit'
          value={gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto'}
        />

      </form>
    </div>
  )
}

export default Modal