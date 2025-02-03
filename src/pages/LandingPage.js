// src/pages/LandingPage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Ticket Quality SaaS
      </Typography>
      <Typography variant="h6" paragraph>
        Analyze, score, and improve your IT service tickets with AI-powered insights.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" component={RouterLink} to="/ticket">
          Record a Ticket
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
