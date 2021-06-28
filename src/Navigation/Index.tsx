import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

 const Providers : React.FC = () =>{
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers