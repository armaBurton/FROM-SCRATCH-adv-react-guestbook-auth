import { createContext, useContext, useState } from 'react';
import { getUser, signInUser, signUpUser, signOutUser } from '../services/user';

const GuestbookContext = createContext();

export const GuestbookProvider = ({ children }) => {
  const currentUser = getUser();

  const [user, setUser] = useState(currentUser || { email: null });
  const [signInOrUp, setSignInOrUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  const guestbookState = {
    signInOrUp,
    setSignInOrUp,
    user,
    setUser,
    entries,
    setEntries,
    loading,
    setLoading,
  };

  const login = async (email, password) => {
    console.log('hit login from GuestbookProvider', email, password);

    console.log(`|| email, password >`, email, password);
    const authenticatedUser = await signInUser({ email, password });

    if (authenticatedUser) {
      setUser(authenticatedUser);
    }
  };

  const signUp = async (email, password) => {
    const newUser = await signUpUser({ email, password });

    if (newUser) setUser(newUser);
  };

  const logout = async (email, password) => {
    const logoutUser = await signOutUser();

    setUser(logoutUser);
  };

  return (
    <GuestbookContext.Provider
      value={{
        guestbookState,
        login,
        signUp,
        logout,
        user,
        setUser,
        signInOrUp,
        setSignInOrUp,
        entries,
        setEntries,
        loading,
        setLoading,
      }}
    >
      {children}
    </GuestbookContext.Provider>
  );
};

export const useGuestbook = () => {
  const context = useContext(GuestbookContext);

  if (context === undefined) {
    throw new Error('useGuestbook must be used withing a GuestbookProvider');
  }

  return context;
};

export function guestbookContext() {
  return useContext(GuestbookContext);
}
