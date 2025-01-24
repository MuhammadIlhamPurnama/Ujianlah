import React, { useContext, useEffect, useState } from 'react';
import Paket1 from './paket/Paket1.jsx'
import Paket2 from './paket/Paket2.jsx'
import Paket3 from './paket/Paket3.jsx';
import Contacts from '../Home/Contacts.jsx';
import menuIcon from '../../icons/menu.svg'
import Modal from '../Modal.jsx';
import { QuestionContext } from '../../data/questions.jsx';
import { useDispatch } from 'react-redux';
import {fetchUserData} from "../../store/slices/userSlice.js"
import Sidebar from '../global/Sidebar.jsx';
import Menu from '../global/Menu.jsx';
import Cart from '../global/Cart.jsx';

const Dashboard = () => {
  const [userData, setUserData] = useState([])
  const modalData = useContext(QuestionContext).modalData;
  const [keranjangOpened,setKeranjangOpened] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleUpdateData()
  }, [])

  const handleUpdateData = () => {
    dispatch(fetchUserData())
    .unwrap()
    .then((data) => {
      setUserData(data);
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  

  if (modalData.modal || keranjangOpened) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }

  function handleMenu() {
    const menuLayer = document.getElementById('menu-layer');

    menuLayer.style.transform = 'translateX(0)';
  }

  return (
    <div className='flex'>
      {modalData.modal && <Modal handleUpdateData={handleUpdateData}/>}
      <Sidebar userData={userData} setKeranjangOpened={setKeranjangOpened}/>
      
      <div className=' w-full min-[625px]:p-11 p-4 relative
       overflow-hidden'>
        <div className='min-[625px]:ml-64'>
          <div className='flex justify-between border-b-2'>
            <div>
              <h2 className='font-bold text-xl'>Produk Ujian</h2>
              <p className='pb-4'>Paket Ujian yang bisa kamu ambil</p>
            </div>
            <div className='min-[625px]:hidden p-2 py-4'>
              <img className='h-6 cursor-pointer' src={menuIcon} alt="menu" onClick={handleMenu} />
            </div>
          </div>
          <div className=''>
            <Paket1 />
            <Paket2 />
            <Paket3 />
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