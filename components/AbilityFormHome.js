import React from 'react';
import { Grid, Box } from '@mui/material';
import useInput from '../hooks/useInput';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AbilityFormHome = ({ formName = 'ability' }) => {
  const home = ['전월세보증금', '주택매매시세'];

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={6}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
          <Field
            label='전월세보증금'
            name={`${formName}.jeonDepositHome`}
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
            label='주택매매시세'
            name={`${formName}.jutaekPriceHome`}
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
