import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
const CompareFormThird = ({ formName = 'compare' }) => {
  const third = ['통신비', '보험료', '경조사', '저축'];

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='h6' component='div'>
            기존 대출 금액
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='통신비'
            name={`${formName}.communicationThird`}
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
            label='보험료'
            name={`${formName}.insuranceThird`}
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
            label='경조사'
            name={`${formName}.gitfThird`}
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
            label='저축'
            name={`${formName}.savingThird`}
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

export default CompareFormThird;
