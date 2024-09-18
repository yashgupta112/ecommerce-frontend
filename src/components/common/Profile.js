import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user details on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await api.get('/users/info');
        const response = await makeRequest('GET', '/users/profile');
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile. Please log in again.');
        if (error.response && error.response.status === 403) {
          // alert(error)
          navigate('/login');  // Redirect to login page
      } else {
          console.error('Error fetching products', error);
          // setErrorMessage('Failed to place order. Please try again.');
      }
      }
    };

    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);  // Only run on mount (empty dependency array)

  // Update user details
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // await api.put(`/users/update/${user.username}`, user);
      await makeRequest('PUT', `/users/update`, user);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.username}
            readOnly
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            required
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
