// import Head from 'next/head';
// import Image from 'next/image';
import { Toolbar, Typography, Fab, Container, Paper, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';

const paperSX = {
  boxShadow: 3,
  '&:hover': {
    boxShadow: 10,
  },
  my: { xs: 3, md: 6 },
  p: { xs: 2, md: 3 },
};
export default function Home() {
  const router = useRouter();
  // 예시
  // const arr = [];
  // for (let i = 0; i < 50; i++) {
  //   arr.push(i);
  // }

  let win;
  useEffect(() => {
    win = typeof window !== 'undefined' ? window : undefined;
  }, []);
  const goAbility = useCallback(() => {
    router.push('/ability');
  });
  const goCompare = useCallback(() => {
    router.push('/compare');
  });
  return (
    <>
      <AppLayout>
        <Container>
          <Paper sx={paperSX} onClick={goAbility}>
            <Typography
              component='div'
              variant='h6'
              sx={{ textAlign: 'center' }}
            >
              주택 구매 능력
            </Typography>
            <Box
              component='img'
              sx={{
                height: '10%',
                width: '100%',
                maxHeight: { xs: 200, sm: 400 },
                maxWidth: { xs: 1000, sm: 2000 },
              }}
              alt='주택구매능력'
              src='static/images/주택구매능력.png'
              id='back-to-top-anchor'
            />
          </Paper>

          <Paper sx={paperSX} onClick={goCompare}>
            <Typography
              component='div'
              variant='h6'
              sx={{ textAlign: 'center' }}
            >
              소득 지출 비교
            </Typography>
            <Box
              component='img'
              sx={{
                height: '10%',
                width: '100%',
                maxHeight: { xs: 200, sm: 400 },
                maxWidth: { xs: 1000, sm: 2000 },
              }}
              alt='소득지출비교'
              src='static/images/소득지출비교.png'
            />
          </Paper>

          <ScrollTop window={win}>
            <Fab size='small' aria-label='scroll back to top'>
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Container>
      </AppLayout>
    </>
  );
}
