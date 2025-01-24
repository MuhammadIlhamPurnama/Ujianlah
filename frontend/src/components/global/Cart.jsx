import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeFromCart, toPayment } from '../../store/slices/userSlice';

const Cart = ({userData, setKeranjangOpened, handleUpdateData}) => {
  const dispatch = useDispatch();
  let totalHargaKeranjang = 0;

  function handleClose() {
    const cartLayer = document.getElementById('cart-layer');
    const cartOverlay = document.getElementById('cart-overlay');

    cartLayer.style.transform = 'translateX(1000px)';
    cartOverlay.style.transform = 'translateX(1500px)';
    setKeranjangOpened(false)

  }

  const handleRemoveFromCart = (ujian) => {
    dispatch(removeFromCart(ujian))
      .unwrap()
      .then((data) => {
        alert(data.message);
        handleUpdateData();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const handlePembayaran = () => {
    dispatch(toPayment())
      .unwrap()
      .then((data) => {
        alert(data.message);
        handleUpdateData();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <div className='fixed top-0 right-0 bottom-0 left-0 h-[100vh] w-[100vw] bg-gray-600/40 z-[10000] flex items-center translate-x-[1500px]' onClick={handleClose} id='cart-overlay'>
        </div>
        <div className='fixed bg-white top-0 right-0 bottom-0 border max-w-[900px] py-10 px-3 md:px-10 w-full translate-x-[1000px] duration-700 z-[10000] overflow-y-scroll' id='cart-layer'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1'>
                <h1 className='font-bold text-2xl'>Keranjang Belanja ({userData?.keranjang?.length} Ujian)</h1>
              </div>
              <div className='h-8 w-8 flex items-center justify-center bg-gray-200 rounded-md p-5 cursor-pointer' onClick={handleClose}>
                <p className='font-bold text-2xl'>X</p>
              </div>
            </div>
            
            <div className='flex flex-col gap-2'>
              {userData?.keranjang?.map((ujian) => {
              
                totalHargaKeranjang += ujian.harga;

                
               return <div key={ujian.ujianId} className='flex flex-col md:flex-row border p-2 rounded-md'>
                  <div className='flex-1'>
                    <p className='font-semibold'>{ujian.Title}</p>
                   
                    <p className='font-bold'>{ujian.type}</p>
                    
                  </div>
                  <div className='flex-1 flex justify-between items-center'>
                    <div className='flex gap-4'>
                      <p className='font-bold'>Rp. {ujian.harga.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <p className='font-semibold hover:underline cursor-pointer' onClick={() => {handleRemoveFromCart(ujian)}}>Delete</p>
                    </div>
                  </div>
                </div>
              })}
            </div>

            <div className='border p-4 rounded-md'>
              <div>
                <p className='font-bold text-lg'>Ringkasan Belanja</p>
              </div>
              <div className='flex justify-between'>
                <p className='font-semibold '>Total</p>
                <p className='font-bold'>Rp. {totalHargaKeranjang.toLocaleString('id-ID')}</p>
              </div>

              {userData?.keranjang?.length > 0 && 
              <div className='flex justify-center'>
                <button className='bg-[#35b486] p-2 mt-6 text-white font-bold w-full max-w-[300px] rounded-full' onClick={handlePembayaran} >Process</button>
              </div>
              }
            </div>
          </div>
        </div>
    </>
    
  )
}

export default Cart