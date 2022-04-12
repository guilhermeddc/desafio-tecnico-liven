import React, {useMemo} from 'react';

import {CloseRounded} from '@mui/icons-material';
import {
  Box,
  Drawer as MuiDrawer,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import {logo} from 'shared/assets';
import {ListItemMenu, MenuSelected} from 'shared/components';

interface IProps {
  drawerWidth: number;
  window?: () => Window;
  activeMenu: boolean;
  onActiveMenu(): void;
  menuOption: string;
  mobileOpen: boolean;
  onDrawerToggle(): void;
  onMenuClick(value: string): void;
  categories?: string[];
}

export const Drawer: React.FC<IProps> = ({
  drawerWidth,
  window,
  activeMenu,
  menuOption,
  mobileOpen,
  onDrawerToggle,
  onMenuClick,
  onActiveMenu,
  categories,
}) => {
  const container = useMemo(
    () => (window !== undefined ? () => window().document.body : undefined),
    [window],
  );

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
            onClick={onDrawerToggle}
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
              onClick={() => onMenuClick('Shop all')}
              link="/"
            />

            {categories?.map((category) => (
              <ListItemMenu
                label={category}
                key={category}
                onClick={() =>
                  onMenuClick(category[0].toUpperCase() + category.substring(1))
                }
                link={`/category/${category.replace(' ', '-')}`}
              />
            ))}
          </Stack>

          <MenuSelected onClick={onActiveMenu} active={activeMenu}>
            {menuOption}
          </MenuSelected>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
      aria-label="mailbox folders">
      <MuiDrawer
        container={container}
        color="transparent"
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
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
  );
};
