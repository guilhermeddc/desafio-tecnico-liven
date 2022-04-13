import React from 'react';

import {CartProvider} from './cartProvider';

export const AppProvider: React.FC = ({children}) => {
  return <CartProvider>{children}</CartProvider>;
};
