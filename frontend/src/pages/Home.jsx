import React from 'react'
import Navbar from '../components/Home/Navbar.jsx';
import Hero from '../components/Home/Hero.jsx'
import PaketSection from '../components/Home/PaketSection.jsx'
import TestimoniSection from '../components/Home/TestimoniSection.jsx'
import FAQSection from '../components/Home/FAQSection.jsx'
import DemoSection from '../components/Home/DemoSection.jsx';
import Footer from '../components/Home/Footer.jsx'
import Contacts from '../components/Home/Contacts.jsx';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <PaketSection />
      <TestimoniSection />
      <FAQSection />
      <DemoSection />
      <Footer />
      <Contacts />
    </>
  )
}

export default Home