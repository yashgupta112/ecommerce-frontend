import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../api/api';
import { Typography, Container, Grid, Card, CardContent } from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequest('GET', '/customer/orders'); 
        const data = response.data;
        setOrders(data);
        console.log('orders after: ', orders, typeof data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  console.log('orders outside: ', orders);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <Grid container spacing={3}>
        {(orders || []).map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="body2">Order Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">Total Amount: ${order.totalAmount}</Typography>
                <Typography variant="body2">Shipping Address: {order.shippingAddress}</Typography>
                <Typography variant="body2">Phone: {order.phone}</Typography>
                <Typography variant="body2">Items:</Typography>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product.name} - {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderHistory;
