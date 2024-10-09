import React, {useState} from 'react'
import contacts from '../../icons/contacts.png'
import close from '../../icons/close.png'
import whatsappWhite from '../../icons/whatsapp-white.png'
import instagramWhite from '../../icons/instagram-white.png'
import tiktok from '../../icons/tiktok.jpg'

const Contacts = () => {
  const [opened, setOpened] = useState(false);

  function handleClick() {
    const contactsImage = document.getElementById('contacts-image');
    const closeIcon = document.getElementById('close-icon');
    const whatsappContact = document.getElementById('whatsapp-contact');
    const instagramContact = document.getElementById('instagram-contact');
    const tiktokContact = document.getElementById('tiktok-contact');


    if (opened) {
      contactsImage.style.transform = 'rotate(0)';
      contactsImage.style.opacity = 1; 

      closeIcon.style.transform ='rotate(0)';
      closeIcon.style.opacity = 0;

      whatsappContact.style.transform = 'translateY(0)';
      whatsappContact.style.opacity = 0;

      
      instagramContact.style.transform = 'translateY(0)';
      instagramContact.style.opacity = 0;

      tiktokContact.style.transform = 'translateY(0)';
      tiktokContact.style.opacity = 0;
      setOpened(false)
    } else {
      contactsImage.style.transform = 'rotate(180deg)';
      contactsImage.style.opacity = 0; 

      closeIcon.style.transform ='rotate(180deg)';
      closeIcon.style.opacity = 1;

      whatsappContact.style.transform = 'translateY(-70px)';
      whatsappContact.style.opacity = 1;

      instagramContact.style.transform = 'translateY(-140px)';
      instagramContact.style.opacity = 1;

      tiktokContact.style.transform = 'translateY(-210px)';
      tiktokContact.style.opacity = 1;
      setOpened(true)
    }
    
  }

  return (
    <div className='fixed bottom-20 right-10 bg-gray-200 p-4 rounded-full shadow-roundBlack cursor-pointer hidden min-[480px]:block'>
      <div className='relative z-10' onClick={handleClick}>
        <img  className='h-7 duration-700' id='contacts-image' src={contacts} alt="contacts-icon" />
        <img className='h-7 absolute top-0 opacity-0 duration-700' id='close-icon' src={close} alt="close-icon" />
      </div>
      <div className='absolute opacity-0 right-0 top-0 p-3 bg-green-500 rounded-full duration-500 shadow-roundBlack' id='whatsapp-contact'>
        <img className='h-8' src={whatsappWhite} alt="whatsapp-icon" />
      </div>
      <div className='absolute opacity-0 right-0 top-0 p-3 bg-gradient-to-r from-[#fcb045] via-[#fd1d1d] to-[#833ab4] rounded-full duration-500 delay-300 shadow-roundBlack' id='instagram-contact'>
        <img className='h-8 w-8' src={instagramWhite} alt="instagram-icon" />
      </div>
      <div className='absolute opacity-0 right-0 top-0 p-3 bg-black rounded-full duration-500 delay-500 shadow-roundBlack' id='tiktok-contact'>
        <img className='h-8 bg-white p-0' src={tiktok} alt="tiktok-icon" />
      </div>
    </div>
  )
}

export default Contacts