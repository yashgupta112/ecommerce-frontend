// src/components/common/EditProduct.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../api/api';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await makeRequest('GET', `/seller/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                // Check for 403 error
                if (error.response && error.response.status === 403) {
                    navigate('/login');  // Redirect to login page
                } else {
                    console.error('Error fetching products', error);
                    // setErrorMessage('Failed to place order. Please try again.');
                }
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await makeRequest('PUT', `/seller/products/${id}`, product);
            alert('Product updated successfully');
            navigate('/manage-products');
        } catch (error) {
            setError('Error updating product');
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <Container>
            <Typography variant="h4">Edit Product</Typography>
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
                <Button type="submit" variant="contained" color="primary">Update Product</Button>
            </form>
        </Container>
    );
};

export default EditProduct;
