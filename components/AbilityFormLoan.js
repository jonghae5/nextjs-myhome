import React from 'react';
import AbilityFormContent from './AbilityFormContent';
import { Grid } from '@mui/material';
const AbilityFormLoan = () => {
  const loan = [
    '전월보증대출',
    '주택담보대출',
    '임차인보증금',
    '신용대출',
    '사업자/회사복지대출',
    '학자금대출',
    '기타대출',
  ];
  return (
    <Grid container spacing={0.5}>
      {loan.map(loan => (
        <Grid item xs={12} sm={6} key={`grid-${loan}`}>
          <AbilityFormContent content={loan} id='' key={loan} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AbilityFormLoan;
