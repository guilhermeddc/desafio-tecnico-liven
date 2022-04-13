import React, {useCallback} from 'react';
import {useQuery} from 'react-query';
import {useParams} from 'react-router-dom';

import {Button, Grid, Stack, Typography} from '@mui/material';
import {LinearDeterminate} from 'shared/components';
import {useCart} from 'shared/hooks';
import {productService} from 'shared/services/api/productService';
import {moneyMask} from 'shared/utils/moneyMask';

const Product: React.FC = () => {
  const {product: id} = useParams<{product: string}>();

  const {products, addNewProduct, addProduct} = useCart();

  const {data: product, isLoading} = useQuery(['product', id], () =>
    productService.getSingleProduct(id),
  );

  const handleAddToCart = useCallback(() => {
    if (products.filter((p) => p.product.id === Number(id)).length === 0) {
      addProduct(Number(id));
    } else if (product) {
      addNewProduct(product);
    }
  }, [addNewProduct, addProduct, id, product, products]);

  if (isLoading) {
    return <LinearDeterminate />;
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="h6" color="secondary.main">
          Product
        </Typography>
        <Typography variant="h5">{product?.title}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack
          aria-label="Imagem do produto"
          height="100%"
          width="100%"
          sx={{
            backgroundImage: `url(${product?.image})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            maxHeight: {md: 700, xs: 300},
            maxWidth: {md: 700, xs: 250},
            minHeight: 300,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h6" color="secondary.main">
              Description
            </Typography>
            <Typography variant="body2">{product?.description}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6" color="secondary.main">
              Price
            </Typography>
            <Typography variant="body2">{moneyMask(product?.price)}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6" color="secondary.main">
              Category
            </Typography>
            <Typography variant="body2">{product?.category}</Typography>
          </Stack>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleAddToCart}
            sx={{maxWidth: {md: '50%', sx: '100%'}}}>
            Add to cart
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Product;
