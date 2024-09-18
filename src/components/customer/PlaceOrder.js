import React, { useState } from 'react';
import api, { makeRequest } from '../../api/api';
import { Button, Container, Typography, TextField, Box, Alert } from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import { ROLE } from '../../constants';

const PlaceOrder = () => {
  const { user } = useUser();
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check if the user is a seller and restrict access
  if (user && user.role === ROLE.SELLER) {
    return <Navigate to="/not-authorized" />;
  }

  const handlePlaceOrder = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await makeRequest('POST', '/customer/orders', {
        shippingAddress,
        phone,
      });
      setSuccessMessage('Order placed successfully!');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to place order. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Place Order
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          label="Shipping Address"
          fullWidth
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          required
        />
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button variant="contained" color="primary" onClick={handlePlaceOrder} sx={{ mt: 3 }}>
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default PlaceOrder;
