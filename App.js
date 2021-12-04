import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TareasProvider } from './context/TareasContext';
import Principal from './Principal';

export default function App() {
  return (
    <AuthProvider>
      <TareasProvider>
        <Principal />
      </TareasProvider>
    </AuthProvider>
  );
}
