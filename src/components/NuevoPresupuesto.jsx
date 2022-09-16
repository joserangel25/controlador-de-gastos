import React, { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setValidBudget }) => {

  const [ mensaje, setMensaje ] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault();
    console.log('presupuesto')
    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto Válido')
      return;
    };
    setMensaje('')
    setValidBudget(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>

      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>
          <input 
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type='submit' value='añadir' />
        {
          mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>
        }
      </form>
    </div>
  )
}

export default NuevoPresupuesto