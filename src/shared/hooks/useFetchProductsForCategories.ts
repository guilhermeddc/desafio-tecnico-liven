import {useQuery} from 'react-query';

import {productService} from 'shared/services/api/productService';

export const useFetchProductsForCategories = (category: string | undefined) => {
  const {data, error, isLoading, isError} = useQuery(
    ['products/categories', category],
    () => productService.getProductsInCategory(category?.replace('-', ' ')),
  );

  return {data, error, isLoading, isError};
};
