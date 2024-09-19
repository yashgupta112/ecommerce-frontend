import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, Box } from '@mui/material';
import { makeRequest } from '../../api/api';
import BackgroundContainer from '../parts/BackgroundContainer';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stock: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            makeRequest('POST', '/seller/products', product);
            alert('Product added successfully');
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                imageUrl: '',
                stock: ''
            });
        } catch (error) {
            setError('Error adding product');
        }
    };

    return (
        <BackgroundContainer>
            <Container>
                <Typography variant="h4" textAlign={"center"}>Add Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Stock"
                        name="stock"
                        type="number"
                        value={product.stock}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Box textAlign='center'>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>Add Product</Button>
                    </Box>
                </form>
            </Container>
        </BackgroundContainer>
    );
};

export default AddProduct;
