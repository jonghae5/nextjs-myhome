import React, { useCallback, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  ThemeProvider,
  Drawer,
} from '@mui/material';
import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme/theme';
import { useSelector } from 'react-redux';
import ResponsiveDrawer from './ResponsiveDrawer';
import HomeIcon from '@mui/icons-material/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResponsiveAppBar = () => {
  const router = useRouter();
  const title = '내 집 마련';
  const { id } = useSelector(state => state.user.data);

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawer(state => !state);
  };

  const moveHome = useCallback(() => {
    router.push('/');
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position='sticky'
        style={{
          backgroundColor: '#FFFFFF',
          marginBottom: 0,
        }}
      >
        {/* <Container sx={{ p: 0 }}> */}
        <Toolbar disableGutters display='flex'>
          {/* xs 박스 메뉴 */} {/* md Box 메뉴 */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}> */}
          <IconButton
            size='large'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={toggleDrawer}
            color='inherit'
          >
            <MenuIcon style={{ color: 'black' }} />
          </IconButton>
          <Drawer anchor='left' open={drawer} onClose={toggleDrawer}>
            <ResponsiveDrawer toggleDrawer={toggleDrawer} />
          </Drawer>
          {/* </Box> */}
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'flex' },
              justifyContent: 'center',
              mr: 3,
            }}
            color='#000000'
            onClick={moveHome}
          >
            {title}
            <HomeIcon
              sx={{
                mt: 0.5,
                ml: 1,
                color: 'black',
              }}
            />
          </Typography>
        </Toolbar>

        {/* </Container> */}
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
