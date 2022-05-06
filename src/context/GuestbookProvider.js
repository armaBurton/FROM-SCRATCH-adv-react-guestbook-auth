import {
  createContext,
  useContext,
  useState
} from 'react';

const GuestbookContext = createContext();

export default function (){
  const [temp, setTemp] = useState('');

  const guestbookState = {
    temp, setTemp
  };

  
}