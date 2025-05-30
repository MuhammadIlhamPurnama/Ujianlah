import React, { useState } from 'react'
import ujianlahLogo from '../images/Ujianlah.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../store/slices/authSlice'

const Signup = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nama:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
   
  }

  const handleSignup = (e) => {
      e.preventDefault();
      dispatch(register(formData))
  }


  return (
    <div>
      <div className=' mx-auto max-w-[480px] flex flex-col gap-8 items-center py-10 min-[460px]:py-16'>
        <div className='text-center'>
          <img className='h-40' src={ujianlahLogo} alt="ujianlah-logo" />
          <p className='font-bold text-lg'>Daftar Akun</p>
        </div>
        <div className='min-[480px]:shadow-lg w-full rounded-md p-6 flex flex-col gap-5'>
          <div>
            <p className='font-semibold'>Nama <span className='text-red-500'>*</span></p>
            <input className='w-full border rounded-sm mt-2 p-2 outline-none' name='nama' onChange={handleChange} value={formData.nama} placeholder='Nama Lengkap' type="text" />
          </div>
          <div>
            <p className='font-semibold'>Email <span className='text-red-500'>*</span></p>
            <input className='w-full border rounded-sm mt-2 p-2 outline-none' name='email' onChange={handleChange} value={formData.email} placeholder='Email' type="email" />
          </div>
          <div>
            <p className='font-semibold'>Password <span className='text-red-500'>*</span></p>
            <input className='w-full border rounded-sm mt-2 p-2 outline-none' name='password' onChange={handleChange} value={formData.password} placeholder='Password' type="password" />
          </div>
          <div>
            <button className='w-full p-2 bg-[#35b486] rounded-full mt-5 text-white font-bold' onClick={handleSignup}>Daftar Akun</button>
          </div>
          <div className='text-center'>
            <p>Sudah memiliki akun? <span className='text-[#35b486]'><Link to={'/login'}>Masuk</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup