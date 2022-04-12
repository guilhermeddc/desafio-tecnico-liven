import {api} from '../axios';

export interface IProduct {
  id: number;
  category: string;
  description: string;
  image: string;
  title: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
}

const getAllProducts = async (
  limit = 20,
  sort: 'asc' | 'desc' = 'desc',
): Promise<IProduct[]> => {
  try {
    const response = await api.get<IProduct[]>(
      `/products?limit=${limit}&sort=${sort}`,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getSingleProduct = async (id: string | undefined): Promise<IProduct> => {
  try {
    const response = await api.get<IProduct>(`/products/${id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>('/products/categories');

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductsInCategory = async (
  category: string | undefined,
  limit = 20,
  sort: 'asc' | 'desc' = 'desc',
): Promise<IProduct[]> => {
  try {
    const response = await api.get<IProduct[]>(
      `/products/category/${category}?limit=${limit}&sort=${sort}`,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const productService = {
  getAllProducts,
  getSingleProduct,
  getAllCategories,
  getProductsInCategory,
};
