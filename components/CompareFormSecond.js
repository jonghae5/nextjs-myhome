import React from 'react';
import CompareFormContent from './CompareFormContent';
import { Grid } from '@mui/material';
const CompareFormSecond = () => {
  const second = ['외식비', '여가비', '개인용돈'];
  return (
    <Grid container spacing={0.5}>
      {second.map(second => (
        <Grid item xs={12} sm={6} key={`grid-${second}`}>
          <CompareFormContent content={second} key={second} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CompareFormSecond;
