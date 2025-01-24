import React, {useState, useContext, useEffect} from 'react';
import Contacts from '../Home/Contacts.jsx';
import arrowDown from '../../icons/arrow-down.png';
import menuIcon from '../../icons/menu.svg';
import clockIcon from '../../icons/clock.png';
import documentIcon from '../../icons/document.png';
import { QuestionContext } from '../../data/questions.jsx';
import { Link } from 'react-router-dom';
import Sidebar from '../global/Sidebar.jsx';
import { fetchUserData } from '../../store/slices/userSlice.js';
import { useDispatch } from 'react-redux';
import Cart from '../global/Cart.jsx';
import Menu from '../global/Menu.jsx';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [keranjangOpened,setKeranjangOpened] = useState(false);
  const dispatch = useDispatch();

  const [openedP1, setOpenedP1] = useState(false);
  const [openedP2, setOpenedP2] = useState(false);
  const [openedP3, setOpenedP3] = useState(false);

  useEffect(() => {
    handleUpdateData();
  },[])

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

  if (keranjangOpened) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }

  function handleMenu() {
    const menuLayer = document.getElementById('menu-layer');

    menuLayer.style.transform = 'translateX(0)';
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

      <Sidebar userData={userData} setKeranjangOpened={setKeranjangOpened}/>
     
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

              {userData?.ujianSaya?.map((ujian) => {
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
              
              {userData?.ujianSaya?.map((ujian) => {
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
              
              {userData?.ujianSaya?.map((ujian) => {
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
        
        <Cart userData={userData} setKeranjangOpened={setKeranjangOpened} handleUpdateData={handleUpdateData}/>

        <Menu userData={userData} setKeranjangOpened={setKeranjangOpened}/>
      </div>
      <Contacts />

      
    </div>
  )
}

export default Dashboard