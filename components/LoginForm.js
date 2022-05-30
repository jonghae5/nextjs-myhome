import {
  Button,
  Container,
  getFilledInputUtilityClass,
  Paper,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { TextField } from 'formik-mui';
import React, { useCallback, useEffect } from 'react';
import { loginSchema } from '../util/loginSchema';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { asyncKakaoLogin } from '../slices/userSlice';
import Link from 'next/link';

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid
            direction='column'
            container
            spacing={0.5}
            justifyContent='space-between'
          >
            <Grid item xs={6} sm={6} textAlign='center'>
              <Link href='http://localhost:3065/auth/naver'>
                <a>
                  <Button sx={{ mt: 0.2 }}>
                    <Box
                      component='img'
                      sx={{
                        height: 45,
                        width: 200,
                        maxHeight: { xs: 40, sm: 70 },
                        maxWidth: { xs: 150, sm: 240 },
                      }}
                      alt='네이버 로그인 버튼'
                      src='/static/images/btnG_완성형.png'
                    />
                  </Button>
                </a>
              </Link>
            </Grid>
            <Grid item xs={6} sm={6} textAlign='center'>
              <Link href='http://localhost:3065/auth/kakao'>
                <a>
                  <Button sx={{ mt: 0.2 }}>
                    <Box
                      component='img'
                      sx={{
                        height: 45,
                        width: 200,
                        maxHeight: { xs: 40, sm: 70 },
                        maxWidth: { xs: 150, sm: 240 },
                      }}
                      alt='카카오 로그인 버튼'
                      src='/static/images/kakao_login_large_narrow.png'
                    />
                  </Button>
                </a>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default LoginForm;
