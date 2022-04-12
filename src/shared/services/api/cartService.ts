import {api} from '../axios';

export interface IAddProduct {
  productId: number | undefined;
  quantity: number;
}

interface IAddToCart {
  userId: number;
  data: Date;
  products: IAddProduct[];
}

const addToCart = async (payload: IAddToCart[]): Promise<void> => {
  try {
    await api.post('/carts', payload);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const cartService = {addToCart};
