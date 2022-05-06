
const Alerta = ({children, type = 'error'}) => {
  return (
    <div className={ `${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-center my-4 text-white font-bold p-3 uppercase` }>
        {children}
    </div>
  )
}

export default Alerta