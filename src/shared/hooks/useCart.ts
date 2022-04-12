import {useContext} from 'react';

import {
  CartContext,
  CartProvider,
  IContextCart,
} from 'shared/context/cartContext';

const useCart = (): IContextCart => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
};

export {CartProvider, useCart};
