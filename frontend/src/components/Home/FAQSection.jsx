import React, {useState} from 'react'
import downArrow from '../../icons/down-arrow.png'


const FAQSection = () => {
  const [opened, setOpened] = useState(false);


  function handleClick(number) {
    const downArrow = document.getElementById(`down-arrow-${number}`);
    const answer = document.getElementById(`a-${number}`);

    if (opened) {
      downArrow.style.transform = 'rotate(0deg)';
      answer.style.maxHeight = 0; 
      answer.style.paddingBottom = 0; 
      setOpened(false);
    } else {
      downArrow.style.transform = 'rotate(180deg)';
      answer.style.maxHeight = '300px';
      answer.style.paddingBottom = '12px';
      setOpened(true)
    }
    
    
  }
  
  return (
    <div className='p-3' id='faq-section'>
      <div className='flex flex-col items-center gap-8 max-w-[620px] mx-auto'>
        <div>
          <h1 className='font-bold text-3xl max-w-[620px]'>FAQ</h1>
        </div>
        <div className='w-full'>
          <div className='border-t-[1px] '>
            <div className='flex justify-between items-center hover:bg-gray-100 p-5 cursor-pointer' onClick={() => {handleClick(1)} }>
              <p className='font-semibold'>Apa itu Coba Ujian?</p>
              <img className='h-4 duration-500' id='down-arrow-1' src={downArrow} alt="down-arrow" />
            </div>
            <div className='px-5 pt-0 max-h-0 overflow-hidden duration-300' id='a-1'>
              <p className='text-gray-500 text-justify'>CobaUjian adalah platform latihan ujian online yang dirancang untuk membantu kamu mempersiapkan berbagai jenis ujian. Termasuk tes masuk perguruan tinggi, LPDP, BUMN, CPNS, dan seleksi karir lainnya.</p>
            </div>
          </div>

          <div className='border-t-[1px] '>
            <div className='flex justify-between items-center hover:bg-gray-100 p-5 cursor-pointer' onClick={() => {handleClick(2)} }>
              <p className='font-semibold'>Mengapa harus latihan di CobaUjian?</p>
              <img className='h-4 duration-500' id='down-arrow-2' src={downArrow} alt="down-arrow" />
            </div>
            <div className='px-5 pt-0 max-h-0 overflow-hidden duration-500' id='a-2'>
              <p className='text-gray-500 text-justify'>Dengan CobaUjian, kamu bisa berlatih mengerjakan soal-soal yang didesain untuk mencerminkan materi dan format ujian yang sebenarnya. Serunya lagi, pengerjaan soal dibatasi dengan durasi waktu supaya kamu bisa mendapatkan pengalaman simulasi mengerjakan ujian asli. Hal ini akan membantu kamu meningkatkan kemampuan dan percaya diri dalam menghadapi ujian nanti.</p>
            </div>
          </div>

          <div className='border-t-[1px]'>
            <div className='flex justify-between items-center hover:bg-gray-100 p-5 cursor-pointer' onClick={() => {handleClick(3)} }>
              <p className='font-semibold'>Apakah CobaUjian menyediakan pembahasan soal?</p>
              <img className='h-4 duration-500' id='down-arrow-3' src={downArrow} alt="down-arrow" />
            </div>
            <div className='px-5 pt-0 max-h-0 overflow-hidden duration-500' id='a-3'>
              <p className='text-gray-500 text-justify'>Pastinya! Setelah menyelesaikan simulasi ujian, kamu akan mendapatkan pembahasan lengkap untuk setiap jawaban agar kamu dapat memahami konsep dan strategi dalam menjawab soal dengan lebih baik.</p>
            </div>
          </div>

          <div className='border-t-[1px]'>
            <div className='flex justify-between items-center hover:bg-gray-100 p-5 cursor-pointer' onClick={() => {handleClick(4)} }>
              <p className='font-semibold'>Bagaimana cara akses paket soal ujian yang sudah dibeli?</p>
              <img className='h-4 duration-500' id='down-arrow-4' src={downArrow} alt="down-arrow" />
            </div>
            <div className='px-5 pt-0 max-h-0 overflow-hidden duration-500' id='a-4'>
              <ol className='text-gray-500 text-justify'>
                <li>1. Buka www.cobaujian.com.</li>
                <li>2. Klik 'Masuk/Dashboard' di pojok kanan atas halaman.</li>
                <li>3. Di sebelah kiri, terdapat tab 'Ujian Saya'.</li>
                <li>4. Pilih ujian yang ingin kamu mulai atau pembahasan yang ingin diakses.</li>
              </ol>
              <p ></p>
            </div>
          </div>

          <div className='border-t-[1px] border-b-[1px]'>
            <div className='flex justify-between items-center hover:bg-gray-100 p-5 cursor-pointer' onClick={() => {handleClick(5)} }>
              <p className='font-semibold'>Apakah soal dan pembahasan di CobaUjian bisa diunduh?</p>
              <img className='h-4 duration-500' id='down-arrow-5' src={downArrow} alt="down-arrow" />
            </div>
            <div className='px-5 pt-0 max-h-0 overflow-hidden duration-500' id='a-5'>
              <p className='text-gray-500 text-justify'>CobaUjian hanya menyediakan sarana simulasi ujian secara online. Tapi tenang! kamu bisa mengakses paket ujian yang sudah kamu punya kapan saja dan di mana saja. Cukup melakukan sekali pembelian, kamu dapat berlatih ujian berkali-kali, berikut dengan akses terhadap pembahasan soal.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default FAQSection