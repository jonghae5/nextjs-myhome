import React from 'react';
import CompareFormContent from './CompareFormContent';
import { Grid } from '@mui/material';

const CompareFormFirst = () => {
  const first = ['주거비', '생필품비', '양육비', '의류비'];
  return (
    <Grid container spacing={0.5}>
      {first.map(first => (
        <Grid item xs={12} sm={6} key={`grid-${first}`}>
          <CompareFormContent content={first} key={first} />
        </Grid>
      ))}
    </Grid>
  );
};
export default CompareFormFirst;
