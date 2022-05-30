import { Box, Paper, Container, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import WriteForm from '../../components/WriteForm';
const AbilityLogin = () => {
  const { id, nickname } = useSelector(state => state.user.data);
  return (
    <AppLayout>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='div' sx={{ textAlign: 'center', mb: 3 }}>
            {nickname}님은 <br />
            이미 로그인 되어 있습니다.
          </Typography>
          <Box sx={{ display: 'flex', columnGap: 4 }} justifyContent={'center'}>
            <Link href='/ability'>
              <Button variant='outlined'>데이터 수정</Button>
            </Link>
            <Link href={`/ability/result/${id}`}>
              <Button variant='contained'>결과 보기</Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default AbilityLogin;
