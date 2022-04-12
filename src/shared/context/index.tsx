import React from 'react';

import {CartProvider} from './cartContext';

export const AppProvider: React.FC = ({children}) => {
  return <CartProvider>{children}</CartProvider>;
};
