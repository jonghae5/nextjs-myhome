import React, { useState } from 'react';
import {
  Paper,
  ThemeProvider,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import theme from '../theme/theme';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// static
const ResponsiveFooter = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'white',
            boxShadow: 15,
          }}
        >
          <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
          <BottomNavigationAction label='Calculates' icon={<CalculateIcon />} />
          <BottomNavigationAction label='Location' icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
};

export default ResponsiveFooter;
