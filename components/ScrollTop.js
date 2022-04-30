import React, { useEffect } from 'react';
import { useScrollTrigger } from '@mui/material';
import { Zoom, Box } from '@mui/material';
const ScrollTop = props => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );
    console.log(anchor);
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 80, right: 23 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};
export default ScrollTop;
