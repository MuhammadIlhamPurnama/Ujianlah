import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import document from '../../../icons/document.png';
import clock from '../../../icons/clock.png';
import done from '../../../icons/done.png';
import { QuestionContext } from '../../../data/questions';
import { Link } from 'react-router-dom';

const Paket1 = () => {
  

  const allSoal = useContext(QuestionContext).allSoal;
  const allSoalLPDP = allSoal.filter((ujian) => ujian.type === 'LPDP' ) ;
  const setModalData = useContext(QuestionContext).setModalData;
  const modalData = useContext(QuestionContext).modalData;
  const ujianSayaData = useContext(QuestionContext).ujianSayaData;

  const responsive = {
    superLargeDesktop: {
      
      breakpoint: { max: 4000, min: 3000 },
      items: 4.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1121 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1121, min: 1018 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 1081, min: 912 },
      items: 2.5
    }, 
    miniMobile : {
      breakpoint: { max: 912, min: 806 },
      items: 2
    }, 
    microMobile : {
      breakpoint: { max: 806, min: 680 },
      items: 1.5
    }, 
    microMobile2 : {
      breakpoint: { max: 680, min: 0 },
      items: 1
    }  

  };

  return (
      <div className='p-3'>
        <div className='mb-5'>
          <h1 className='font-bold text-xl'>LPDP</h1>
        </div>
        <Carousel responsive={responsive} >
          {allSoalLPDP.map((ujian) => {
            const exist = ujianSayaData.some((us) => ujian.ujianId === us.ujianId);

            if (!exist) {
              return <div key={ujian.ujianId} className='border p-4 rounded-md mr-5 flex flex-col gap-3'>
                <div>
                  <button className='bg-orange-400 py-1 px-3 rounded-md text-white font-bold'>LPDP</button>
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
                <div className='mt-2 flex text-center'>
                  <button className='w-full bg-green-600 hover:bg-green-700 duration-500  p-1 rounded-md font-bold text-white' onClick={() => {setModalData({...modalData,ujian:ujian,modal:!modalData.modal})}}>Beli Ujian</button>
                </div>
                
              </div>
            } else {
              return <div key={ujian.ujianId} className='border p-4 rounded-md mr-5 flex flex-col gap-3'>
                <div className='flex justify-between'>
                  <button className='bg-orange-400 py-1 px-3 rounded-md text-white font-bold'>LPDP</button>
                  <button className='px-3 rounded-md text-white font-bold'><img className='h-8' src={done} alt="terbeli" /></button>
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
                <div className='mt-2 flex text-center'>
                  <Link className='w-full' to={`/ujian/${ujian.ujianId}`}>
                    <button className='w-full bg-green-600 hover:bg-green-700 duration-500  p-1 rounded-md font-bold text-white'>Coba Ujian</button>
                  </Link>
                </div>
                
              </div>
            }
            
          })}
          
        </Carousel> 
      </div>
  )
}

export default Paket1