import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, styled, Container, Select, MenuItem } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { makeRequest } from "../../api/api";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: "56.25%", // 16:9 aspect ratio
  position: "relative",
  overflow: "hidden",
  // backgroundSize: "contain"
}));



const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  transition: "background-color 0.3s ease-in-out",
}));

const ProductCard = ({ product }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(product.stock === 0);

  const addToCart = async (productId) => {
    console.log('Add to cart:', productId); // This will handle adding to the cart
    try {
      await makeRequest('POST', `/customer/cart?productId=${productId}&quantity=1`,);
      setButtonDisabled(true);
    } catch (err) {
      alert('Failed to add product to the cart.');
    }
  }


  return (
    <StyledCard
    >
      <StyledCardMedia
        image={product.image || `${process.env.PUBLIC_URL}/product-placeholder.png`}
        title={product.name}
        alt={`${product.name} product image`}
      >

      </StyledCardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          Stock: {product.stock} units.
        </Typography>
      </CardContent>
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<FaShoppingCart />}
        fullWidth
        onClick={() => addToCart(product.id)}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "Added to Cart" : "Add to Cart"}
      </StyledButton>
    </StyledCard>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('electronics'); // Default category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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


  return (

    // <BackgroundContainer>
    <Container>
      <Typography variant="h4" sx={{ textAlign: 'center', m: 3 }}>
        Products
      </Typography>
      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        sx={{mb: 2}}
      ><MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="books">Books</MenuItem>
        <MenuItem value="clothing">Clothing</MenuItem>
      </Select>

      <Grid container spacing={3}>
        {(products).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
    // </BackgroundContainer>
  );
};

export default ProductGrid;