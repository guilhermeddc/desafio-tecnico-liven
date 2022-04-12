import React from 'react';
import {NavLink} from 'react-router-dom';

import {ListItem, ListItemText, Typography} from '@mui/material';

interface IProps {
  label: string;
  link: string;
  onClick(): void;
}

export const ListItemMenu: React.FC<IProps> = ({label, link, onClick}) => {
  return (
    <ListItem
      button
      onClick={onClick}
      to={link}
      component={NavLink as any}
      sx={{textDecoration: 'none'}}>
      <ListItemText
        primary={
          <Typography align="center" variant="h6" color="Background">
            {label[0].toUpperCase() + label.substring(1)}
          </Typography>
        }
      />
    </ListItem>
  );
};
