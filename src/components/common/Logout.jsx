import React, { useEffect, useState } from 'react';
import api, { makeRequest } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Logout = () => {
  const { logout } = useUser();

  // Fetch user details on mount
  useEffect(() => {
    logout();
  }, []);  // Only run on mount (empty dependency array)



  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Successfully loged out.
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

export default Logout;
