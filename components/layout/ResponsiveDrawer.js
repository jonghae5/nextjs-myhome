import React, { useReducer, useState, useCallback } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
  Button,
  Drawer,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import BalanceIcon from '@mui/icons-material/Balance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const ResponsiveDrawer = ({ toggleDrawer }) => {
  const router = useRouter();
  const { id, nickname } = useSelector(state => state.user.data);
  const moveLogin = useCallback(() => {
    router.push('/login');
  });
  const moveLogout = useCallback(() => {
    router.push('http://localhost:3065/auth/logout');
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
  return (
    <>
      <Box
        sx={{ width: 200 }}
        role='presentation'
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <Typography
          variant='h6'
          noWrap
          component='div'
          color='#000000'
          textAlign='center'
          sx={{ mt: 1 }}
        >
          부린이
        </Typography>
        <Typography
          variant='h6'
          noWrap
          component='div'
          color='#000000'
          textAlign='center'
          sx={{ mb: 1 }}
        >
          {nickname}
        </Typography>
        <Divider />
        {!id ? (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={moveLogin}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='login' />
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={moveLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='logout' />
              </ListItemButton>
            </ListItem>
          </List>
        )}

        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => movePage('주택구매능력')}>
              <ListItemIcon>
                <BalanceIcon />
              </ListItemIcon>
              <ListItemText primary='주택 구매 능력' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => movePage('소득지출비교')}>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary='소득 지출 비교' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push('/study')}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary='부동산 공부' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default ResponsiveDrawer;
