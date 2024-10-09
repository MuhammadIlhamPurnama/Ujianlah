import React from 'react'
import heroImage from '../../images/hero_image.webp'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='p-24 py-28 px-4 md:px-24 flex gap-3 flex-col md:flex-row' id='hero-section'>
      <div className='w-4/5 md:w-1/2 md:order-last mx-auto'>
        <img className='w-full md:w-[486px]' src={heroImage} alt="hero-image" />
      </div>
      <div className='p-6 md:w-1/2 flex flex-col gap-6 justify-center items-center md:items-start'>
        <div>
          <h1 className='w-full font-bold text-2xl text-center md:text-start'>Uji Diri, Asah Kemampuanmu!</h1>
        </div>
        <div className=''>
          <p className='text-lg text-center md:text-start'>Temukan simulasi ujian berkualitas dan kumpulan soal terlengkap untuk persiapan ujianmu. Ayo, tingkatkan kepercayaan diri dan wujudkan impianmu!</p>
        </div>
        <div>
          <Link to={localStorage.getItem('auth-token')?'/platform':'/login'}>
            <button className='p-2 px-10 rounded-md bg-green-600 font-bold text-white'>Cari Ujian</button>
          </Link>
        </div>
        <div>
          <p className='text-gray-500'>Gabung dengan 2500+ pendaftar lainnya</p>
        </div>
      </div>
    </div>
  )
}

export default Hero