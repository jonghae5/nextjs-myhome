import React, { useCallback, useState, useEffect } from 'react';
import {
  Paper,
  Container,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Box,
  Button,
  Fab,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollTop';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { addAbility, asyncAddAbility } from '../slices/abilitySlice';
import { addCompare, asyncAddCompare } from '../slices/compareSlice';
import { useRouter } from 'next/router';
const generateRandomString = () => Math.random().toString(36).slice(2);

const CheckoutForm = ({ title, steps, getStepContent, data, initialValue }) => {
  const [activeStep, setActiveStep] = useState(0);
  const COMPARE = 'compare';
  const ABILITY = 'ability';
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNext = useCallback(() => {
    setActiveStep(prev => prev + 1);
  });
  const handleBack = useCallback(() => {
    setActiveStep(prev => prev - 1);
  });

  const onSubmit = useCallback(async value => {
    switch (data) {
      case COMPARE:
        console.log(value);

        await dispatch(asyncAddCompare(value));
        handleNext();
        router.push(`result/${generateRandomString()}`);
        return;

      case ABILITY:
        console.log(value);
        await dispatch(asyncAddAbility(value));
        handleNext();
        router.push(`result/${generateRandomString()}`);
        return;
      default:
        return;
    }
  });

  let win;
  useEffect(() => {
    win = typeof window !== 'undefined' ? window : undefined;
  }, []);

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
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <>
          {activeStep === steps.length ? (
            <Typography variant='h5' gutterBottom>
              로딩 중입니다.{activeStep}
            </Typography>
          ) : (
            <>
              <Formik initialValues={initialValue} onSubmit={v => onSubmit(v)}>
                <Form>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{ display: 'flex' }}
                    justifyContent={
                      activeStep === 0 ? 'flex-end' : 'space-between'
                    }
                  >
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Button
                        variant='contained'
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Next
                      </Button>
                    )}
                    {activeStep === steps.length - 1 && (
                      <Button
                        type='submit'
                        variant='contained'
                        sx={{ mt: 3, ml: 1 }}
                      >
                        완료
                      </Button>
                    )}
                  </Box>

                  <ScrollTop window={win}>
                    <Fab size='small' aria-label='scroll back to top'>
                      <KeyboardArrowUpIcon />
                    </Fab>
                  </ScrollTop>
                </Form>
              </Formik>
            </>
          )}
        </>
      </Paper>
    </Container>
  );
};

export default CheckoutForm;
