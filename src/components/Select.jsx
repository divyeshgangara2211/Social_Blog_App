import React, {useId} from 'react'

function Select({
    options ,
    label ,
    className = '',
    ...props
},ref ) {
    const id = useId() ;

  return (
    <div className='w-full'>
        { label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-gray-300 font-medium'>{label}</label>}
        <select
            {...props}
            id = {id}
            ref = {ref}
            className={`px-3 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full ${className}`}
        >
            { options?.map( (option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select) ;