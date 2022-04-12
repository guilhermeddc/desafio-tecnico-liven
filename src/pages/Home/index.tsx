import React from 'react';
import {useQuery} from 'react-query';

import {Grid, Typography} from '@mui/material';
import {LinearDeterminate} from 'shared/components';
import {ProductCard} from 'shared/components/UI/ProductCard';
import {productService} from 'shared/services/api/productService';

const Home: React.FC = () => {
  const {data: products, isLoading} = useQuery('products', () =>
    productService.getAllProducts(15),
  );

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
