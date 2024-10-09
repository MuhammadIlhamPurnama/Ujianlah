import React from 'react'

const QuestionNumber = ({soal, onClick}) => {
  
  return (
    <div 
    className='p-2 flex text-center rounded bg-gray-200 cursor-pointer' 
    style={{
      backgroundColor: soal.currentAnswer === 'ragu' 
      ? '#f6993f'
      : soal.currentAnswer === ''
        ? '#e6e7eb'
        : '#529493',
      color: soal.currentAnswer === '' ? 'black' : 'white' 
    }}
    onClick={onClick}
    >
      <p className='w-6'>{soal.no}</p>
    </div>
  )
}

export default QuestionNumber