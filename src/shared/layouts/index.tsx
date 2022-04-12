import React, {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';

import {CloseRounded, Menu} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer as MuiDrawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import {logo} from 'shared/assets';
import {ListItemMenu, MenuSelected} from 'shared/components';
import {useCart} from 'shared/hooks';
import {productService} from 'shared/services/api/productService';

const drawerWidth = 400;

interface IProps {
  window?: () => Window;
}

export const LayoutBase: React.FC<IProps> = ({children, window}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [menuOption, setMenuOption] = useState('Shop all');

  const navigate = useNavigate();
  const {cartQuantity} = useCart();

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

  const drawer = (
    <Stack p={3} height="100vh">
      <Toolbar>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          sx={{justifyContent: {sm: 'center', xs: 'space-between'}}}>
          <div>
            <img src={logo} alt="logo Liven" width={120} />
          </div>

          <IconButton
            color="secondary"
            onClick={handleDrawerToggle}
            sx={{display: {sm: 'none'}}}>
            <CloseRounded />
          </IconButton>
        </Stack>
      </Toolbar>

      <Stack height="100%" justifyContent="space-between">
        <Toolbar />

        <Stack spacing={3}>
          <Stack sx={{transition: 'all 1s', opacity: activeMenu ? 1 : 0}}>
            <ListItemMenu
              label="Shop all"
              onClick={() => handleMenuClick('Shop all')}
              link="/"
            />

            {categories?.map((category) => (
              <ListItemMenu
                label={category}
                key={category}
                onClick={() =>
                  handleMenuClick(
                    category[0].toUpperCase() + category.substring(1),
                  )
                }
                link={`/category/${category.replace(' ', '-')}`}
              />
            ))}
          </Stack>

          <MenuSelected
            onClick={() => setActiveMenu((state) => !state)}
            active={activeMenu}>
            {menuOption}
          </MenuSelected>
        </Stack>
      </Stack>
    </Stack>
  );

  const container = useMemo(
    () => (window !== undefined ? () => window().document.body : undefined),
    [window],
  );

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
          bgcolor: 'background.default',
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
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}>
              <Menu />
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
            <IconButton onClick={() => navigate('/cart')}>
              <Avatar sx={{bgcolor: 'primary.main'}}>{cartQuantity}</Avatar>
            </IconButton>
          </Toolbar>
        </Stack>
      </AppBar>

      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="mailbox folders">
        <MuiDrawer
          container={container}
          color="transparent"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              bgcolor: 'background.default',
              border: 'none',
              boxSizing: 'border-box',
              width: '100%',
            },
          }}>
          {drawer}
        </MuiDrawer>

        <MuiDrawer
          variant="permanent"
          color="transparent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              bgcolor: 'background.default',
              border: 'none',
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </MuiDrawer>
      </Box>

      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
        <Stack p={3}>
          <Toolbar />
        </Stack>
        <Container>{children}</Container>
        <Toolbar />
      </Box>
    </Box>
  );
};
