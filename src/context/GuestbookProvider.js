import {
  createContext,
  useContext,
  useState
} from 'react';

const GuestbookContext = createContext();

export default function GuestbookProvider({ children }){
  const [signInOrUp, setSignInOrUp] = useState(true);

  const guestbookState = {
    signInOrUp, setSignInOrUp,
  };

  return(
    <GuestbookContext.Provider value={guestbookState}>
      {children}
    </GuestbookContext.Provider>
  );
}

export function guestbookContext(){
  return useContext(GuestbookContext);
}