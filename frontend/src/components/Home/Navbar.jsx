import React, { useContext } from 'react'
import cartIcon from "../../icons/cart.png"
import { Link } from 'react-router-dom';
import { QuestionContext } from '../../data/questions';
import ujianlah from '../../images/Ujianlah-landscape.png'


const Navbar = () => {
  const keranjangData = useContext(QuestionContext).keranjangData;
  const removeFromKeranjang = useContext(QuestionContext).removeFromKeranjang;
  let totalHargaKeranjang = 0 ;

  function handleCart() {
    const cartLayer = document.getElementById('cart-layer');
    
    cartLayer.style.transform = 'translateX(0)';
  }

  function handleClose() {
    const cartLayer = document.getElementById('cart-layer');

    cartLayer.style.transform = 'translateX(1000px)'
  }

  return (
    <div className='w-full shadow-lg flex justify-between p-4 md:px-24 fixed gap-2 bg-white duration-500 z-[10000]'>
      <div className='flex items-center' >
        <img src={ujianlah} className='h-10 cursor-pointer' alt="ujianlah-logo" />
      </div>
      <div className='hidden min-[1000px]:block '>
        <ul className=' flex h-full items-center gap-2 lg:gap-9 font-semibold '>
          <li className='cursor-pointer hover:underline'><a href="#hero-section">Home</a></li>
          <li className='cursor-pointer hover:underline'><a href="#testimoni-section">Testimoni</a></li>
          <li className='hover:underline cursor-pointer'><a href="#faq-section">FAQ</a></li>
          <li className='hover:underline cursor-pointer'><a href="#demo-section">Coba Sekarang</a></li>
        </ul>
      </div>
      
      <div className='flex justify-between gap-3'>
        <div className='flex'>
          <p className='py-2 px-3 border border-green-700 rounded-lg font-semibold text-green-700 cursor-pointer'><Link to={localStorage.getItem('auth-token')?'/platform':'/login'}>{localStorage.getItem('auth-token')?'Dashboard':'Login'}</Link></p>
        </div>
      </div>
      
      
    </div>
  )
}

export default Navbar