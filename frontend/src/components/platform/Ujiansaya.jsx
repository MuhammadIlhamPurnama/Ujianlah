import React, {useState, useContext} from 'react';
import dashboardImage from '../../icons/dashboard.png';
import testImage from '../../icons/test.png';
import paymentImage from '../../icons/payment.png';
import cartImage from '../../icons/cart.png';
import Contacts from '../Home/Contacts.jsx';
import photoProfile from '../../images/profile.jpg';
import arrowDown from '../../icons/arrow-down.png';
import menuIcon from '../../icons/menu.svg';
import clockIcon from '../../icons/clock.png';
import documentIcon from '../../icons/document.png';
import ujianlah from '../../images/Ujianlah-landscape.png';
import { QuestionContext } from '../../data/questions.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const userData = useContext(QuestionContext).userData;
  const keranjangData = useContext(QuestionContext).keranjangData; 
  const removeFromKeranjang = useContext(QuestionContext).removeFromKeranjang;
  const handlePembayaran = useContext(QuestionContext).handlePembayaran;
  const ujianSayaData = useContext(QuestionContext).ujianSayaData;
  const [keranjangOpened,setKeranjangOpened] = useState(false);
  let totalHargaKeranjang = 0 ; 

  const [openedP1, setOpenedP1] = useState(false);
  const [openedP2, setOpenedP2] = useState(false);
  const [openedP3, setOpenedP3] = useState(false);

  if (keranjangOpened) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }


  function handleCart() {
    const cartLayer = document.getElementById('cart-layer');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartLayer.style.transform = 'translateX(0)';
    cartOverlay.style.transform = 'translateX(0)';
    setKeranjangOpened(true)
  }

  function handleClose() {
    const cartLayer = document.getElementById('cart-layer');
    const cartOverlay = document.getElementById('cart-overlay');

    cartLayer.style.transform = 'translateX(1000px)';
    cartOverlay.style.transform = 'translateX(1500px)';
    setKeranjangOpened(false)
  }

  function handleMenu() {
    const menuLayer = document.getElementById('menu-layer');

    menuLayer.style.transform = 'translateX(0)';
  }

  function handleCloseMenu() {
    const menuLayer = document.getElementById('menu-layer');

    menuLayer.style.transform = 'translateX(1000px)';
  }

  function handlePaket1() {
    const itemCont = document.getElementById(`item-container-1`);
    const paketCont = document.getElementById(`paket-container-1`);
    const paketClicker = document.getElementById(`paket-clicker-1`);
    
    if (openedP1) {
      itemCont.style.maxHeight = '0px';
      paketCont.style.backgroundColor = 'white';
      paketClicker.style.backgroundColor = '#e6f4d0';
      setOpenedP1(false)
    } else {
      itemCont.style.maxHeight = '1000px';
      paketCont.style.backgroundColor = '#e6f4d0';
      paketClicker.style.backgroundColor = 'white';
      setOpenedP1(true)
    }
  }

  function handlePaket2() {
    const itemCont = document.getElementById(`item-container-2`);
    const paketCont = document.getElementById(`paket-container-2`);
    const paketClicker = document.getElementById(`paket-clicker-2`);
    
    if (openedP2) {
      itemCont.style.maxHeight = '0px';
      paketCont.style.backgroundColor = 'white';
      paketClicker.style.backgroundColor = '#e6f4d0';
      setOpenedP2(false)
    } else {
      itemCont.style.maxHeight = '1000px';
      paketCont.style.backgroundColor = '#e6f4d0';
      paketClicker.style.backgroundColor = 'white';
      setOpenedP2(true)
    }
  }

  function handlePaket3() {
    const itemCont = document.getElementById(`item-container-3`);
    const paketCont = document.getElementById(`paket-container-3`);
    const paketClicker = document.getElementById(`paket-clicker-3`);
    
    if (openedP3) {
      itemCont.style.maxHeight = '0px';
      paketCont.style.backgroundColor = 'white';
      paketClicker.style.backgroundColor = '#e6f4d0';
      setOpenedP3(false)
    } else {
      itemCont.style.maxHeight = '1000px';
      paketCont.style.backgroundColor = '#e6f4d0';
      paketClicker.style.backgroundColor = 'white';
      setOpenedP3(true)
    }
  }

  return (
    <div className='flex'>
      <div className='border max-w-64 w-full fixed top-0 bottom-0 left-0 px-2 shadow-xl bg-white hidden min-[625px]:block z-10'>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div className='flex justify-center py-4 border-b-[1px]'>
              <img src={ujianlah} alt="ujianlah-logo" className='h-8' />
            </div>
            <div>
              <a className='p-2 px-4 mt-3 rounded-md hover:bg-slate-200 cursor-pointer flex gap-3' href='/platform'>
                <img className='h-6' src={dashboardImage} alt="dashboard-icon" />
                <h2 className='font-semibold'>Dashboard</h2>
              </a>
              <a className='p-2 px-4 mt-3 rounded-md hover:bg-slate-200 bg-green-500/30 cursor-pointer flex gap-3' href='/platform/ujiansaya'> 
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
                <div className='font-semibold bg-red-500 text-sm px-2 text-center rounded-full text-white'>{keranjangData.length}</div>
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
                  <p className='font-bold text-sm'>{userData.nama}</p>
                  <p className='text-[12px] text-gray-600'>{userData.email}</p>
                </div>

                <div className='p-2'>
                  <button className='font-bold text-red-500 text-xs' onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                </div>
              </div>
            </div>
            <div className='text-center text-gray-600 text-[12px]'>
              &#9400; 2023 cobaujian.com
            </div>
          </div>
        </div>
        
      </div>
      <div className=' w-full min-[625px]:p-11 p-4 relative h-full'>
        <div className='min-[625px]:ml-64'>
          <div className='flex justify-between'>
            <div>
              <h2 className='font-bold text-xl'>Ujian Saya</h2>
              <p className='pb-4'>Kumpulan dan riwayat ujian saya</p>
            </div>
            <div>
              <div className='bg-gray-300 rounded-md p-3 min-[625px]:hidden cursor-pointer' onClick={handleMenu}>
                <img className='h-5' src={menuIcon} alt="menu" />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-md border duration-700 mb-4' id='paket-container-1'>
            <div className='p-3 bg-lime-500/20 rounded-md flex justify-between shadow-lg hover:shadow-xl cursor-pointer duration-700' onClick={() => {handlePaket1()}} id='paket-clicker-1'>
              <div className='flex items-center'>
                <p className='p-2 bg-orange-400 w-[80px] text-center rounded-md font-semibold text-white'>LPDP</p>
              </div>
              <div className='flex items-center'>
                <div className='w-8'>
                  <img className='h-8 w-8' src={arrowDown} alt="arrow-down" />
                </div>
              </div>
            </div>

            <div className='overflow-hidden max-h-0 duration-1000' id='item-container-1'>

              {ujianSayaData.map((ujian) => {
                if (ujian.type === 'LPDP') {

                 return <div className='m-3 bg-white shadow-md rounded-md flex flex-col min-[712px]:flex-row justify-between' key={ujian.ujianId}>
                    <div className='p-3 flex-1'>
                      <div>
                        <p className='font-bold'>{ujian.Title}</p>
                      </div>
                      <div className='flex gap-3 items-center'>
                        <img className='h-5' src={clockIcon} alt="clock-icon" />
                        <p>Waktu: {ujian.waktu / 60000} Menit</p>
                      </div>
                      <div className='flex gap-3 items-center '>
                        <img className='h-5' src={documentIcon} alt="document-icon" />
                        <p>Soal: {ujian.Soal.length} Butir</p>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col justify-center items-center'>
                      <div>Nilai Terakhir</div>
                      <div className='font-bold text-4xl'>{ujian.jawabanBenar} / {ujian.Soal.length}</div>
                    </div>
                    <div className='flex flex-1 flex-col items-center justify-center gap-3 p-3'>
                      
                      <div className='w-full flex text-center'>
                        <Link className='w-full' to={`/ujian/${ujian.ujianId}`}>
                          <button className='bg-green-600/70 w-full py-2 rounded-full font-semibold text-white'>Coba Ujian</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                }
              })}

            </div>

          </div>

          <div className='bg-white rounded-md border duration-700 mb-4' id='paket-container-2'>
            <div className='p-3 bg-lime-500/20 rounded-md flex justify-between shadow-lg hover:shadow-xl cursor-pointer duration-700' onClick={() => {handlePaket2()}} id='paket-clicker-2'>
              <div className='flex items-center'>
                <p className='p-2 bg-[#5fa6f4] w-[80px] text-center rounded-md font-semibold text-white'>BUMN</p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8'>
                  <img className='h-8 w-8' src={arrowDown} alt="arrow-down" />
                </div>
              </div>
            </div>

            <div className='overflow-hidden max-h-0 duration-1000' id='item-container-2'>
              
              {ujianSayaData.map((ujian) => {
                if (ujian.type === 'BUMN') {

                 return <div className='m-3 bg-white shadow-md rounded-md flex flex-col min-[712px]:flex-row justify-between' key={ujian.ujianId}>
                    <div className='p-3 flex-1'>
                      <div>
                        <p className='font-bold'>{ujian.Title}</p>
                      </div>
                      <div className='flex gap-3 items-center'>
                        <img className='h-5' src={clockIcon} alt="clock-icon" />
                        <p>Waktu: {ujian.waktu / 60000} Menit</p>
                      </div>
                      <div className='flex gap-3 items-center '>
                        <img className='h-5' src={documentIcon} alt="document-icon" />
                        <p>Soal: {ujian.Soal.length} Butir</p>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col justify-center items-center'>
                      <div>Nilai Terakhir</div>
                      <div className='font-bold text-4xl'>{ujian.jawabanBenar} / {ujian.Soal.length}</div>
                    </div>
                    <div className='flex flex-1 flex-col items-center justify-center gap-3 p-3'>
                      
                      <div className='w-full flex text-center'>
                        <Link className='w-full' to={`/ujian/${ujian.ujianId}`}>
                          <button className='bg-green-600/70 w-full py-2 rounded-full text-white font-semibold'>Coba Ujian</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                }
              })}
              
            </div>

          </div>

          <div className='bg-white rounded-md border duration-700 mb-4' id='paket-container-3'>
            <div className='p-3 bg-lime-500/20 rounded-md flex justify-between shadow-lg hover:shadow-xl cursor-pointer duration-700' onClick={() => {handlePaket3()}} id='paket-clicker-3'>
              <div className='flex items-center'>
                <p className='p-2 bg-[#f373b4] w-[80px] text-center rounded-md font-semibold text-white'>CPNS</p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8'>
                  <img className='h-8 w-8' src={arrowDown} alt="arrow-down" />
                </div>
              </div>
            </div>

            <div className='overflow-hidden max-h-0 duration-1000' id='item-container-3'>
              
              {ujianSayaData.map((ujian) => {
                if (ujian.type === 'CPNS') {

                 return <div className='m-3 bg-white shadow-md rounded-md flex flex-col min-[712px]:flex-row justify-between' key={ujian.ujianId}>
                    <div className='p-3 flex-1'>
                      <div>
                        <p className='font-bold'>{ujian.Title}</p>
                      </div>
                      <div className='flex gap-3 items-center'>
                        <img className='h-5' src={clockIcon} alt="clock-icon" />
                        <p>Waktu: {ujian.waktu / 60000} Menit</p>
                      </div>
                      <div className='flex gap-3 items-center '>
                        <img className='h-5' src={documentIcon} alt="document-icon" />
                        <p>Soal: {ujian.Soal.length} Butir</p>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col justify-center items-center'>
                      <div>Nilai Terakhir</div>
                      <div className='font-bold text-4xl'>{ujian.jawabanBenar} / {ujian.Soal.length}</div>
                    </div>
                    <div className='flex flex-1 flex-col items-center justify-center gap-3 p-3'>
                      <div className='w-full flex text-center'>
                        <Link className='w-full' to={`/ujian/${ujian.ujianId}`}>
                          <button className='bg-green-600/70 w-full py-2 rounded-full text-white font-semibold'>Coba Ujian</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                }
              })}
              
            </div>

          </div>
        </div>
        
        <div className='fixed top-0 right-0 bottom-0 left-0 h-[100vh] w-[100vw] bg-gray-600/40 z-[10000] flex items-center translate-x-[1500px]' onClick={handleClose} id='cart-overlay'>
        </div>
        <div className='fixed bg-white top-0 right-0 bottom-0 border max-w-[900px] py-10 px-3 md:px-10 w-full translate-x-[1000px] duration-700 z-[10000]' id='cart-layer'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1'>
                <h1 className='font-bold text-2xl'>Keranjang Belanja ({keranjangData.length} Ujian)</h1>
              </div>
              <div className='h-8 w-8 flex items-center justify-center bg-gray-200 rounded-md p-5 cursor-pointer' onClick={handleClose}>
                <p className='font-bold text-2xl'>X</p>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              {keranjangData.map((ujian) => {
                totalHargaKeranjang += ujian.harga
                
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
                      <p className='font-semibold hover:underline cursor-pointer' onClick={() => {removeFromKeranjang(ujian)}}>Delete</p>
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

              {keranjangData.length > 0 && 
              <div className='flex justify-center'>
                <button className='bg-[#35b486] p-2 mt-6 text-white font-bold w-full max-w-[300px] rounded-full' onClick={handlePembayaran} >Process</button>
              </div>
              }
            </div>

          </div>
        </div>

        
        <div className='fixed bg-white top-0 right-0 bottom-0 border max-w-[450px] p-2 w-full translate-x-[1000px] duration-700 z-[1000]' id='menu-layer'>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <div className='flex justify-between p-4 border-b-[1px]'>
                <h1 className='font-bold'>Menu</h1>
                <h1 className='font-bold bg-gray-200 px-2 rounded-md cursor-pointer' onClick={handleCloseMenu}>X</h1>
              </div>
              <div>
                <a className='p-2 px-4 mt-3 rounded-md  hover:bg-slate-200 cursor-pointer flex gap-3' href='/platform'>
                  <img className='h-6' src={dashboardImage} alt="dashboard-icon" />
                  <h2 className='font-semibold'>Dashboard</h2>
                </a>
                <a className='p-2 px-4 mt-3 rounded-md bg-green-500/30 hover:bg-slate-200 cursor-pointer flex gap-3' href='/platform/ujiansaya'> 
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
                    <p className='font-bold text-sm'>{userData.nama}</p>
                    <p className='text-[12px] text-gray-600'>{userData.email}</p>
                  </div>

                  <div className='p-2'>
                    <button className='font-bold text-red-500 text-xs' onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                  </div>
                </div>
              </div>
              <div className='text-center text-gray-600 text-[12px]'>
                &#9400; 2023 cobaujian.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contacts />

      
    </div>
  )
}

export default Dashboard