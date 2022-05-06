import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate()

    const { id, nombre, email, telefono, empresa, notas } = cliente

    return (
        <tr className='border-b hover:bg-gray-50 text-center'>
            <td className='p-3'>{id}</td>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <span className='block'><span className='text-gray-800 uppercase font-bold'>Email:</span>&nbsp;{email}</span>
                <span className='block'><span className='text-gray-800 uppercase font-bold'>Teléfono:</span>&nbsp;{telefono ? telefono : '-'}</span>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button
                    onClick={() => navigate(`/clientes/${id}`)}
                    className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white uppercase p-2 font-bold text-xs'
                    type="button">
                    Ver
                </button>
                <button
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                    className='mt-3 bg-blue-600 hover:bg-blue-700 block w-full text-white uppercase p-2 font-bold text-xs'
                    type="button">
                    Editar
                </button>
                <button
                onClick={() => handleEliminar(id)}
                    className='mt-3 bg-red-600 hover:bg-red-700 block w-full text-white uppercase p-2 font-bold text-xs'
                    type="button">
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Cliente