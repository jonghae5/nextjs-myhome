import React from 'react';
import { Paper, Container, Typography } from '@mui/material';
const ResultForm = ({ children, title, content }) => {
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
        {children}
      </Paper>
    </Container>
  );
};

export default ResultForm;
