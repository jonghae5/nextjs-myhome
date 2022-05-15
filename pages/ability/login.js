import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import WriteForm from '../../components/WriteForm';
const AbilityLogin = () => {
  const { id } = useSelector(state => state.user.data);
  return (
    <AppLayout>
      <Typography component='div'>이미 로그인 되어 있습니다.</Typography>
      <Link href='/ability'>
        <a>
          <Button>데이터 수정</Button>
        </a>
      </Link>
      <Link href={`/ability/result/${id}`}>
        <a>
          <Button>결과 보러 가기</Button>
        </a>
      </Link>
    </AppLayout>
  );
};

export default AbilityLogin;
