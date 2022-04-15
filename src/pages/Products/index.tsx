import React from 'react';
import {useParams} from 'react-router-dom';

import {Grid, Typography} from '@mui/material';
import {ErrorPage, LinearDeterminate, ProductCard} from 'shared/components';
import {useFetchProductsForCategories} from 'shared/hooks';

const Products: React.FC = () => {
  const {category} = useParams<{category: string}>();

  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProductsForCategories(category);

  if (isError) {
    return <ErrorPage queryKey="products/categories" />;
  }

  if (isLoading) {
    return <LinearDeterminate />;
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="h4">On Sale Now</Typography>
      </Grid>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default Products;
