import {useQuery} from 'react-query';

import {productService} from 'shared/services/api/productService';

export const useFetchProduct = (id: string | undefined) => {
  const {data, error, isLoading, isError} = useQuery(['product', id], () =>
    productService.getSingleProduct(id),
  );

  return {data, error, isLoading, isError};
};
