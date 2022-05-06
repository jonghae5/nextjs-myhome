import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Field } from 'formik';
import { TextField } from 'formik-mui';

const AbilityFormLoan = ({ formName = 'ability' }) => {
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
            label='전월보증대출'
            name={`jeonWolLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='주택담보대출'
            name={`jutaekLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='임차인보증금'
            name={`tenantLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='신용대출'
            name={`creditLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='사업자/회사복지대출'
            name={`businessLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='학자금대출'
            name={`schoolLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='기타대출'
            name={`etcLoan`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AbilityFormLoan;
