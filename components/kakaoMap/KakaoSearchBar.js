import React from 'react';
import { Grid, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const KakaoSearchBar = ({ setSearchValue, textInput, handleSubmitKeyword }) => {
  return (
    <>
      <Grid
        container
        direction={'row'}
        justifyContent='flex-start'
        sx={{ boxShadow: 1 }}
      >
        <Grid item xs={11}>
          <TextField
            inputRef={textInput}
            onInput={e => {
              setSearchValue(e.target.value);
            }}
            // variant='standard'
            placeholder='주소를 입력해주세요.'
            size='small'
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleSubmitKeyword}>
            <SearchIcon style={{ fill: 'black' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default KakaoSearchBar;
