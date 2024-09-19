import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ROLE } from '../../constants';

const Home = () => {
  const { user } = useUser();

  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the E-Commerce Platform
        </Typography>

        {/* If user is logged in */}
        {user ? (
          <>
            <Typography variant="h6" gutterBottom>
              Hello, {user.username}! You are logged in as a {user.role}.
            </Typography>

            {/* Links for customers */}
            {user.role === ROLE.CUSTOMER && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/products"
                  sx={{ mr: 2 }}
                >
                  View Products
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/cart"
                  sx={{ mr: 2 }}
                >
                  Go to Cart
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  component={Link}
                  to="/order-history"
                >
                  Order History
                </Button>
              </>
            )}

            {/* Links for sellers */}
            {user.role === ROLE.SELLER && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/manage-products"
                  sx={{ mr: 2 }}
                >
                  My Products
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/add-product"
                >
                  Add New Product
                </Button>
              </>
            )}
          </>
        ) : (
          // If user is not logged in
          <>
            <Typography variant="h6" gutterBottom>
              Please log in to continue.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" color="secondary" component={Link} to="/register" sx={{ ml: 2 }}>
              Register
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
