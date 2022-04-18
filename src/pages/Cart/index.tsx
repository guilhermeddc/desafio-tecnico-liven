import React from 'react';
import {useNavigate} from 'react-router-dom';

import {AddRounded, RemoveRounded} from '@mui/icons-material';
import {
  Avatar,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useCart} from 'shared/hooks';
import {moneyMask} from 'shared/utils/moneyMask';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {products, cartTotalPrice, addProduct, removeProduct, deleteProduct} =
    useCart();

  return (
    <Grid container spacing={8}>
      {products.length > 0 ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h4">Your bag</Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer sx={{width: {xs: '80vw', md: '100%'}}}>
              <Table sx={{minWidth: 650, overflowX: 'scroll'}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.product.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Avatar sx={{borderRadius: 1}}>
                            <img
                              src={p.product.image}
                              alt={p.product.title}
                              width="100%"
                            />
                          </Avatar>
                          <Typography variant="body1">
                            {p.product.title.slice(0, 50)}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <ButtonGroup
                            size="small"
                            aria-label="small button group">
                            <Button
                              data-testid={`remove-product-${p.product.id}`}
                              onClick={() => removeProduct(p.product.id)}
                              disabled={p.quantity === 1}>
                              <RemoveRounded />
                            </Button>

                            <Button>{p.quantity}</Button>

                            <Button
                              data-testid={`add-product-${p.product.id}`}
                              onClick={() => addProduct(p.product.id)}>
                              <AddRounded />
                            </Button>
                          </ButtonGroup>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Button
                          data-testid={`delete-product-${p.product.id}`}
                          onClick={() => deleteProduct(p.product.id)}>
                          Delete
                        </Button>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body1">
                          {moneyMask(p.value * p.quantity)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <Button disabled>Subtotal</Button>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        {moneyMask(cartTotalPrice)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Stack alignItems="flex-end" spacing={8}>
              <Typography variant="h6" color="secondary.main">
                Shipping & taxes calculated at Checkout
              </Typography>

              <Button variant="contained" color="secondary" size="large">
                Checkout
              </Button>
            </Stack>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            <Stack spacing={8}>
              <Typography variant="h2">Your bag is empty</Typography>

              <Button
                color="secondary"
                size="large"
                sx={{maxWidth: 170}}
                onClick={() => navigate('/')}>
                Return to home
              </Button>
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Cart;
