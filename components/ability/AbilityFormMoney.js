import React, { useState } from 'react';
import {
  Grid,
  Box,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { handleEnter } from '../../util/handleEnter';
const AbilityFormMoney = ({ formName = 'ability' }) => {
  const money = [
    '주식',
    '가상화폐',
    '예금적금',
    '보험해약금',
    '퇴직금정산',
    '기타자산',
  ];
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    console.log('클릭', open);
    setOpen(!open);
  };
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='h6' component='div'>
            현금성 자산
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography component='div'>3개월 이내 현금화 가능</Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='주식'
            name={`stockMoney`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            // inputProps={{
            //   inputMode: 'numeric',
            //   pattern: '[0-9]*',
            // }}
            onKeyPress={handleEnter}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='가상화폐'
            name={`bitcoinMoney`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            // inputProps={{
            //   inputMode: 'numeric',
            //   pattern: '[0-9]*',
            // }}
            onKeyPress={handleEnter}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='저축'
            name={`savingMoney`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            // inputProps={{
            //   inputMode: 'numeric',
            //   pattern: '[0-9]*',
            // }}
            onKeyPress={handleEnter}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='보험해약금'
            name={`insuranceMoney`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            // inputProps={{
            //   inputMode: 'numeric',
            //   pattern: '[0-9]*',
            // }}
            onKeyPress={handleEnter}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='퇴직금정산'
            name={`severanceMoney`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            // inputProps={{
            //   inputMode: 'numeric',
            //   pattern: '[0-9]*',
            // }}
            onKeyPress={handleEnter}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='기타자산'
            name={`etcMoney`}
            component={TextField}
            sx={{ mr: 2 }}
            fullWidth
            variant='standard'
            type='number'
            // inputProps={{
            //   inputMode: 'numeric',
            //   pattern: '[0-9]*',
            // }}
            onKeyPress={handleEnter}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AbilityFormMoney;
