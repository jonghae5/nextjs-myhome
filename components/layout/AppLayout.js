import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveFooter from './ResponsiveFooter';
import { Paper, Container, Box } from '@mui/material';
const AppLayout = ({ children }) => {
  return (
    <>
      <Container sx={{ paddingX: 0 }} maxWidth='sm'>
        <ResponsiveAppBar />
        {children}
        <Box paddingBottom='72px'></Box>
        {/* <ResponsiveFooter /> */}
      </Container>
    </>
  );
};

export default AppLayout;
