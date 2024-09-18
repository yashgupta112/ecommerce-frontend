// src/components/common/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { makeRequest } from '../../api/api';

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
        <Container>
            <Typography variant="h4">Add Product</Typography>
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
                {/* <TextField
                    label="Image URL"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                /> */}
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary">Add Product</Button>
            </form>
        </Container>
    );
};

export default AddProduct;
