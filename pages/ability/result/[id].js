import { Typography, Paper, Container } from '@mui/material';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../../components/layout/AppLayout';
import ResultForm from '../../../components/ResultForm';
import KakaoMap from '../../../components/KakaoMap';
const generateRandomString = () => Math.random().toString(36).slice(2);

const AbilityResult = () => {
  const state = useSelector(state => state.ability.data);
  // 투자 가능 금액 = 현금성 자산 + 주택 관련 자금 - 기존 대출 금액
  // 추가대출능력 30년 기준 저축액 * 30 / (금리)
  // 전세감당능력 30년 기준 저축액 * 30 / (금리 * 2)
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

  return (
    <AppLayout>
      <ResultForm title='주택 구매력' content='우리 가족 구매 최대치'>
        <Typography component='div'>투자가능금액: {allowMoney}</Typography>
        <Typography component='div'>추가대출능력: {allowLoan}</Typography>
        <Typography component='div'>전세감당능력: {allowJeonse}</Typography>
        <Typography component='div'>구매가능금액: {allow}</Typography>
        <KakaoMap />
      </ResultForm>
    </AppLayout>
  );
};

export default AbilityResult;
