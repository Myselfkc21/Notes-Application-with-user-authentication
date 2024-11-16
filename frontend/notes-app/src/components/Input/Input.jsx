import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash } from 'react-icons/fa'
const Input = ({value,onChange,placeholder}) => {
    const [showPassword,setShowPassword] = useState(false)

    const togglePasswordShow=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <div className='flex flex-row border-2 rounded-lg p-3 '>
    <input className='w-full outline-none' value={value} onChange={onChange} type={showPassword?'text':'password'} placeholder={placeholder||'password'}/>
    {showPassword?<FaRegEyeSlash size={22} className='z-10 mx-5' onClick={togglePasswordShow}/>:<FaRegEye size={22} className='z-10 mx-5' onClick={togglePasswordShow}/>}
    </div>

  )
}

export default Input