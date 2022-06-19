import React from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import { Typography, Grid, Divider, Paper, useMediaQuery } from '@mui/material';
import KakaoMapInfoTable from './KakaoMapInfoTable';
import { useSelector } from 'react-redux';
import KakaoMapChart from './KakaoMapChart';
// import { DataGrid } from '@mui/x-data-grid';
// import MUIDataTable from 'mui-datatables';

const KakaoMapInformation = ({ toggleInfoZoom, setInfoZoom }) => {
  // Media Query
  const { clickedMarker, markers } = useSelector(state => state.map);
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Typography
      component='div'
      sx={{
        height: matches ? '100vh' : '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: 'black',
        position: 'absolute',
        zIndex: 5,
        top: '0px',
        left: '0px',
      }}
      className='info-item-mount'
    >
      <Grid
        container
        justifyContent='flex-start'
        alignItems='center'
        direction='row-reverse'
      >
        <Grid item xs={1} md={1} textAlign='center'>
          <ClearIcon
            sx={{ fontSize: '28px' }}
            onClick={() => setInfoZoom(false)}
          />
        </Grid>
        <Grid item xs={10} md={10} textAlign='center'>
          <Typography>상세 내용</Typography>
        </Grid>
      </Grid>
      <Divider />

      {/* <Paper elevation={3} sx={{ mt: 3, p: 1, height: 200 }}>
        hello
      </Paper> */}
      <KakaoMapChart />
      <Divider />
      <KakaoMapInfoTable />
    </Typography>
  );
};

export default KakaoMapInformation;
