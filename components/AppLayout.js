import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveFooter from './ResponsiveFooter';

const AppLayout = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      {children}
      <ResponsiveFooter />
    </>
  );
};

export default AppLayout;
