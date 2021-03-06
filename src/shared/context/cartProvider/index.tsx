import React, {createContext, useCallback, useMemo, useState} from 'react';

import {IProduct} from 'shared/services/api/productService';

export interface IAddToCart {
  product: {
    id: number;
    title: string;
    image: string;
  };
  quantity: number;
  value: number;
}

export interface IContextCart {
  cartQuantity: number;
  cartTotalPrice: number;
  addNewProduct(product: IProduct): void;
  addProduct(id: number): void;
  removeProduct(id: number): void;
  deleteProduct(id: number): void;
  products: IAddToCart[];
}

export const CartContext = createContext<IContextCart>({} as IContextCart);

export const CartProvider: React.FC = ({children}) => {
  const [products, setProducts] = useState<IAddToCart[]>([]);

  const cartQuantity = useMemo(() => {
    let quantity = 0;

    products.map((product) => {
      quantity += product.quantity;
    });

    return quantity;
  }, [products]);

  const cartTotalPrice = useMemo(() => {
    let value = 0;

    products.map((product) => {
      value += product.value * product.quantity;
    });

    return value;
  }, [products]);

  const handleAddNewProduct = useCallback(
    (product: IProduct) => {
      setProducts([
        ...products,
        {product: {...product}, quantity: 1, value: product.price},
      ]);
    },
    [products],
  );

  const handleAddProduct = useCallback(
    (id: number) => {
      setProducts(
        products.map((p) =>
          p.product.id === id ? {...p, quantity: p.quantity + 1} : p,
        ),
      );
    },
    [products],
  );

  const handleRemoveProduct = useCallback(
    (id: number) => {
      setProducts(
        products.map((p) =>
          p.product.id === id ? {...p, quantity: p.quantity - 1} : p,
        ),
      );
    },
    [products],
  );

  const handleDeleteProduct = useCallback(
    (id: number) => {
      setProducts(products.filter((p) => p.product.id !== id));
    },
    [products],
  );

  return (
    <CartContext.Provider
      value={{
        products,
        cartQuantity,
        cartTotalPrice,
        addProduct: handleAddProduct,
        removeProduct: handleRemoveProduct,
        deleteProduct: handleDeleteProduct,
        addNewProduct: handleAddNewProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
