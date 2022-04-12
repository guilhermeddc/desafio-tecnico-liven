import React, {createContext, useCallback, useMemo, useState} from 'react';

interface IAddToCart {
  product: {
    id: number;
    title: string;
    image: string;
  };
  quantity: number;
  value: number;
}

export interface IContextCart {
  products: IAddToCart[];
  setProducts(value: IAddToCart[]): void;
  cartQuantity: number;
  cartTotalPrice: number;
  addProduct(id: number): void;
  removeProduct(id: number): void;
  deleteProduct(id: number): void;
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
        setProducts,
        cartQuantity,
        cartTotalPrice,
        addProduct: handleAddProduct,
        removeProduct: handleRemoveProduct,
        deleteProduct: handleDeleteProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
