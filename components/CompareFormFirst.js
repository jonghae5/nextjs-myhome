import React from 'react';
import { Grid, Box } from '@mui/material';
import useInput from '../hooks/useInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
const CompareFormFirst = ({ formName = 'compare' }) => {
  const first = ['주거비', '생필품비', '양육비', '의류비'];

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='주거비'
            name={`${formName}.homeFirst`}
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
            label='생필품비'
            name={`${formName}.necessityFirst`}
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
            label='양육비'
            name={`${formName}.nurtureFirst`}
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
            label='의료비'
            name={`${formName}.clothFirst`}
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
export default CompareFormFirst;
