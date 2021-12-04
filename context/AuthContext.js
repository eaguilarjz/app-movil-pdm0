import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

async function saveToken(value) {
  try {
    await SecureStore.setItemAsync('token', value);
  } catch (error) {
    console.log(error);
  }
}

async function getToken() {
  try {
    let result = await SecureStore.getItemAsync('token');
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
      return result;
    } else {
      alert('No values stored under that key.');
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState('');

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      alert('Se borró el token.');
      setIsSignedIn(false);
      setToken('');
    } catch (error) {}
  };

  // Ver si el usuario está autenticado
  useEffect(() => {
    const recuperarToken = async () => {
      const token = await getToken();
      if (token) {
        setIsSignedIn(true);
        setToken(token);
      }
    };

    recuperarToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        token,
        setIsSignedIn,
        setToken,
        saveToken,
        getToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
