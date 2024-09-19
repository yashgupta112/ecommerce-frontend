import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" gutterBottom>
        You are not authorized to view this page.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/login"
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default NotAuthorized;
