import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, styled, Container, Select, MenuItem } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
// import BackgroundContainer from "../parts/BackgroundContainer";
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
        await makeRequest('POST', `/customer/cart?productId=${productId}&quantity=1`, );
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
          Stock: {product.stock}
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
        {isButtonDisabled?"Added to Cart": "Add to Cart"}
      </StyledButton>
    </StyledCard>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('electronics'); // Default category
  // const { cartId, setCartId } = useCart();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // return setProducts([
        //   {
        //     id: 1,
        //     name: "Stylish T-Shirt",
        //     description: "Comfortable and fashionable t-shirt for everyday wear.",
        //     price: 29.99,
        //     rating: 4.5,
        //     reviewCount: 128,
        //     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 2,
        //     name: "Classic Jeans",
        //     description: "Durable and versatile jeans for any occasion.",
        //     price: 59.99,
        //     rating: 4.2,
        //     reviewCount: 95,
        //     image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 3,
        //     name: "Elegant Watch",
        //     description: "Sophisticated timepiece to complement your style.",
        //     price: 129.99,
        //     rating: 4.8,
        //     reviewCount: 67,
        //     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 1,
        //     name: "Stylish T-Shirt",
        //     description: "Comfortable and fashionable t-shirt for everyday wear.",
        //     price: 29.99,
        //     rating: 4.5,
        //     reviewCount: 128,
        //     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 2,
        //     name: "Classic Jeans",
        //     description: "Durable and versatile jeans for any occasion.",
        //     price: 59.99,
        //     rating: 4.2,
        //     reviewCount: 95,
        //     image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 3,
        //     name: "Elegant Watch",
        //     description: "Sophisticated timepiece to complement your style.",
        //     price: 129.99,
        //     rating: 4.8,
        //     reviewCount: 67,
        //     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 1,
        //     name: "Stylish T-Shirt",
        //     description: "Comfortable and fashionable t-shirt for everyday wear.",
        //     price: 29.99,
        //     rating: 4.5,
        //     reviewCount: 128,
        //     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 2,
        //     name: "Classic Jeans",
        //     description: "Durable and versatile jeans for any occasion.",
        //     price: 59.99,
        //     rating: 4.2,
        //     reviewCount: 95,
        //     image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   },
        //   {
        //     id: 3,
        //     name: "Elegant Watch",
        //     description: "Sophisticated timepiece to complement your style.",
        //     price: 129.99,
        //     rating: 4.8,
        //     reviewCount: 67,
        //     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        //     hoverImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        //   }
        // ]);
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


  return (

    // <BackgroundContainer>
    <Container>
      <Typography variant="h4" sx={{textAlign: 'center', m: 3}}>
          Products
        </Typography>
        <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
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