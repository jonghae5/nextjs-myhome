import React from 'react';
import CompareFormContent from './CompareFormContent';
import { Grid } from '@mui/material';
const CompareFormThird = () => {
  const third = ['통신비', '보험료', '경조사', '저축'];
  return (
    <Grid container spacing={0.5}>
      {third.map(third => (
        <Grid item xs={12} sm={6} key={`grid-${third}`}>
          <CompareFormContent content={third} key={third} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CompareFormThird;
