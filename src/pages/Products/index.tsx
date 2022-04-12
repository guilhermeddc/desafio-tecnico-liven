import React from 'react';
import {useQuery} from 'react-query';
import {useParams} from 'react-router-dom';

import {Grid, Typography} from '@mui/material';
import {LinearDeterminate, ProductCard} from 'shared/components';
import {productService} from 'shared/services/api/productService';

const Products: React.FC = () => {
  const {category} = useParams<{category: string}>();

  const {data: products, isLoading} = useQuery(
    ['products/categories', category],
    () => productService.getProductsInCategory(category?.replace('-', ' ')),
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

export default Products;
