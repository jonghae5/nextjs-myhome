import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

const marks = [
  {
    value: 30,
    label: '30㎡',
  },
  {
    value: 60,
    label: '60㎡',
  },
  {
    value: 90,
    label: '90㎡',
  },
  {
    value: 120,
    label: '120㎡',
  },
  {
    value: 150,
    label: '150㎡',
  },
];

const KakaoFilter = ({ filterList, squareValue, handleSquareValue }) => {
  return (
    <>
      <Box
        component='div'
        sx={{ px: 1, display: filterList ? 'block' : 'none', boxShadow: 1 }}
      >
        <Typography sx={{ pl: 1, pt: 1 }} gutterBottom>
          전용 면적
        </Typography>
        <Slider
          //   aria-label='평'
          defaultValue={[10, 150]}
          value={squareValue}
          // getAriaValueText={valuetext}
          valueLabelDisplay='auto'
          step={10}
          min={10}
          max={150}
          sx={{ width: '80%', ml: 6 }}
          disableSwap
          onChange={handleSquareValue}
          marks={marks}
        />
      </Box>
    </>
  );
};

export default KakaoFilter;
