import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

async function saveToken(value) {
  try {
    await SecureStore.setItemAsync('token', value);
  } catch (error) {}
}

async function getToken() {
  try {
    let result = await SecureStore.getItemAsync('token');
    if (result) {
      // alert("🔐 Here's your value 🔐 \n" + result);
      return result;
    } else {
      // alert('No values stored under that key.');
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setIsSignedIn(false);
    } catch (error) {}
  };

  // Ver si el usuario está autenticado
  useEffect(() => {
    const recuperarToken = async () => {
      const token = await getToken();
      if (token) {
        setIsSignedIn(true);
      }
    };

    recuperarToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, saveToken, getToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
