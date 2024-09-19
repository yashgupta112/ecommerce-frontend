import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ROLE } from '../../constants';

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commerce App
        </Typography>

        <Box>
          {/* Navigation for both Seller and Customer */}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              {/* Navigation for Customer */}
              {user.role === ROLE.CUSTOMER && (
                <>
                  <Button color="inherit" component={Link} to="/products">
                    Products
                  </Button>
                  <Button color="inherit" component={Link} to="/cart">
                    Cart
                  </Button>
                  <Button color="inherit" component={Link} to="/order-history">
                    Orders
                  </Button>
                </>
              )}
              {/* Navigation for Seller */}
              {user.role === ROLE.SELLER && (
                <>
                  <Button color="inherit" component={Link} to="/manage-products">
                    My Products
                  </Button>
                  <Button color="inherit" component={Link} to="/add-product">
                    Add Product
                  </Button>
                </>
              )}

              {/* Navigation for Admin */}
              {user.role === ROLE.ADMIN && (
                <>
                  <Button color="inherit" component={Link} to="/admin/users">
                    View Users
                  </Button>
                  <Button color="inherit" component={Link} to="/admin/orders">
                    View Orders
                  </Button>
                  <Button color="inherit" component={Link} to="/admin/products">
                    View Products
                  </Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
