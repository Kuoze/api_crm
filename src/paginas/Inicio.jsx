import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {

      try {
        const url = 'http://localhost:4000/clientes'
        const response = await fetch(url)
        const result = await response.json()
        // Obtenemos lista de clientes
        setClientes(result)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  }, [])

  const handleEliminar = (clienteId) => {

    const eliminarClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${clienteId}`
        const response = await fetch(url, {
          method: 'DELETE'         
        })

        await response.json()       
        
        setClientes(clientes.filter(cliente => cliente.id !== clienteId))
      } catch (error) {
        console.log(error)
      }
    }

    const confirmar = confirm('¿Deseas eliminar este cliente?')
    if(confirmar) {
      eliminarClienteAPI()
    }
  }

  return (
    <>
      <h1 className='font-black text-blue-900 text-4xl'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white rounded overflow-hidden'>
        <thead className='bg-blue-900 text-white'>
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.length > 0 ? (
              <>
                {clientes.map(c => (
                  <Cliente key={`cliente-${c.id}`} cliente={c} handleEliminar={handleEliminar} />
                ))}
              </>
            )
              : (
                <tr>
                  <td colSpan={5} className='text-center'>
                    <span>Sin clientes</span>
                  </td>
                </tr>
                
              )
          }
        </tbody>
      </table>
    </>
  )
}

export default Inicio