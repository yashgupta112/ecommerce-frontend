import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../api/api';
import { Button, Grid, Card, CardContent, Typography, CardActions, Container, Select, MenuItem } from '@mui/material';
// import { useCart } from '../../contexts/CartContext';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('electronics'); // Default category
  // const { cartId, setCartId } = useCart();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await api.get(`/customer/products/category/${category}`);
        const response = await makeRequest('GET', `/customer/products/category/${category}`);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;


  const addToCart = async (productId) => {
    console.log('Add to cart:', productId); // This will handle adding to the cart
    try {
      // if (cartId) {
        await makeRequest('POST', `/customer/cart?productId=${productId}&quantity=1`, );
      // }
      
    } catch (err) {
      setError('Failed to suspend user');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      >
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="books">Books</MenuItem>
        <MenuItem value="clothing">Clothing</MenuItem>
      </Select>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
                <Typography variant="body2">Stock: {product.stock}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product.id)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsList;
