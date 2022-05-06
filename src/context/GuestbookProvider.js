import {
  createContext,
  useContext,
  useState
} from 'react';

const GuestbookContext = createContext();

export default function GuestbookProvider({ children }){
  const [signInOrUp, setSignInOrUp] = useState(false);

  const guestbookState = {
    signInOrUp, setSignInOrUp,
  };

  return(
    <GuestbookContext.Provider value={guestbookState}>
      {children}
    </GuestbookContext.Provider>
  );
}

export async function ProvideAuth({ children }){
  const [user , setUser] = useState(null);

  const signUp = (email, password) => {
  }
}

export function guestbookContext(){
  return useContext(GuestbookContext);
}