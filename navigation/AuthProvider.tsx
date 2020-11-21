import React, { createContext, useState } from 'react';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            return true
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            return true
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            return true
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
