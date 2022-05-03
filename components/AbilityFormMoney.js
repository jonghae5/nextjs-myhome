import React from 'react';
import AbilityFormContent from './AbilityFormContent';
import { Grid } from '@mui/material';
const AbilityFormMoney = () => {
  const money = [
    '연소득',
    '저축률',
    '주식',
    '가상화폐',
    '예금적금',
    '보험해약금',
    '퇴직금정산',
    '기타자산',
  ];
  return (
    <Grid container spacing={0.5}>
      {money.map(money => (
        <Grid item xs={12} sm={6} key={`grid-${money}`}>
          <AbilityFormContent content={money} id='' key={money} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AbilityFormMoney;
