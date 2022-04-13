import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';

import {Box, Container, Stack, Toolbar} from '@mui/material';
import {useCart} from 'shared/hooks';
import {productService} from 'shared/services/api/productService';

import {Alert, Appbar, Drawer} from './components';

const drawerWidth = 400;

export const LayoutBase: React.FC = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [menuOption, setMenuOption] = useState('Shop all');

  const {cartQuantity} = useCart();
  const navigate = useNavigate();

  const {data: categories} = useQuery('categories', () =>
    productService.getAllCategories(),
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (option: string) => {
    setMenuOption(option);
    setMobileOpen(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Appbar
        cartQuantity={cartQuantity}
        onDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        onNavigateToCart={() => navigate('/cart')}
      />

      <Drawer
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        categories={categories}
        onMenuClick={handleMenuClick}
        activeMenu={activeMenu}
        menuOption={menuOption}
        drawerWidth={drawerWidth}
        onActiveMenu={() => setActiveMenu(!activeMenu)}
      />

      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
        <Stack p={3}>
          <Toolbar />
        </Stack>
        <Container>{children}</Container>
        <Toolbar />
      </Box>

      <Alert />
    </Box>
  );
};
