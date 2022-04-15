import {useQuery} from 'react-query';

import {productService} from 'shared/services/api/productService';

export const useFetchCategories = () => {
  const {data, error, isLoading, isError} = useQuery('categories', () =>
    productService.getAllCategories(),
  );

  return {data, error, isLoading, isError};
};
