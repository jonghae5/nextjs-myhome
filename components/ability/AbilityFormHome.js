import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { handleEnter } from '../../util/handleEnter';
const AbilityFormHome = ({ formName = 'ability' }) => {
  const home = ['전월세보증금', '주택매매시세'];
  // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='h6' component='div'>
            주택 관련자금
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Typography component='div'>
            본인 거주 보증금, 보유 주택 시세
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='전월세보증금'
            name={`jeonDepositHome`}
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
            label='주택매매시세'
            name={`jutaekPriceHome`}
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

// return (
//     <Grid container spacing={0.5}>
//       {home.map((home, idx) => (
//         <Grid item xs={12} sm={6} key={`grid-${home}`}>
//           <AbilityFormContent
//             label={home}
//             key={home}
//             content={stateList[idx][0]}
//             onChangeContent={stateList[idx][1]}
//           />
//         </Grid>
//       ))}
//     </Grid>
//   );
export default AbilityFormHome;
