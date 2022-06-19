import React, { useEffect, useState, useCallback } from 'react';
import { Paper, Typography } from '@mui/material';
import { useMediaQuery, Divider, Grid, Item } from '@mui/material';
import { CSSTransition } from 'react-transition-group';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';
// Batch 기능 방지
import { flushSync } from 'react-dom';
import { useSelector } from 'react-redux';

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const KakaoMapInfoItem = ({ toggleInfoZoom, setToggleInfo }) => {
  const { clickedMarker, markers, addMarkerDetailInfoLoading } = useSelector(
    state => state.map
  );

  // Media Query
  const matches = useMediaQuery('(min-width:600px)');

  const [effect, setEffect] = useState(`info-item-mount`);
  const [transportData, setTransportData] = useState(null);
  const onClickClose = useCallback(() => {
    setEffect(`info-item-unmount`);
  });

  useEffect(() => {
    if (effect == `info-item-unmount`) {
      const timer = setTimeout(() => setToggleInfo(false), 500);

      return () => clearTimeout(timer);
    }
  }, [effect]);

  return (
    <>
      {addMarkerDetailInfoLoading ? (
        <CircularProgress
          sx={{ position: 'absolute', mt: '50%', ml: '50%', zIndex: 5 }}
        />
      ) : (
        <Paper
          variant='outlined'
          sx={{
            zIndex: 3,
            position: 'relative',
            bottom: matches ? 200 : 250,
            height: matches ? 200 : 250,
          }}
          className={effect}
        >
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={1} md={1} textAlign='center'>
              <KeyboardArrowUpIcon
                sx={{ fontSize: '32px' }}
                onClick={toggleInfoZoom}
              />
            </Grid>
            <Grid item xs={10} md={10} textAlign='center'>
              <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>
                🏠&nbsp;{clickedMarker && clickedMarker[0]?.아파트}
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                {clickedMarker && clickedMarker[0]?.법정동}{' '}
                {clickedMarker && clickedMarker[0]?.지번}
              </Typography>
            </Grid>
            <Grid item xs={1} md={1} textAlign='center'>
              <ClearIcon sx={{ fontSize: '28px' }} onClick={onClickClose} />
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            spacing={1}
            alignItems='center'
            justifyContent='center'
            direction='column'
            height='150px'
          >
            <Grid item>
              <Typography textAlign='center'>
                🗓&nbsp; 건축년도 {clickedMarker && clickedMarker[0]?.건축년도}년
              </Typography>
            </Grid>
            <Grid item>
              <Typography textAlign='center'>
                🔁 󠀠󠀠&nbsp;최근 아파트 거래 건수{' '}
                {clickedMarker && clickedMarker?.length}건
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default KakaoMapInfoItem;
