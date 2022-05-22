import { Typography, Paper, Container, Grid, Button } from '@mui/material';

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../../components/layout/AppLayout';
import ResultForm from '../../../components/ResultForm';
import KakaoMap from '../../../components/KakaoMap';
import { useRouter } from 'next/router';
import {
  asyncGetAbilityResult,
  asyncLoadMyInfo,
} from '../../../slices/userSlice';

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const AbilityResult = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const { allowMoney, allowLoan, allowJeonse, allow } = useSelector(
    state => state.user.ability.result
  );
  const goKakaoMap = useCallback(() => {
    router.push('/map');
  });
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    // console.log(id);
    dispatch(asyncLoadMyInfo());
  }, [id]);

  return (
    <AppLayout>
      <ResultForm title='주택 구매력' content='우리 가족 구매 최대치'>
        <Grid container spacing={0} justifyContent='space-around'>
          <Grid item xs={12}>
            <Typography component='div'>
              투자 가능 금액: {priceToString(allowMoney)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='div'>
              추가 대출 능력: {priceToString(allowLoan)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='div'>
              전세 감당 능력: {priceToString(allowJeonse)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='div'>
              구매 가능 금액: {priceToString(allow)}
            </Typography>
          </Grid>
          <Button onClick={goKakaoMap}>카카오 지도 클릭</Button>
        </Grid>
      </ResultForm>
    </AppLayout>
  );
};

export default AbilityResult;
