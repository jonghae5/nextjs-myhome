import React from 'react';
import AbilityFormContent from './AbilityFormContent';
import { Grid } from '@mui/material';
const AbilityFormHome = () => {
  const home = ['전월세보증금', '주택매매시세'];
  return (
    <Grid container spacing={0.5}>
      {home.map(home => (
        <Grid item xs={12} sm={6} key={`grid-${home}`}>
          <AbilityFormContent content={home} id='' key={home} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AbilityFormHome;
