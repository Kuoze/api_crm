import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({ cliente }) => {

  const navigate = useNavigate()

  // Crear schema del formulario para validar
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El Nombre es muy corto')
      .max(20, 'El nombre es demasiado largo')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
      .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
      .email('Introduce un correo válido')
      .required('El correo es obligatorio'),
    telefono: Yup.number()
      .positive('Tiene que ser un número positivo')
      .integer('Debe ser un número entero')
      .typeError('El número no es válido')
    // notas: '' // Son opcionales
  })

  const handleSubmit = async (data, resetForm) => {
    try {
      let response;

      if (cliente.id) {
        // Editar cliente
        const url = `${import.meta.env.VITE_API_URL}${cliente.id}`

        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })

        
      } else {
        // Nuevo cliente
        const url = import.meta.env.VITE_API_URL

        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })       
      }

      const result = await response.json()
        //console.log(result) // Devuelve el resultado

        // Resetear el formulario
        resetForm()

        navigate('/clientes')

    } catch (error) {
      console.error(error)
    }
  }

  const initialValues = {
    nombre: 'Carles',
    empresa: 'BIM Informàtica',
    email: 'carles@biminformatica.com',
    telefono: '658442410',
    notas: 'Es muy buena persona y gran profesional'
  }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {cliente?.id ? 'Editar' : 'Agregar'} Cliente
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '', // Evalua si cliente.nombre es undefined y retorna cadena vacía en caso afirmativo o el valor de la propiedad ( si no es undefined )
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? ''
        }}
        enableReinitialize={true}
        onSubmit={(data, { resetForm }) => handleSubmit(data, resetForm)}
        validationSchema={nuevoClienteSchema}>

        {({ errors, touched }) => {

          return (
            <Form className='mt-10'>
              <div className='mb-4'>
                <label
                  className='text-gray-800'
                  htmlFor='nombre'>Nombre: </label>
                <Field
                  id='nombre'
                  name='nombre'
                  autoComplete='off'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Nombre del Cliente' />
                {/* <ErrorMessage name='nombre'/> */}
                {
                  errors.nombre && touched.nombre && (
                    <Alerta>{errors.nombre}</Alerta>
                  )
                }
              </div>

              <div className='mb-4'>
                <label
                  className='text-gray-800'
                  htmlFor='empresa'>Empresa: </label>
                <Field
                  id='empresa'
                  name='empresa'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Empresa del Cliente' />
                {
                  errors.empresa && touched.empresa && (
                    <Alerta>{errors.empresa}</Alerta>
                  )
                }
              </div>

              <div className='mb-4'>
                <label
                  className='text-gray-800'
                  htmlFor='email'>Email: </label>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Email del Cliente' />
                {
                  errors.email && touched.email && (
                    <Alerta>{errors.email}</Alerta>
                  )
                }
              </div>

              <div className='mb-4'>
                <label
                  className='text-gray-800'
                  htmlFor='telefono'>Teléfono: </label>
                <Field
                  id='telefono'
                  name='telefono'
                  type='tel'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Teléfono del Cliente' />
                {
                  errors.telefono && touched.telefono && (
                    <Alerta>{errors.telefono}</Alerta>
                  )
                }
              </div>

              <div className='mb-4'>
                <label
                  className='text-gray-800'
                  htmlFor='notas'>Notas: </label>
                <Field
                  as='textarea'
                  id='notas'
                  name='notas'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50 h-40'
                  placeholder='Notas del Cliente' />
              </div>

              <input
                type='submit'
                value={`${cliente?.id ? 'Editar' : 'Agregar'} Cliente`}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' />

            </Form>
          )
        }}

      </Formik>
    </div>
  )
}

Formulario.defaultProps = {
  cliente: {}
}

export default Formulario