import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const KakaoMapInfoTable = () => {
  const { clickedMarker } = useSelector(state => state.map);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {clickedMarker && (
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align='right'>아파트</TableCell>
                <TableCell align='right'>거래금액</TableCell>
                <TableCell align='right'>거래일</TableCell>
                <TableCell align='right'>전용면적</TableCell>
                <TableCell align='right'>층</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clickedMarker && clickedMarker.length > 0 ? (
                clickedMarker
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(({ 아파트, 전용면적, 거래금액, 년, 월, 일, 층 }, i) => (
                    <TableRow key={i}>
                      <TableCell component='th' scope='row'>
                        {page * rowsPerPage + i + 1}
                      </TableCell>
                      <TableCell align='right'>{아파트}</TableCell>
                      <TableCell align='right'>{거래금액}</TableCell>
                      <TableCell align='right'>
                        {년 + '.' + 월 + '.' + 일}
                      </TableCell>
                      <TableCell align='right'>{전용면적}</TableCell>
                      <TableCell align='right'>{층}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <CircularProgress
                  sx={{
                    position: 'absolute',
                    mt: '50%',
                    ml: '50%',
                    zIndex: 5,
                  }}
                />
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={
                    clickedMarker ? (
                      clickedMarker.length
                    ) : (
                      <CircularProgress
                        sx={{
                          position: 'absolute',
                          mt: '50%',
                          ml: '50%',
                          zIndex: 5,
                        }}
                      />
                    )
                  }
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  // onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default KakaoMapInfoTable;
