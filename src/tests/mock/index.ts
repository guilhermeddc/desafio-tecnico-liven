import {IAddToCart} from 'shared/context/cartProvider';
import {IProduct} from 'shared/services/api/productService';

export const product01: IProduct = {
  category: 'Category 1',
  description: 'Description 1',
  id: 1,
  image: 'https://via.placeholder.com/150',
  price: 100,
  title: 'Product 1',
  rating: {
    count: 1,
    rate: 1,
  },
};

export const product02: IProduct = {
  category: 'Category 2',
  description: 'Description 2',
  id: 2,
  image: 'https://via.placeholder.com/150',
  price: 200,
  title: 'Product 2',
  rating: {
    count: 2,
    rate: 2,
  },
};

export const products: IProduct[] = [product01, product02];

export const productsInCart: IAddToCart[] = [
  {
    product: {...product01},
    quantity: 2,
    value: product01.price,
  },
  {
    product: {...product02},
    quantity: 1,
    value: product02.price,
  },
];
