// import Head from 'next/head';
// import Image from 'next/image';
import { Toolbar, Typography, Fab, Container, Paper, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoadMyInfo } from '../slices/userSlice';
import { useSelect } from '@mui/base';
import KakaoMap from '../components/KakaoMap';

export default function Home() {
  const router = useRouter();
  const { id, abilityWrite, compareWrite } = useSelector(
    state => state.user.data
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadMyInfo());
  }, [dispatch]);

  let win;
  useEffect(() => {
    win = typeof window !== 'undefined' ? window : undefined;
  }, []);

  return (
    <>
      <AppLayout>
        <KakaoMap></KakaoMap>

        <ScrollTop window={win}>
          <Fab size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </AppLayout>
    </>
  );
}
