import React from 'react';
import { Box, Paper, Typography, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AbilityFormContent = ({ content }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
      <TextField
        sx={{ mr: 2 }}
        id={`input-${content}`}
        fullWidth
        label={content}
        variant='standard'
      />
    </Box>
  );
};

export default AbilityFormContent;
