import {useQuery} from 'react-query';

import {productService} from 'shared/services/api/productService';

export const useFetchProducts = () => {
  const {data, error, isLoading, isError} = useQuery('products', () =>
    productService.getAllProducts(15),
  );

  return {data, error, isLoading, isError};
};
