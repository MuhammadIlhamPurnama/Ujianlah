import React from 'react'
import demoImage from '../../images/demo.webp'
import { Link } from 'react-router-dom'

const DemoSection = () => {
  return (
    <div className='py-24 px-3 md:px-24 flex flex-col md:flex-row gap-4' id='demo-section'>
      <div>
        <img src={demoImage} alt="" />
      </div>
      <div className='flex flex-col gap-4 justify-center items-center max-w-[500px] text-center md:text-start md:items-start mx-auto'>
        <h2 className='font-bold text-3xl'>Coba Sekarang!</h2>
        <p className='text-gray-500 text-xl'>Dengan simulasi ujian asli, dapatkan pengalaman belajar yang lebih mudah dan efektif, lengkap dengan soal dan pembahasan.</p>
        <button className='bg-green-600 text-white font-bold rounded-md p-2 px-10'><Link to={localStorage.getItem('auth-token')?'/platform':'/login'}>Cari Ujian</Link></button>
      </div>
    </div>
  )
}

export default DemoSection