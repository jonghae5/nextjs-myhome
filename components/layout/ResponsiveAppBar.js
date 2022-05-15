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
} from '@mui/material';
import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme/theme';
import { useSelector } from 'react-redux';

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const pages = ['주택구매능력', '소득지출비교']; // page
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout']; // setting
  const title = '내 집은 어디에';
  const { id } = useSelector(state => state.user.data);
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  });

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  });

  const movePage = useCallback(page => {
    switch (page) {
      case '주택구매능력':
        if (id) {
          return router.push('/ability/login');
        } else {
          return router.push('/ability');
        }
      case '소득지출비교':
        return router.push('/compare');
    }
  });

  const moveHome = useCallback(() => {
    router.push('/');
  });
  const moveLogin = useCallback(() => {
    router.push('/login');
  });
  const moveLogout = useCallback(() => {
    router.push('http://localhost:3065/auth/logout');
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
        <Container sx={{ p: 0 }}>
          <Toolbar disableGutters>
            {/* md title */}
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Jalnan',
              }}
              color='#000000'
              onClick={moveHome}
            >
              {title}
            </Typography>

            {/* xs 박스 메뉴 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
                // backgroundColor='black'
              >
                <MenuIcon style={{ color: 'black' }} />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(page => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign='center'
                      onClick={() => movePage(page)}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              color='#000000'
              onClick={moveHome}
            >
              {title}
            </Typography>
            {/* md Box 메뉴 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  key={page}
                  onClick={() => movePage(page)}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* USER 메뉴 */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ marginRight: 0 }}
                >
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign='center'>Profile</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign='center'>Account</Typography>
                </MenuItem>
                {id ? (
                  <MenuItem onClick={moveLogout}>
                    <Typography textAlign='center' onClick={moveLogout}>
                      Logout
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={moveLogin}>
                    <Typography textAlign='center'>Login</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
