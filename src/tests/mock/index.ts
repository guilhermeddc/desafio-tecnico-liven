import {IProduct} from 'shared/services/api/productService';

export const product01: IProduct = {
  category: 'Category Test 1',
  description: 'Description Test 1',
  id: 1,
  image: 'Image Test 1',
  price: 10,
  title: 'Product Test 1',
  rating: {
    count: 1,
    rate: 1,
  },
};

export const product02: IProduct = {
  category: 'Category Test 2',
  description: 'Description Test 2',
  id: 2,
  image: 'Image Test 2',
  price: 20,
  title: 'Product Test 2',
  rating: {
    count: 2,
    rate: 2,
  },
};

export const products: IProduct[] = [product01, product02];
