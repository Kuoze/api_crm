import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

    const { id } = useParams() // id en la ruta
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const obtenerClienteAPI = async (id) => {

            try {
                const url = `http://localhost:4000/clientes/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setCliente(result)

            } catch (err) {
                console.log(err)
            }

            setCargando(!cargando)
            // setTimeout(() => {
            //     setCargando(!cargando)
            // }, 3000)
        }

        obtenerClienteAPI(id)

    }, [])

    return (
        <>
            {  
                cargando ? 
                   <Spinner />
                : 
                (
                    Object.keys(cliente).length === 0 
                        ? <p>El cliente con ID {id} no existe</p>
                        :
                        <>
                            <h1 className='font-black text-blue-900 text-4xl'>Ver Cliente: {cliente.nombre}</h1>
                            <p className='mt-3'>Información del cliente</p>

                            <p className='mt-5 text-2xl text-gray-600'>
                                <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                                {cliente.nombre}
                            </p>
                            <p className='text-2xl text-gray-600'>
                                <span className='text-gray-800 uppercase font-bold'>Email: </span>
                                {cliente.email}
                            </p>
                            {cliente.telefono &&
                                <p className='text-2xl text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
                                    {cliente.telefono}
                                </p>
                            }

                            <p className='text-2xl text-gray-600'>
                                <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                                {cliente.empresa}
                            </p>
                            {cliente.notas &&
                                <p className='text-2xl text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                                    {cliente.notas}
                                </p>
                            }
                        </>
                )
            }
        </>
    )
}

export default VerCliente