import React, { useEffect } from 'react';
import { Box, Paper, Typography, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useInput from '../hooks/useInput';
const AbilityFormContent = ({ content, id = `ability-${content}` }) => {
  const [contents, OnChangeContents] = useInput('');

  //   useEffect(() => {
  //     console.log(contents);
  //   }, [contents]);
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
      <TextField
        sx={{ mr: 2 }}
        id={`input-${content}`}
        fullWidth
        label={content}
        variant='standard'
        value={contents}
        onChange={OnChangeContents}
      />
    </Box>
  );
};

export default AbilityFormContent;
