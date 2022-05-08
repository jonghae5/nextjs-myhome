import React, { useCallback } from 'react';
import { Container, Typography, Paper, Grid, Box, Button } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { TextField } from 'formik-mui';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import { asyncAddAbilityBasicInfo } from '../slices/abilitySlice';
import { asyncAddBasicCompare } from '../slices/compareSlice';
import { useDispatch } from 'react-redux';
import { abilityBasicFormSchema } from '../util/abilitySchema';

const WriteForm = ({ formName, title, initialValue }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = useCallback(async value => {
    if (formName === 'ability') {
      await dispatch(asyncAddAbilityBasicInfo(value));
      router.push('/ability/1');
    } else {
      await dispatch(asyncAddBasicCompare(value));
      router.push('/compare/1');
    }
  });

  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
      <Paper
        variant='outlined'
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography
          component='h1'
          variant='h6'
          align='center'
          id='back-to-top-anchor'
        >
          {title}
        </Typography>
        <>
          <Formik
            initialValues={initialValue}
            onSubmit={value => onSubmit(value)}
            validationSchema={
              formName === 'ability' ? abilityBasicFormSchema : null
            }
          >
            {props => (
              <Form>
                <Grid container spacing={0.5}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <AccountCircle
                        sx={{ color: 'action.active', mr: 2, my: 1 }}
                      />
                      <Field
                        label='세후 연소득'
                        component={TextField}
                        name={`yearMoney`}
                        sx={{ mr: 2 }}
                        fullWidth
                        type='number'
                        variant='standard'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </Box>
                  </Grid>

                  {title === '주택 구매 능력' ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <AccountCircle
                            sx={{ color: 'action.active', mr: 2, my: 1 }}
                          />
                          <Field
                            label='저축율'
                            component={TextField}
                            name={`savingRatioMoney`}
                            sx={{ mr: 2 }}
                            fullWidth
                            variant='standard'
                            type='number'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <AccountCircle
                            sx={{ color: 'action.active', mr: 2, my: 1 }}
                          />
                          <Field
                            label='주댁담보대출 금리'
                            component={TextField}
                            name={`mortgageLoan`}
                            sx={{ mr: 2 }}
                            fullWidth
                            variant='standard'
                            type='number'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                          />
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <AccountCircle
                            sx={{ color: 'action.active', mr: 2, my: 1 }}
                          />
                          <Field
                            label='자녀 수'
                            component={TextField}
                            name={`siblings`}
                            sx={{ mr: 2 }}
                            fullWidth
                            variant='standard'
                            type='number'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                          />
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
                <Box sx={{ display: 'flex' }} justifyContent={'flex-end'}>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!(props.dirty && props.isValid)}
                  >
                    Go
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      </Paper>
    </Container>
  );
};

export default WriteForm;
