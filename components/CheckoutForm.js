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

const CheckoutForm = ({ title, steps, getStepContent }) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = useCallback(() => {
    setActiveStep(prev => prev + 1);
  });
  const handleBack = useCallback(() => {
    setActiveStep(prev => prev - 1);
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
              로딩 중입니다.
            </Typography>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box
                sx={{ display: 'flex' }}
                justifyContent={activeStep === 0 ? 'flex-end' : 'space-between'}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant='contained'
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? '완료' : 'Next'}
                </Button>
              </Box>
              <ScrollTop window={win}>
                <Fab size='small' aria-label='scroll back to top'>
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
            </>
          )}
        </>
      </Paper>
    </Container>
  );
};

export default CheckoutForm;
