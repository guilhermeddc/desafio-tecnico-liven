import React from 'react';
import {NavLink} from 'react-router-dom';

import {Grid, Stack, Typography} from '@mui/material';
import {IProduct} from 'shared/services/api/productService';
import {moneyMask} from 'shared/utils/moneyMask';

interface IProps {
  product: IProduct;
}

export const ProductCard: React.FC<IProps> = ({product}) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={product.id}
      data-testid={`product-card-${product.id}`}
      component={NavLink}
      to={`/product/${product.id}`}
      sx={{textDecoration: 'none', color: 'unset'}}>
      <Stack bgcolor="background.paper" height={350}>
        <Stack
          aria-label="Imagem do produto"
          height="100%"
          sx={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <Stack
            bgcolor="background.paper"
            height={350}
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={3}
            sx={{
              transition: 'all 1s ease-in-out',
              opacity: 0.1,
              ':hover': {
                opacity: 0.9,
              },
            }}>
            <Typography variant="h6" align="center" aria-label={product.title}>
              {product.title}
            </Typography>

            <Stack
              bgcolor="secondary.main"
              width="80%"
              height={4}
              borderRadius={2}
            />

            <Typography variant="h4" align="center" color="secondary">
              {moneyMask(product.price)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};
