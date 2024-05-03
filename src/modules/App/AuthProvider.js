// // AuthProvider.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [jewellerId, setJewellerId] = useState(null);

//   const login = (jewellerId) => {
//     // Perform authentication logic, e.g., validate credentials and obtain jewellerId
    
//     setJewellerId(jewellerId);
//   };

//   const logout = () => {
//     // Perform logout logic, e.g., clear authentication tokens
//     setJewellerId(null);
//   };

//   return (
//     <AuthContext.Provider value={{ jewellerId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform authentication, e.g., send request to server to verify credentials
    // If authentication successful, set user data and token
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Clear user data and token from storage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

