import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveFooter from './ResponsiveFooter';
import { Paper, Container, Box } from '@mui/material';
const AppLayout = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      {children}
      <Box paddingBottom='72px'></Box>
      <ResponsiveFooter />
    </>
  );
};

export default AppLayout;
