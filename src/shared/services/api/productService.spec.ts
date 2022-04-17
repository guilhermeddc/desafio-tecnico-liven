import axiosMocked from 'axios';

import {productService} from './productService';

afterEach(() => {
  jest.clearAllMocks();
});

describe('productService', () => {
  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const limit = 2;
      const sort = 'desc';
      const response = {
        data: [
          {
            category: "women's clothing",
            id: 20,
            price: 12.99,
            title: 'DANVOUY Womens T Shirt Casual Cotton Short',
          },
          {
            category: "women's clothing",
            id: 19,
            price: 7.95,
            title: "Opna Women's Short Sleeve Moisture",
          },
        ],
      };

      jest.spyOn(axiosMocked, 'get').mockResolvedValue(response);

      const result = await productService.getAllProducts(limit, sort);

      expect(result).toEqual(response.data);
    });
  });

  describe('getSingleProduct', () => {
    it('should return a single product', async () => {
      const id = '20';
      const response = {
        data: {
          category: "women's clothing",
          id: 20,
          price: 12.99,
          title: 'DANVOUY Womens T Shirt Casual Cotton Short',
        },
      };

      jest.spyOn(axiosMocked, 'get').mockResolvedValue(response);

      const result = await productService.getSingleProduct(id);

      expect(result).toEqual(response.data);
    });
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const response = {
        data: ['electronics', 'jewelery', "men's clothing", "women's clothing"],
      };

      jest.spyOn(axiosMocked, 'get').mockResolvedValue(response);

      const result = await productService.getAllCategories();

      expect(result).toEqual(response.data);
    });
  });

  describe('getProductsInCategory', () => {
    it('should return all products in a category', async () => {
      const category = 'electronics';
      const limit = 2;
      const sort = 'desc';
      const response = {
        data: [
          {
            category: 'electronics',
            id: 14,
            price: 999.99,
            title:
              'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',
          },
          {
            category: 'electronics',
            id: 13,
            price: 599,
            title:
              'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
          },
        ],
      };

      jest.spyOn(axiosMocked, 'get').mockResolvedValue(response);

      const result = await productService.getProductsInCategory(
        category,
        limit,
        sort,
      );

      expect(result).toEqual(response.data);
    });
  });
});
