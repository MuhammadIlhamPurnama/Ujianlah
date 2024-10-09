import React, {useState, useRef, useEffect} from 'react'


const TimeCounter = ({time}) => {
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  
  let interval = useRef();

  const countdownDate = new Date().getTime() + 600000;
  
  
  
  const startTimer = () => {
    

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))).toString().padStart(2, '0');
      const minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

      if (distance < 0 ) {
        //timerStop
        clearInterval(interval.current);
        
        
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000)
  };

  
  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(interval.current);
      
    }
  }, [])

  

  return (
    <div className='flex gap-2'>
      <div className='w-12 h-14 bg-[#529493] text-white font-semibold text-xl flex items-center justify-center rounded-md'>
        <p>{timerHours}</p>
      </div>
      <div className='w-12 h-14 bg-[#529493] text-white font-semibold text-xl flex items-center justify-center rounded-md'>
        <p>{timerMinutes}</p>
      </div>
      <div className='w-12 h-14 bg-[#529493] text-white font-semibold text-xl flex items-center justify-center rounded-md'>
        <p>{timerSeconds}</p>
      </div>
    </div>
  )
}

export default TimeCounter