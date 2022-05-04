import React from 'react';
import { Grid, Box } from '@mui/material';
import useInput from '../hooks/useInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
const CompareFormSecond = ({ formName = 'compare' }) => {
  const second = ['외식비', '여가비', '개인용돈'];

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='외식비'
            name={`${formName}.eatOutSecond`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='여가비'
            name={`${formName}.leisureSecond`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='개인용돈'
            name={`${formName}.pinMoneySecond`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompareFormSecond;
