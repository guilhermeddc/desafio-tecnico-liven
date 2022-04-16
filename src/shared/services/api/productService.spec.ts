import axiosMocked from 'axios';

import {productService} from './productService';

afterEach(() => {
  jest.clearAllMocks();
});

describe('productService', () => {
  describe('getAllProducts', () => {
    beforeEach(() => {
      jest.setTimeout(10000);
    });

    it('should return all products', async () => {
      const limit = 2;
      const sort = 'desc';
      const response = {
        data: [
          {
            category: "women's clothing",
            description:
              '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
            id: 20,
            image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
            price: 12.99,
            rating: {rate: 3.6, count: 145},
            title: 'DANVOUY Womens T Shirt Casual Cotton Short',
          },
          {
            category: "women's clothing",
            description:
              '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
            id: 19,
            image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
            price: 7.95,
            rating: {rate: 4.5, count: 146},
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
    beforeEach(() => {
      jest.setTimeout(10000);
    });

    it('should return a single product', async () => {
      const id = '20';
      const response = {
        category: "women's clothing",
        description:
          '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
        id: 20,
        image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
        price: 12.99,
        rating: {rate: 3.6, count: 145},
        title: 'DANVOUY Womens T Shirt Casual Cotton Short',
      };

      jest.spyOn(axiosMocked, 'get').mockResolvedValue(response);

      const result = await productService.getSingleProduct(id);

      expect(result).toEqual(response);
    });
  });

  describe('getAllCategories', () => {
    beforeEach(() => {
      jest.setTimeout(10000);
    });

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
    beforeEach(() => {
      jest.setTimeout(10000);
    });

    it('should return all products in a category', async () => {
      const category = 'electronics';
      const limit = 2;
      const sort = 'desc';
      const response = {
        data: [
          {
            category: 'electronics',
            description:
              '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
            id: 14,
            image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
            price: 999.99,
            rating: {rate: 2.2, count: 140},
            title:
              'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',
          },
          {
            category: 'electronics',
            description:
              '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
            id: 13,
            image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
            price: 599,
            rating: {rate: 2.9, count: 250},
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
