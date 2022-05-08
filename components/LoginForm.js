import {
  Button,
  Container,
  getFilledInputUtilityClass,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { TextField } from 'formik-mui';
import React, { useEffect } from 'react';
import { loginSchema } from '../util/loginSchema';
import { useRouter } from 'next/router';

import { useSession, signIn, signOut } from 'next-auth/react';

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
  const router = useRouter();
  const { data: session, status } = useSession();
  //   status === "authenticated" ?
  useEffect(() => {
    console.log(session);
    console.log(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID);
  }, [session]);
  //   const [session, loading] = useSession();
  //   if (typeof window !== 'undefined' && loading) return null;

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

                <Grid container spacing={0.5} justifyContent='space-around'>
                  <Grid item xs={6}>
                    {!session && (
                      <Button onClick={() => signIn('naver')} sx={{ mt: 0.2 }}>
                        <img
                          src='/static/images/btnG_완성형.png'
                          width='240'
                          height='56'
                          alt='네이버 로그인 버튼'
                        />
                      </Button>
                    )}
                    {session && (
                      <>
                        <Button
                          onClick={() => signOut('naver')}
                          sx={{ mt: 0.2 }}
                        >
                          <img
                            src='/static/images/btnG_로그아웃.png'
                            width='240'
                            height='56'
                            alt='네이버 로그인 버튼'
                          />
                        </Button>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {!session && (
                      <Button onClick={() => signIn('kakao')} sx={{ mt: 0.2 }}>
                        <img
                          src='/static/images/kakao_login_large_narrow.png'
                          width='240'
                          height='56'
                          alt='카카오 로그인 버튼'
                        />
                      </Button>
                    )}
                    {session && (
                      <>
                        <Typography onClick={() => signOut('kakao')}>
                          카카오 로그인 해제
                        </Typography>
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
