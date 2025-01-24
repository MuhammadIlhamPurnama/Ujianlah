import React from 'react';
import ujianlah from '../../images/Ujianlah-landscape.png';
import dashboardImage from '../../icons/dashboard.png';
import testImage from '../../icons/test.png';
import paymentImage from '../../icons/payment.png';
import cartImage from '../../icons/cart.png';
import photoProfile from '../../images/profile.jpg';


const Sidebar = ({userData, setKeranjangOpened}) => {
  function handleCart() {
    const cartLayer = document.getElementById('cart-layer');
    const cartOverlay = document.getElementById('cart-overlay');

    
    cartLayer.style.transform = 'translateX(0)';
    cartOverlay.style.transform = 'translateX(0)';
    setKeranjangOpened(true)
  }

  return (
    <div className='border max-w-64 w-full fixed top-0 bottom-0 left-0 px-2 shadow-xl bg-white hidden min-[625px]:block z-10'>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <div className='flex justify-center py-4 border-b-[1px]'>
            <img src={ujianlah} alt="ujianlah-logo" className='h-8' />
          </div>
          <div>
            <a className='p-2 px-4 mt-3 rounded-md bg-green-500/30 hover:bg-slate-200 cursor-pointer flex gap-3' href='/platform'>
              <img className='h-6' src={dashboardImage} alt="dashboard-icon" />
              <h2 className='font-semibold'>Dashboard</h2>
            </a>
            <a className='p-2 px-4 mt-3 rounded-md hover:bg-slate-200 cursor-pointer flex gap-3' href='/platform/ujiansaya'>
              <img className='h-6' src={testImage} alt="test-icon" />
              <h2 className='font-semibold'>Ujian Saya</h2>
            </a>
            <a className='p-2 px-4 mt-3 rounded-md hover:bg-slate-200 cursor-pointer flex gap-3' href='/platform/pembayaran'>
              <img className='h-6' src={paymentImage} alt="payment-icon" />
              <h2 className='font-semibold'>Pembayaran</h2>
            </a>
            <div className='p-2 px-4 mt-3 rounded-md hover:bg-slate-200 cursor-pointer flex gap-3' onClick={handleCart}>
              <img className='h-6' src={cartImage} alt="cart-icon" />
              <h2 className='font-semibold'>Keranjang</h2>
              <div className='font-semibold bg-red-500 text-sm px-2 text-center rounded-full text-white'>{userData?.keranjang?.length}</div>
            </div>
          </div>
        </div>
        <div className='py-2'>
          <div className='border flex rounded-md mb-2'>
            <div className='flex items-center p-2'>
              <img className='h-8 rounded-full' src={photoProfile} alt="photo-profile" />
            </div>
            <div className='leading-4 flex items-center justify-between w-full'>
              <div>
                <p className='font-bold text-sm'>{userData?.nama}</p>
                <p className='text-[12px] text-gray-600'>{userData?.email}</p>
              </div>

              <div className='p-2'>
                <button className='font-bold text-red-500 text-xs' onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
              </div>
            </div>
          </div>
          <div className='text-center text-gray-600 text-[12px]'>
            &#9400; 2023 Ujianlah.com
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Sidebar