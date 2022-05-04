import React, { useState } from 'react';
import {
  Content,
  ThemeProvider,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  AppBar,
} from '@mui/material';
import theme from '../theme/theme';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// static
const ResponsiveFooter = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position='fixed' style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation
          sx={{
            justifyContent: 'space-between',
            color: 'white',
            boxShadow: 15,
          }}
        >
          <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
          <BottomNavigationAction label='Calculates' icon={<CalculateIcon />} />
          <BottomNavigationAction label='Location' icon={<LocationOnIcon />} />
        </BottomNavigation>
      </AppBar>
    </ThemeProvider>
  );
};

export default ResponsiveFooter;
