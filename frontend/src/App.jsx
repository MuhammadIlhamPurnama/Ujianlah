import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Platform from "./pages/Platform.jsx";
import Ujiansaya from './components/platform/Ujiansaya.jsx'
import Pembayaran from './components/platform/Pembayaran.jsx'
import Ujian from './pages/Ujian.jsx'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Signup' element={<Signup />}/>
        <Route path='/Platform//*' element={<Platform />} />
        <Route path='/platform/ujiansaya' element={<Ujiansaya />}/>
        <Route path='/platform/pembayaran' element={<Pembayaran />}/>
        <Route path='/ujian' element={<Ujian />}>
          <Route path=':ujianId' element={<Ujian />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
