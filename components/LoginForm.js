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

const validateEmail = value => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const kakaoLogin = useCallback(async () => {
    await dispatch(asyncKakaoLogin());
  });
  const router = useRouter();
  const session = false;
  return (
    <>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Formik
            initialValues={{}}
            onSubmit={v => console.log(v)}
            validationSchema={loginSchema}
          >
            {props => (
              <Form>
                <Field
                  label='email'
                  name='email'
                  component={TextField}
                  sx={{ mr: 2 }}
                  fullWidth
                  variant='standard'
                  validate={{}}
                />
                <Field
                  type='password'
                  label='password'
                  name='password'
                  component={TextField}
                  sx={{ mr: 2 }}
                  fullWidth
                  variant='standard'
                  validate={{}}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3 }}
                  disabled={!(props.dirty && props.isValid)}
                >
                  Login
                </Button>

                <Typography component='div' sx={{ mt: 1 }} textAlign='center'>
                  회원이 아니신가요?
                </Typography>

                <Button
                  onClick={() => {
                    router.push('/signup');
                  }}
                  fullWidth
                  variant='contained'
                  sx={{ mt: 1 }}
                >
                  회원가입
                </Button>

                <Grid container spacing={0.5} justifyContent='space-between'>
                  <Grid item xs={6} sm={6} textAlign='center'>
                    {!session && (
                      <Button onClick={{}} sx={{ mt: 0.2 }}>
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
                    )}
                    {session && (
                      <>
                        <Button onClick={{}} sx={{ mt: 0.2 }}>
                          <Box
                            component='img'
                            sx={{
                              height: 45,
                              width: 200,
                              maxHeight: { xs: 40, sm: 70 },
                              maxWidth: { xs: 150, sm: 240 },
                            }}
                            alt='네이버 로그아웃 버튼'
                            src='/static/images/btnG_로그아웃.png'
                          />
                        </Button>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6} textAlign='center'>
                    {!session && (
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
                    )}
                    {session && (
                      <>
                        <Typography onClick={{}}>카카오 로그인 해제</Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </>
  );
};

export default LoginForm;
