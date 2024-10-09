import React, {useEffect, useContext, useState, useRef} from 'react'
import keteranganUjian from '../images/keterangan-ujian.svg'
import nextIcon from '../icons/next.png'
import backIcon from '../icons/back.png'
import {QuestionContext} from '../data/questions.jsx'
import Answer from '../components/Ujian/Answer.jsx'
import QuestionNumber from '../components/Ujian/QuestionNumber.jsx'
import TimeCounter from '../components/Ujian/TimeCounter.jsx'
import { useParams } from 'react-router-dom'


const Ujian1 = () => {
  
  const [ujian, setUjian] = useState({
    Title:'',
    ujianId:'',
    waktu:0,
    Soal:[],
    jawabanBenar:0,
  })

  const intervalRef = useRef(null);
  const ujianRef = useRef(ujian);

  useEffect(() => {
    ujianRef.current = ujian;
  }, [ujian]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const {ujianId} = useParams();
  const allSoal = useContext(QuestionContext).allSoal;

  const handleNext = () => {
    if (questionIndex < ujian.Soal.length - 1) {
      setQuestionIndex(e => 
        e + 1
      )
    }
  }

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(e => 
        e - 1
      )
    }
  }

  const handleSelesai = () => {
    if(localStorage.getItem('auth-token')) {

      let currentJawabanBenar = 0;

      ujianRef.current.Soal.map((soal) => {
        if (soal.currentAnswer === soal.Jawaban) {
          console.log('benar');
          currentJawabanBenar += 1;
          
        }
      })

      console.log('Total Correct Answers:', currentJawabanBenar);

      
        const updatedUjian = { ...ujianRef.current, jawabanBenar: currentJawabanBenar };
        
        fetch('http://localhost:4000/selesaiujian', {
          method:'POST',
          headers : {
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ujian:updatedUjian})
        })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          clearInterval(intervalRef.current); 
          window.location.href = '/platform/ujiansaya';
          
        })
      

    }
  }

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      handleSelesai();
    }, (10 * 60 + 5) * 1000); // 10 minutes and 5 seconds

    return () => clearTimeout(intervalRef.current); 
  }, []);

  const handleManualSubmit = () => {
    clearTimeout(intervalRef.current); 
    handleSelesai();
  };


  useEffect(() => {
    const findUjian = () => {
      
        allSoal.map((ujian) => {
          if (ujian.ujianId === ujianId) {
            setUjian(e => ({
              ...e,
              Title: ujian.Title,
              ujianId: ujian.ujianId,
              waktu: ujian.waktu,
              Soal: ujian.Soal,
              jawabanBenar:ujian.jawabanBenar
            }))
            
          }
        })
      
    };
    findUjian();
  }, [ujianId, allSoal])
  
  const currentQuestion = ujian.Soal[questionIndex];

  useEffect(() => {
    function adjustHeroMargin() {
      const navbar = document.getElementById('navbar');
      const hero = document.getElementById('question');
      const navbarHeight = navbar.offsetHeight;
      hero.style.marginTop = `${navbarHeight}px`;
    }

    // Adjust margin on page load
    adjustHeroMargin();

    // Adjust margin on window resize
    window.addEventListener('resize', adjustHeroMargin);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', adjustHeroMargin);
    };
  }, []);

  return ( 
    <div className=''>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 border py-5 px-2 md:px-28 fixed top-0 left-0 right-0 bg-white' id='navbar'>
        <div>
          <p className='font-bold text-xl min-[460px]:text-3xl'>{ujian.Title}</p>
        </div>
        <div>
          <p className='font-semibold text-xl'>Question {questionIndex + 1} / {ujian.Soal.length}</p>
        </div>
        <div>
          <TimeCounter time={ujian}/>
        </div>
      </div>
      <div className='p-6 min-[1000px]:px-28 flex flex-col min-[1000px]:flex-row gap-4' id='question'>
        <div className=' w-full flex flex-col order-2 min-[1000px]:order-1 gap-3'>
          <div className='border p-7 min-[500px]:px-12 bg-[#e5efee] w-full rounded-md '>
            <div className='flex flex-col gap-3'>
              <div>
                <h3 className='text-xl text-gray-500'>Soal {questionIndex + 1}</h3>
              </div>
              <div className='bg-white rounded-md p-2 text-xl '>
                <p>{currentQuestion && currentQuestion.pertanyaan ? currentQuestion.pertanyaan : ''}
              </p>
              </div>
              <div>
                <div className='border-2 border-black'></div>
              </div>
              <div className='flex flex-col gap-4'>
                {currentQuestion?.opsiJawaban?.map((answer, index)  => (
                  <Answer 
                    currentQuestion={currentQuestion}
                    answerText={answer} 
                    key={index} 
                    index={index}
                    onClick={() => {
                      // dispatch({type: "SELECT_ANSWER", payload: answer});
                      setUjian(prevUjian => {
                        const updatedSoal = [...prevUjian.Soal];
                        updatedSoal[questionIndex].currentAnswer = answer;
                        
                        return {
                          ...prevUjian,
                          Soal:updatedSoal
                        }
                      })
                      
                    }}
                    />
                ))}
                
              </div>
              <div className='flex justify-end font-semibold text-gray-500 cursor-pointer'>
                <div onClick={() => {
                    // dispatch({type: 'DELETE_ANSWER'});
                    setUjian(prevUjian => {
                      const updatedSoal = [...prevUjian.Soal];
                      updatedSoal[questionIndex].currentAnswer = '';
                      
                      return {
                        ...prevUjian,
                        Soal:updatedSoal
                      }
                    })
                  }}>
                  <p>Hapus Pilihan</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-4 flex-wrap'>
            <div>
              <button className='px-8 py-2 rounded-full bg-slate-400 flex gap-3 items-center' 
              onClick={() => {
                // dispatch({type: "PREVIOUS_QUESTION"});
                handlePrev()
                }}>
                <img className='h-5' src={backIcon} alt="backIcon" />
                <p className='font-bold text-white'>Kembali</p>
              </button>
            </div>
            <div>
              <button 
              className='px-8 py-2 rounded-full border border-orange-400 text-orange-400 flex gap-3 items-center' 
              onClick={() => {
                // dispatch({type: "SELECT_ANSWER", payload:"ragu"});
                setUjian(prevUjian => {
                  const updatedSoal = [...prevUjian.Soal];
                  updatedSoal[questionIndex].currentAnswer = 'ragu';
                  
                  return {
                    ...prevUjian,
                    Soal:updatedSoal
                  }
                })
              }}
              style={{
                color: currentQuestion?.currentAnswer === 'ragu' ? 'white' : '#f6993f',
                backgroundColor: currentQuestion?.currentAnswer === 'ragu' ? '#f6993f' : 'white'
               }}
              >
                <p className='font-bold'>! Ragu</p>
              </button>
            </div>
            <div>
              <button className='px-8 py-2 rounded-full bg-[#529493] flex items-center gap-3' 
                onClick={() => {
                  // dispatch({type: "NEXT_QUESTION"});
                  handleNext();
                }}>
                <p className='font-bold text-white's>Next</p>
                <img className='h-5' src={nextIcon} alt="next" />
              </button>
            </div>
          </div>
        </div>
        <div className=' min-[1000px]:max-w-[300px] w-full order-1 min-[1000px]:order-2 overflow-hidden p-1 flex flex-col gap-3'>
          <div className='border-2 border-black rounded-md'>
            <div className='flex flex-col items-center gap-3'>
              <div className='pt-4'>
                <p className='font-bold'>Nomor Soal</p>
              </div>
              <div className='flex gap-3  min-[1000px]:flex-wrap w-full p-4 overflow-x-scroll min-[1000px]:overflow-x-auto max-h-64 min-[1000px]:justify-center'>
                {ujian.Soal.map((soal) => (
                  <QuestionNumber 
                    soal={soal}
                    key={soal.no}
                    onClick={() => {
                      // dispatch({type: "SELECT_NUMBER", payload: soal.no});
                      setQuestionIndex(soal.no - 1)
                    }}
                  />
                ))}
                
              </div>
              <div className='pb-5 px-3'>
                  <img src={keteranganUjian} alt="keterangan-ujian" />
              </div>
            </div>
          </div>
          <div className='flex text-center'>
            <button className='w-full bg-gray-400 text-white p-2 rounded-md font-semibold' onClick={handleManualSubmit}>Selesai</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ujian1