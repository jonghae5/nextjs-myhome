import React from 'react';
import { Grid, Box } from '@mui/material';
import useInput from '../hooks/useInput';
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
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='전월보증대출'
            name={`${formName}.jeonWolLoan`}
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
            label='주택담보대출'
            name={`${formName}.jutaekLoan`}
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
            label='임차인보증금'
            name={`${formName}.tenantLoan`}
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
            label='신용대출'
            name={`${formName}.creditLoan`}
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
            label='사업자/회사복지대출'
            name={`${formName}.businessLoan`}
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
            label='학자금대출'
            name={`${formName}.schoolLoan`}
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
            label='기타대출'
            name={`${formName}.etcLoan`}
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

export default AbilityFormLoan;
