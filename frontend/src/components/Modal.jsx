import React, { useContext } from 'react'
import document from '../icons/document.png';
import clock from '../icons/clock.png'
import { QuestionContext } from '../data/questions';


const Modal = () => {
  const modalData = useContext(QuestionContext).modalData;
  const setModalData = useContext(QuestionContext).setModalData;
  const addToKeranjang = useContext(QuestionContext).addToKeranjang;
  
  
  return (
    <>
      <div className='fixed top-0 right-0 bottom-0 left-0 h-[100vh] w-[100vw] bg-gray-600/40 z-[10000] flex items-center' onClick={() => {setModalData({...modalData,modal:!modalData.modal})}}>
      </div>
      <div>
        <div className='fixed max-w-[400px] w-full mx-auto bg-white p-5 rounded-md z-[10001] top-[20%] left-1/2 transform -translate-x-1/2'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-xl'>Detail Ujian</p>
            <button className='p-1 px-3 rounded-md hover:bg-gray-200 font-semibold' onClick={() => {setModalData({...modalData,modal:!modalData.modal})}}>X</button>
          </div>

          <div className='mt-5 flex flex-col items-center text-center gap-4'>
            
              <div>
                <p className='font-semibold text-xl'>{modalData.ujian.Title}</p>
              </div>
              <div>
                <p className='font-bold text-xl'>Rp. 40.000</p>
              </div>
              <div className='w-full'>
                <button className='w-full bg-[#35b486] hover:bg-[#268562] rounded-full p-2 font-bold text-white' 
                onClick={() => {addToKeranjang(modalData.ujian)}}>+ Keranjang</button>
              </div>
              <div className='bg-slate-300 w-full p-3 rounded-lg'>
                  <div className='flex items-center gap-3 mb-1'>
                    <img className='h-4 inlin' src={clock} alt="clock-icon" />
                    <p>Waktu : {modalData.ujian.waktu / 60000} menit</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <img className='h-4' src={document} alt="soal-icon" />
                    <p>Soal : {modalData.ujian.Soal.length} soal</p>
                  </div>
                </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal