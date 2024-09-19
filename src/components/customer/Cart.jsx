import React, { useState, useEffect } from 'react';
import api, { makeRequest } from '../../api/api';
import { Button, Typography, Container, Grid, Card, CardContent, CardActions } from '@mui/material';
import {Link} from 'react-router-dom';
// import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  // const { getCart, removeFromCart } = useCart();
  // const cartItems = getCart();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/customer/cart'); // Assuming customer ID is 1
        setCartItems(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (cartId) => {
    try {
      await makeRequest('DELETE', `/customer/cart/${cartId}`);
      setCartItems(cartItems.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body2">Price: ${item.product.price}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
  <Typography color="error" sx={{mt: 3}}>{cartItems.length ? '': 'No prducts in the cart.' }</Typography>

      <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/place-order"
          disabled={!cartItems.length}
          sx={{mt: 3}}
        >
          Place Order
        </Button>
    </Container>
  );
};

export default Cart;
