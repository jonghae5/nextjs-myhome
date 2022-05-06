import { Button, Container, Paper, Typography } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import { loginSchema } from '../util/loginSchema';
import { useRouter } from 'next/router';
// const validateEmail = value => {
//   let error;
//   if (!value) {
//     error = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     error = 'Invalid email address';
//   }
//   return error;
// };
const LoginForm = () => {
  const router = useRouter();
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
            </Form>
          </Formik>
        </Paper>
      </Container>
    </>
  );
};

export default LoginForm;
