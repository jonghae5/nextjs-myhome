import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Container,
  Divider,
  Grid,
} from '@mui/material';
import { fontWeight } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import AppLayout from '../components/layout/AppLayout';

const dataOne = [
  {
    title: '신성철님 시계공의 망명지',
    url: 'https://blog.naver.com/thebeing',
  },
  {
    title: '빠숑의 세상답사기',
    url: 'https://blog.naver.com/ppassong/',
  },
  {
    title: '오윤섭의 부자노트',
    url: 'https://blog.naver.com/rpartners01',
  },
  {
    title: '부룡의 부동산지식공작소',
    url: 'https://blog.naver.com/shk7611',
  },
];

const dataTwo = [
  {
    title: `루트원's 투자이야기`,
    url: 'https://blog.naver.com/cocorush3',
  },
  {
    title: '까르의 서울 재개발분석',
    url: 'https://blog.naver.com/jmd0104',
  },
  {
    title: '하우징포스트',
    url: 'https://blog.naver.com/housingpost',
  },
  {
    title: '서후아빠의 동행',
    url: 'https://blog.naver.com/patience53',
  },
  {
    title: '훈훈한세상의 부동산세상',
    url: 'https://blog.naver.com/hanshch',
  },
];

const dataThree = [
  {
    title: '해안선의 투자스토리',
    url: 'https://blog.naver.com/sungwoo9111',
  },
  {
    title: '월용이의 부동산일지',
    url: 'https://blog.naver.com/sunman30',
  },
  {
    title: '청약의 신, 아임해피',
    url: 'https://blog.naver.com/iammentor',
  },
  {
    title: '열정로즈의 내꿈사',
    url: 'https://blog.naver.com/suki9912',
  },
];

const Study = () => {
  const [alignment, setAlignment] = useState('부동산일반');
  const handleChange = (event, newAlignment) => {
    // event.preventDefault();
    setAlignment(newAlignment);
  };

  const router = useRouter();
  const movePage = value => {
    if (!window) {
      return;
    }
    // router.push(value);
    window.open(value);
  };

  return (
    <AppLayout>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <ToggleButtonGroup
            color='primary'
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value='부동산일반'>부동산일반</ToggleButton>
            <ToggleButton value='재건축재개발'>재건축재개발</ToggleButton>
            <ToggleButton value='분양전문'>분양전문</ToggleButton>
          </ToggleButtonGroup>
          {alignment === '부동산일반' &&
            dataOne.map(state => (
              <Grid
                container
                direction='row'
                sx={[{ mt: 1, fontSize: '16px' },  {
                  '&:hover': {
                    cursor: 'pointer',
                    boxShadow: 2,
                  }}]}
                onClick={() => movePage(state.url)}
              >
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{ color: '#1565c0', fontWeight: 'medium', mt: 1 }}
                >
                  #{alignment}
                </Grid>
                <Grid item xs={9} sm={9} sx={{ my: 1 }}>
                  {state.title}
                </Grid>
                <Divider style={{ width: '100%' }} />
              </Grid>
            ))}

          {alignment === '재건축재개발' &&
            dataTwo.map(state => (
              <Grid
                container
                direction='row'
                sx={[{ mt: 1, fontSize: '16px' },  {
                  '&:hover': {
                    cursor: 'pointer',
                    boxShadow: 2,
                  }}]}
                onClick={() => movePage(state.url)}
              >
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{ color: '#1565c0', fontWeight: 'medium', mt: 1 }}
                >
                  #{alignment}
                </Grid>
                <Grid item xs={9} sm={9} sx={{ my: 1 }}>
                  {state.title}
                </Grid>
                <Divider style={{ width: '100%' }} />
              </Grid>
            ))}

          {alignment === '분양전문' &&
            dataThree.map(state => (
              <Grid
                container
                direction='row'
                sx={[{ mt: 1, fontSize: '16px' },  {
                  '&:hover': {
                    cursor: 'pointer',
                    boxShadow: 2,
                  }}]}
                onClick={() => movePage(state.url)}
              >
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{ color: '#1565c0', fontWeight: 'medium', mt: 1 }}
                >
                  #{alignment}
                </Grid>
                <Grid item xs={9} sm={9} sx={{ my: 1 }}>
                  {state.title}
                </Grid>
                <Divider style={{ width: '100%' }} />
              </Grid>
            ))}
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default Study;
