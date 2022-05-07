import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {

  const { id } = useParams() // id en la ruta
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClienteAPI = async (id) => {

      try {
        const url = `${import.meta.env.VITE_API_URL}${id}`
        const response = await fetch(url)
        const result = await response.json()

        setCliente(result)

      } catch (err) {
        console.log(err)
      }

      setCargando(!cargando)
    }

    obtenerClienteAPI(id)

  }, [])

  return (
    <>
      <h1 className='font-black text-blue-900 text-4xl'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar los datos del cliente</p>

      {
        !cargando ? (
          cliente.id ? (
            <Formulario cliente={cliente} />
          )
          :
          <p>Cliente ID no válido</p>
        )
          :
          <Spinner />
      }

    </>
  )
}

export default EditarCliente