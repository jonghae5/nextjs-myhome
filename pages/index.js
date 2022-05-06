// import Head from 'next/head';
// import Image from 'next/image';
import { Toolbar, Typography, Fab, Container } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';
import { useEffect } from 'react';

import AppLayout from '../components/layout/AppLayout';

export default function Home() {
  // 예시
  const arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(i);
  }

  let win;
  useEffect(() => {
    win = typeof window !== 'undefined' ? window : undefined;
  }, []);

  return (
    <>
      <AppLayout>
        <Container id='back-to-top-anchor'>안녕하시렵니까</Container>
        <Container>
          {arr.map(v => (
            <Typography key={v}>{v}</Typography>
          ))}
        </Container>
        <ScrollTop window={win}>
          <Fab size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </AppLayout>
    </>
  );
}
