import { createContext, useEffect, useState } from "react";
import BankSoal from './BankSoal.js'


export const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
  
 
  const [modalData, setModalData] = useState({
    modal:false,
  });



 

  return <QuestionContext.Provider value={{ modalData, setModalData}}>{children}</QuestionContext.Provider>
}