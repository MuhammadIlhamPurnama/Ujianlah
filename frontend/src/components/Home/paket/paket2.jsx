import React, { useContext } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import clock from '../../../icons/clock.png';
import document from '../../../icons/document.png';
import { QuestionContext } from '../../../data/questions';
import { Link } from 'react-router-dom';

const paket1 = () => {
  const bankSoal = useContext(QuestionContext).bankSoal;
  const bankSoalBUMN = bankSoal.filter((ujian) => ujian.type === 'BUMN');


  const responsive = {
    superLargeDesktop: {
      
      breakpoint: { max: 4000, min: 3000 },
      items: 4.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1050 },
      items: 3.5
    },
    tablet: {
      breakpoint: { max: 1050, min: 930 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 930, min: 520 },
      items: 2
    }, 
    miniMobile : {
      breakpoint: { max: 520, min: 380 },
      items: 1.5
    }, 
    microMobile : {
      breakpoint: { max: 380, min: 0 },
      items: 1
    } 
  };

  return (
    <div className='p-3 md:px-24'>
        <div className='mb-5'>
          <h1 className='font-bold text-xl'>BUMN</h1>
        </div>
        <Carousel responsive={responsive} >
          {bankSoalBUMN.map((ujian) => {
            
              return <div key={ujian.ujianId} className='border p-4 rounded-md mr-5 flex flex-col gap-3'>
              <div>
                <button className='bg-blue-400 py-1 px-3 rounded-md text-white font-bold'>{ujian.type}</button>
              </div>
              <div>
                <h1 className='font-bold text-xl leading-6'>{ujian.Title}</h1>
              </div>
              <div>
                <div className='flex items-center gap-3 mb-1'>
                  <img className='h-4 inlin' src={clock} alt="" />
                  <p>Waktu : {ujian.waktu / 60000} menit</p>
                </div>
                <div className='flex items-center gap-3'>
                  <img className='h-4' src={document} alt="" />
                  <p>Soal : {ujian.Soal.length} soal</p>
                </div>
              </div>
              <div className='mt-2'>
                <Link to={localStorage.getItem('auth-token')?'/platform':'/login'} className='flex w-full'>
                  <button className='w-full bg-green-600 hover:bg-green-700 duration-500 p-1 rounded-md font-bold text-white'>Coba Ujian</button>
                </Link>
              </div>
            </div>

          })}

          
        </Carousel> 
      </div>
  )
}

export default paket1