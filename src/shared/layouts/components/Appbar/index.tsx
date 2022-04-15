import React from 'react';

import {MenuRounded} from '@mui/icons-material';
import {
  AppBar as MuiAppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

interface IProps {
  drawerWidth: number;
  cartQuantity: number;
  onDrawerToggle(): void;
  onNavigateToCart(): void;
}

export const Appbar: React.FC<IProps> = ({
  drawerWidth,
  cartQuantity,
  onDrawerToggle,
  onNavigateToCart,
}) => {
  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      data-testid="app-bar"
      color="transparent"
      sx={{
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        ml: {sm: `${drawerWidth}px`},
        bgcolor: 'secondary.main',
      }}>
      <Stack
        p={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}>
            <MenuRounded />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{display: {md: 'flex', xs: 'none'}}}>
            Technical Challenge Liven
          </Typography>
        </Toolbar>

        <Toolbar>
          <IconButton onClick={onNavigateToCart}>
            <Avatar sx={{bgcolor: 'primary.main'}}>{cartQuantity}</Avatar>
          </IconButton>
        </Toolbar>
      </Stack>
    </MuiAppBar>
  );
};
