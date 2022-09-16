import React from 'react'
import ControlPresupuest from './ControlPresupuest'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ 
    presupuesto, 
    setPresupuesto, 
    isValidBudget, 
    setValidBudget, 
    gastos,
    setGastos
  }) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {
        !isValidBudget ?
          (
            <NuevoPresupuesto presupuesto={presupuesto} 
                        setPresupuesto={setPresupuesto} 
                        setValidBudget={setValidBudget}
                        />
          )
          :
          (
            <ControlPresupuest presupuesto={presupuesto} 
                               setPresupuesto={setPresupuesto}
                               setValidBudget={setValidBudget}
                               gastos={gastos}
                               setGastos={setGastos}
                               />
          )
      }

      
    </header>
  )
}

export default Header