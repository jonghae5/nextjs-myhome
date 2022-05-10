import { Typography, Paper, Container, Grid, Button } from '@mui/material';

import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../../components/layout/AppLayout';
import ResultForm from '../../../components/ResultForm';
import KakaoMap from '../../../components/KakaoMap';
import { useRouter } from 'next/router';

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const AbilityResult = () => {
  const router = useRouter();
  const state = useSelector(state => state.ability.data);
  // 투자 가능 금액 = 현금성 자산 + 주택 관련 자금 - 기존 대출 금액
  // 추가대출능력 30년 기준 저축액 * 30 / (금리)
  // 전세감당능력 30년 기준 저축액 * 30 / (금리 * 2)

  // Backend에서 다 가져가야 한다.
  const moneySum =
    state.stockMoney +
    state.bitcoinMoney +
    state.savingMoney +
    state.insuranceMoney +
    state.severanceMoney +
    state.etcMoney;

  const loanSum =
    state.schoolLoan +
    state.jutaekLoan +
    state.jeonWolLoan +
    state.businessLoan +
    state.tenantLoan +
    state.etcLoan +
    state.creditLoan;
  const homeSum = state.jeonDepositHome + state.jutaekPriceHome;

  const allowMoney = moneySum + homeSum - loanSum;

  const allowLoan =
    (state.yearMoney * (state.savingRatioMoney / 100) * 30) /
    state.mortgageLoan;
  const allowJeonse = allowLoan / 2;

  const allow = allowMoney + allowLoan + allowJeonse;

  const goKakaoMap = useCallback(() => {
    router.push('/ability/result/kakao');
  });
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
