import React from 'react';

import {Grid, Typography} from '@mui/material';
import {ErrorPage, LinearDeterminate} from 'shared/components';
import {ProductCard} from 'shared/components/UI/ProductCard';
import {useFetchProducts} from 'shared/hooks';

const Home: React.FC = () => {
  const {data: products, isLoading, isError} = useFetchProducts();

  if (isError) {
    return <ErrorPage queryKey="products" />;
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

export default Home;
