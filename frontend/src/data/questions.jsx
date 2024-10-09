import { createContext, useEffect, useState } from "react";
import BankSoal from './BankSoal.js'


export const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
  
  const bankSoal = BankSoal;
 
  const [modalData, setModalData] = useState({
    modal:false,
  });
  const [userData, setUserData] = useState([]);
  const [keranjangData, setKeranjangData] = useState([]);
  const [pembayaranData, setPembayaranData] = useState([]);
  const [historyPembayaranData,setHistoryPembayaranData] = useState([]);
  const [ujianSayaData, setUjianSayaData] = useState([]);
  const [allSoal, setAllSoal] = useState([]);

  const updateData = () => {
    // allSoal
    fetch('http://localhost:4000/allsoal')
    .then((response) => response.json())
    .then((data) => {setAllSoal(data)});

    //userData
    fetch('http://localhost:4000/getuserdata', {
      method:'GET',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setUserData(data))

    // keranjangData
    fetch('http://localhost:4000/getkeranjangdata', {
      method:'GET',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {setKeranjangData(data)});

    // pembayaranData
    fetch('http://localhost:4000/pembayarandata', {
      method:"GET",
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setPembayaranData(data))

    //  historyPembayaranData
    fetch('http://localhost:4000/historypembayarandata', {
      method:"GET",
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setHistoryPembayaranData(data))

    // ujian saya
    fetch('http://localhost:4000/ujiansayadata', {
      method:"GET",
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {setUjianSayaData(data)})
  }

  useEffect(() => {
    updateData();
  },[])

  const handleBatalBayar = (index) => {
    if(localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/batalbayar', {
        method:'POST',
        headers: {
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({index:index})
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          alert(data.message);
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / daftar terlebih dahulu')
    }
  }

  const handleBayar = (index) => {
    if(localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/bayar', {
        method:'POST',
        headers: {
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({index:index})
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          alert(data.message);
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / daftar terlebih dahulu')
    }
  }

  const handlePembayaran = () => {
    if(localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/pembayaran', {
        method:'POST',
        headers: {
          Acccept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / daftar terlebih dahulu')
    }
  }

  const addToKeranjang = (ujian) => {

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtokeranjang', {
        method:"POST",
        headers: {
          Accept:"application/form-data",
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(ujian)
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.message)
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / Daftar terlebih dahulu')
    }
    updateData();
  }

  const removeFromKeranjang = (ujian) => {
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromkeranjang', {
        method:"POST",
        headers: {
          Accept:"application/form-data",
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(ujian)
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.message)
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / Daftar terlebih dahulu')
    }
    
  }

  return <QuestionContext.Provider value={{bankSoal, modalData, setModalData, addToKeranjang, removeFromKeranjang, allSoal, keranjangData, handlePembayaran, pembayaranData, handleBayar, handleBatalBayar, historyPembayaranData, ujianSayaData, userData}}>{children}</QuestionContext.Provider>
}