// src/pages/AboutPage.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Ticket Quality SaaS
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" paragraph>
          Our platform uses state-of-the-art machine learning to help IT service teams improve the quality of their tickets.
          By providing real-time feedback, cluster-based insights, and keyword analysis, we aim to streamline support operations.
        </Typography>
        <Typography variant="body1" paragraph>
          This prototype is a starting point that will be extended with user authentication, detailed analytics, and seamless integration with ITSM systems.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
