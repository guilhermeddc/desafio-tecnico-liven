import React from 'react';

import {ArrowDropDownRounded, ArrowDropUpRounded} from '@mui/icons-material';
import {Button, Stack} from '@mui/material';

interface IProps {
  onClick(): void;
  active: boolean;
}

export const MenuSelected: React.FC<IProps> = ({onClick, active, children}) => {
  return (
    <Button
      onClick={onClick}
      startIcon={
        <Stack direction={active ? 'column-reverse' : 'column'}>
          <ArrowDropUpRounded
            fontSize="large"
            sx={active ? {mt: -1.4} : {mb: -1.4}}
          />
          <ArrowDropDownRounded
            fontSize="large"
            sx={active ? {mb: -1.4} : {mt: -1.4}}
          />
        </Stack>
      }
      sx={{
        transition: 'all 0.2s ease-in-out',
        color: 'secondary.main',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'unset',
        ':hover': {
          opacity: 0.8,
        },
      }}>
      {children}
    </Button>
  );
};
