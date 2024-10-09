import React, { useState } from 'react'
import ujianlahLogo from '../images/Ujianlah.png'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
    
  }

  const handleLogin = async () => {

    let responseData ;
    await fetch("http://localhost:4000/login", {
      method:"POST",
      headers: {
        Accept:'application/form-data',
        'Content-Type':"application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)

    if(responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/platform');
    } else {
      alert(responseData.errors)
    }
  }

  return (
    <div>
      <div className=' mx-auto max-w-[480px] flex flex-col gap-8 items-center py-10 min-[460px]:py-16'>
        <div className='text-center'>
          <img className='h-40' src={ujianlahLogo} alt="ujianlah-logo" />
          <p className='font-bold text-lg'>Masuk ke akun Kamu</p>
        </div>
        <div className='min-[480px]:shadow-lg w-full rounded-md p-6 flex flex-col gap-5'>
          <div>
            <p className='font-semibold'>Email</p>
            <input className='w-full border rounded-sm mt-2 p-2 outline-none' name='email' onChange={handleChange} value={formData.email} placeholder='Email' type="email" />
          </div>
          <div>
            <p className='font-semibold'>Password</p>
            <input className='w-full border rounded-sm mt-2 p-2 outline-none' name='password' onChange={handleChange} value={formData.password} placeholder='password' type="password" />
          </div>
          <div>
            <button className='w-full p-2 bg-[#35b486] rounded-full mt-5 text-white font-bold' onClick={handleLogin}>Masuk</button>
          </div>
          <div className='text-center'>
            <p>Belum memiliki akun? <span className='text-[#35b486]'><Link to={'/signup'}>Daftar</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login