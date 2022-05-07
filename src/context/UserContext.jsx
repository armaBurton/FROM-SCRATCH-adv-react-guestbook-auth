// import { createContext, useContext, useState } from "react";
// import { getUser, signInUser } from "../services/user";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(currentUser || { email: null });
//   const currentUser = getUser(); 

//   const login = async (email, password) => {
//     console.log('hit login from UserContext', email, password);

//     const authenticatedUser = await signInUser({email, password});

//     if (authenticatedUser) {
//       setUser(authenticatedUser);
//     }
//   }



// }
