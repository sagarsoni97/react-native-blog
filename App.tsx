
import React, { FC } from 'react';
import {
  View, Text
} from 'react-native';

//Third Party Import
import FlashMessage from 'react-native-flash-message';

// Provider Import
import Providers from './src/Navigation/Index';

const App: FC = () => {

  return (
    <>
      <Providers />
      <FlashMessage />
    </>
  );
};

export default App;
