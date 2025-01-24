import React, { useEffect, useState} from 'react';
import Contacts from '../Home/Contacts.jsx';
import menuIcon from '../../icons/menu.svg';
import { useDispatch } from 'react-redux';
import { cancelPayment, fetchUserData, payment } from '../../store/slices/userSlice.js';
import Sidebar from '../global/Sidebar.jsx';
import Cart from '../global/Cart.jsx';
import Menu from '../global/Menu.jsx';

const Dashboard = () => {
  const [userData, setUserData] = useState([])
  const [keranjangOpened,setKeranjangOpened] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleUpdateData();
  },[])

  const handleUpdateData = () => {
    dispatch(fetchUserData())
    .unwrap()
    .then((data) => {
      console.log(data);
      setUserData(data);
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  const handleBayar = (index) => {
      dispatch(payment(index))
        .unwrap()
        .then((data) => {
          alert(data.message)
          handleUpdateData();

        })
        .catch((err) => {
          alert(err.message)
        })
  }

  const handleBatalBayar = (index) => {
      dispatch(cancelPayment(index))
      .unwrap()
      .then((data) => {
        alert(data.message)
        handleUpdateData();
      })
      .catch((err) => {
        alert(err.message)
      })
  }

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

    cartLayer.style.transform = 'translateX(1000px)'
    cartOverlay.style.transform = 'translateX(1500px)';
    setKeranjangOpened(false);
  }

  function handleMenu() {
    const menuLayer = document.getElementById('menu-layer');

    menuLayer.style.transform = 'translateX(0)';
  }

  function handleCloseMenu() {
    const menuLayer = document.getElementById('menu-layer');

    menuLayer.style.transform = 'translateX(1000px)';
  }

  return (
    <div className='flex'>

      <Sidebar userData={userData} setKeranjangOpened={setKeranjangOpened}/>
      
      <div className=' w-full min-[625px]:p-11 p-4 relative h-full'>
        <div className='min-[625px]:ml-64'>
          <div className='flex justify-between'>
            <div>
              <h2 className='font-bold text-xl'>Pembayaran</h2>
              <p className='pb-4'>Riwayat pembayaran saya</p>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center gap-3'>
                <div>
                  <a className='p-2 px-4 font-semibold text-white bg-green-600/80 rounded-md' href="">Refresh</a>
                </div>
                <div className='bg-gray-300 rounded-md p-3 min-[625px]:hidden cursor-pointer' onClick={handleMenu}>
                  <img className='h-5' src={menuIcon} alt="menu" />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-2 py-4 border-t-[1px] flex flex-col gap-3'>
            

            <div>
              <h2 className='font-bold text-xl'>Menunggu Pembayaran</h2>
            </div>

            <div className='flex gap-4 flex-wrap'>
              {userData?.pembayaran?.map((receipt, index) => {
                let totalPembayaran = 0;

                return <div key={index} className='max-w-[280px] w-full'>
                  <div className='shadow-roundBlack rounded-md p-3'>
                    <div className='flex justify-center pb-3 border-b font-bold'>
                      <h2>Detail Pembelian</h2>
                    </div>
                    {receipt.map((ujian) => {
                     totalPembayaran += ujian.harga
                      return <div key={ujian.ujianId} className='py-2'>
                        <p className='font-medium text-sm'>{ujian.Title}</p>
                        <p>Rp. {ujian.harga.toLocaleString('id-ID')}</p>
                      </div>
                    })}
                    <div className='pt-3 flex border-t justify-center font-bold'>
                      <p>Total: Rp. {totalPembayaran.toLocaleString('id-ID')}</p>
                    </div>
                    <div className='py-2'>
                      <button className='bg-[#35b486] mt-3 p-2 rounded-full font-bold text-white w-full' onClick={() => {handleBayar(index)}}>Bayar</button>
                      <button className='text-[#35b486] mt-3 p-2 rounded-full font-bold shadow-roundBlack w-full' onClick={() => {handleBatalBayar(index)}}>
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              })}
            </div>

            <div className='mt-4'>
              <h2 className='font-bold text-xl'>Selesai</h2>
            </div>

            <div className='flex gap-4 flex-wrap'>
              {userData?.historyPembayaran?.map((receipt, index) => {
                let totalPembayaran = 0;

                return <div key={index} className='max-w-[280px] w-full'>
                  <div className='shadow-roundBlack rounded-md p-3'>
                    <div className='flex justify-center pb-3 border-b font-bold'>
                      <h2>Detail Pembelian</h2>
                    </div>
                    {receipt.map((ujian) => {
                     totalPembayaran += ujian.harga
                      return <div key={ujian.ujianId} className='py-2'>
                        <p className='font-medium text-sm'>{ujian.Title}</p>
                        <p>Rp. {ujian.harga.toLocaleString('id-ID')}</p>
                      </div>
                    })}
                    <div className='pt-3 flex border-t justify-center font-bold'>
                      <p>Total: Rp. {totalPembayaran.toLocaleString('id-ID')}</p>
                    </div>
                    
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
        
        <Cart userData={userData} setKeranjangOpened={setKeranjangOpened} handleUpdateData={handleUpdateData}/>
        

        <Menu userData={userData} setKeranjangOpened={setKeranjangOpened}/>
        
      </div>
      <Contacts />

      
    </div>
  )
}

export default Dashboard