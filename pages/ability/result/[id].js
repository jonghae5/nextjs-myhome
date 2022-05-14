import { Typography, Paper, Container, Grid, Button } from '@mui/material';

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../../components/layout/AppLayout';
import ResultForm from '../../../components/ResultForm';
import KakaoMap from '../../../components/KakaoMap';
import { useRouter } from 'next/router';
import { asyncGetAbilityResult } from '../../../slices/abilitySlice';

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const AbilityResult = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { allowMoney, allowLoan, allowJeonse, allow } = useSelector(
    state => state.ability.result
  );
  // 투자 가능 금액 = 현금성 자산 + 주택 관련 자금 - 기존 대출 금액
  // 추가대출능력 30년 기준 저축액 * 30 / (금리)
  // 전세감당능력 30년 기준 저축액 * 30 / (금리 * 2)

  // Backend에서 다 가져가야 한다.
  const goKakaoMap = useCallback(() => {
    router.push('/ability/result/kakao');
  });
  useEffect(() => {
    const { id } = router.query;
    // console.log(id);
    dispatch(asyncGetAbilityResult(id));
  }, []);

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
          <Button onClick={goKakaoMap}>클릭</Button>
          <KakaoMap />
        </Grid>
      </ResultForm>
    </AppLayout>
  );
};

export default AbilityResult;
