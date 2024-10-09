import React from 'react'
import instagram from '../../icons/instagram.png'
import tiktok from '../../icons/tiktok.png'
import whatsapp from '../../icons/whatsapp.png'

const Footer = () => {
  return (
    <div className='p-3 md:px-24 bg-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center'>
      <div className='text-center sm:text-start'>
        <p>team@cobaujian.com</p>
        <p>(+62) 821-2575-1725</p>
        <p className='font-semibold'>2023 CobaUjian.com. All rights reserved</p>
      </div>
      <div className='flex gap-5'>
        <div className='bg-gray-400 p-2 rounded-full cursor-pointer'>
          <img className='h-6' src={instagram} alt="" />
        </div>
        <div className='bg-gray-400 p-2 rounded-full cursor-pointer'>
          <img className='h-6' src={tiktok} alt="" />
        </div>
        <div className='bg-gray-400 p-2 rounded-full cursor-pointer'>
          <img className='h-6' src={whatsapp} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer