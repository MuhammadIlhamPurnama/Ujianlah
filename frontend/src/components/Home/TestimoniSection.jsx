import React from 'react'
import profilePic from '../../images/profile.jpg'

const TestimoniSection = () => {
  return (
    <div className=' p-2 py-24 md:p-24' id='testimoni-section'>
      <div className='bg-gray-200 rounded-lg p-4 py-16'>
        <div className='flex flex-col justify-center items-center gap-2 mb-16 text-center'>
          <h2 className='font-bold text-3xl'>Alumni Ujianlah</h2>
          <p>Testimoni dari teman yang sudah mencoba</p>
        </div>
        <div className='flex gap-8 flex-col sm:flex-row'>
          <div className='flex flex-col gap-3'>
            <div className='p-10 bg-white shadow-md rounded-xl text-center relative'>
              <h3 className='font-bold text-xl mb-3'>Paket 99 ribu</h3>
              <p className=''>Paket latihan cuman 99rb yang bikin aku S2 ke London. Thank you CobaUjian</p>
              <div className='bg-white w-8 h-8 rotate-45 absolute  -bottom-4 right-[45.5%]'></div>
            </div>
            <div className='mt-8'>
              <img className='h-16 mx-auto rounded-full' src={profilePic} alt="" />
            </div>
            <div className='text-center '>
              <p className='font-semibold'>Jason</p>
              <p className='text-sm leading-4'>Rekrutmen LPDP</p>
              <p className='text-sm'  >London, Inggris</p>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='p-10 bg-white shadow-md rounded-xl text-center relative'>
              <h3 className='font-bold text-xl mb-3'>Latihan Simulasi Ujian</h3>
              <p className=''>Tes skolastik LPDP ini penting banget, untung udah latihan dan simulasi di CobaUjian. Very helpful</p>
              <div className='bg-white w-8 h-8 rotate-45 absolute  -bottom-4 right-[45.5%]'></div>
            </div>
            
            <div className='mt-8'>
              <img className='h-16 mx-auto rounded-full' src={profilePic} alt="" />
            </div>
            <div className='text-center '>
              <p className='font-semibold'>Mr. Prime</p>
              <p className='text-sm leading-4'>Rekrutmen LPDP</p>
              <p className='text-sm'>Valyrian Freehold, Essos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimoniSection