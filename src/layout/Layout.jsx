import { Outlet, Link, useLocation, NavLink } from 'react-router-dom'

const Layout = () => {

  const location = useLocation()
  const urlActual = location.pathname

  return (
    <div className='md:flex md:min-h-screen'>
      {/* Barra Lateral */}
      <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

        <nav className='mt-10'>
          <Link
            className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'}  text-2xl block mt-2 hover:text-blue-300`}
            to='/clientes'>
            Clientes
          </Link>
          <NavLink
            className={({ isActive }) => `${isActive ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
            to='/clientes/nuevo'>
            Nuevo Cliente
          </NavLink>
        </nav>
      </div>

      <div className='md:w-3/4 p-10 md:h-screen md:overflow-y-scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout