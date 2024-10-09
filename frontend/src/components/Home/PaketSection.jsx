import React from 'react';
import Paket1 from './paket/paket1.jsx';
import Paket2 from './paket/paket2.jsx';
import Paket3 from './paket/paket3.jsx';

const PaketSection = () => {
 
  return (
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center font-bold p-2  pb-4 text-3xl'>
          <h1>Paket Ujian</h1>
        </div>
        <Paket1 />
        <Paket2 />
        <Paket3 />
      </div>
  )
}

export default PaketSection